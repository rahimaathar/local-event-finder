'use client';

import { useState, useEffect, useMemo } from "react";
import MapView from "./components/MapView";
import EventStats from "./components/EventStats";
import { states, cities, categories, mockEvents } from "./data/mockData";
import { format, parseISO, startOfDay, endOfDay, addDays, isWithinInterval, isToday, isTomorrow, isThisWeek, isThisMonth } from 'date-fns';

export default function Home() {
  const [selectedState, setSelectedState] = useState("");
  const [selectedCity, setSelectedCity] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [userLocation, setUserLocation] = useState({ latitude: 37.7749, longitude: -122.4194 });
  const [searchTerm, setSearchTerm] = useState("");
  const [dateFilter, setDateFilter] = useState("all");
  const [isLoading, setIsLoading] = useState(false);
  const [sortBy, setSortBy] = useState("date");
  const [selectedEvent, setSelectedEvent] = useState<any>(null);

  const filteredEvents = useMemo(() => {
    setIsLoading(true);
    let filtered = mockEvents;

    if (searchTerm.trim()) {
      const searchLower = searchTerm.toLowerCase();
      const searchWords = searchLower.split(' ').filter(word => word.length > 0);

      filtered = filtered.filter(event => {
        const eventText = [
          event.name.text,
          event.venue.name,
          event.venue.address.localized_address_display,
          event.description?.text || '',
          event.category || ''
        ].join(' ').toLowerCase();

        return searchWords.every(word => eventText.includes(word));
      });
    }

    if (selectedCategory !== 'all') {
      filtered = filtered.filter(event => event.category === selectedCategory);
    }

    if (dateFilter !== 'all') {
      const today = startOfDay(new Date());
      filtered = filtered.filter(event => {
        const eventDate = parseISO(event.start.local);
        switch (dateFilter) {
          case 'today':
            return isToday(eventDate);
          case 'tomorrow':
            return isTomorrow(eventDate);
          case 'week':
            return isThisWeek(eventDate, { weekStartsOn: 1 });
          case 'month':
            return isThisMonth(eventDate);
          default:
            return true;
        }
      });
    }

    if (selectedCity) {
      const cityData = Object.values(cities)
        .flat()
        .find(city => city.value === selectedCity);

      if (cityData) {
        filtered = filtered.filter(event => {
          const eventLat = Number(event.venue.latitude);
          const eventLng = Number(event.venue.longitude);
          const distance = calculateDistance(
            eventLat,
            eventLng,
            cityData.coordinates.lat,
            cityData.coordinates.lng
          );
          return distance <= 100;
        });

        filtered.sort((a, b) => {
          const distA = calculateDistance(
            Number(a.venue.latitude),
            Number(a.venue.longitude),
            cityData.coordinates.lat,
            cityData.coordinates.lng
          );
          const distB = calculateDistance(
            Number(b.venue.latitude),
            Number(b.venue.longitude),
            cityData.coordinates.lat,
            cityData.coordinates.lng
          );
          return distA - distB;
        });
      }
    } else {
      if (sortBy === 'date') {
        filtered.sort((a, b) => new Date(a.start.local).getTime() - new Date(b.start.local).getTime());
      } else if (sortBy === 'name') {
        filtered.sort((a, b) => a.name.text.localeCompare(b.name.text));
      } else if (sortBy === 'price') {
        filtered.sort((a, b) => {
          const priceA = a.ticket_availability?.minimum_ticket_price?.display || 'Free';
          const priceB = b.ticket_availability?.minimum_ticket_price?.display || 'Free';
          return priceA.localeCompare(priceB);
        });
      }
    }

    setIsLoading(false);
    return filtered;
  }, [selectedState, selectedCity, selectedCategory, searchTerm, dateFilter, sortBy]);

  const handleStateChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const newState = e.target.value;
    setSelectedState(newState);
    setSelectedCity("");

    if (newState) {
      const firstCity = cities[newState][0];
      setUserLocation({
        latitude: firstCity.coordinates.lat,
        longitude: firstCity.coordinates.lng
      });
    }
  };

  const handleCityChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const newCity = e.target.value;
    setSelectedCity(newCity);

    const cityData = Object.values(cities)
      .flat()
      .find(city => city.value === newCity);

    if (cityData) {
      setUserLocation({
        latitude: cityData.coordinates.lat,
        longitude: cityData.coordinates.lng
      });
    }
  };

  const formatEventDate = (dateString: string) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffTime = date.getTime() - now.getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

    if (diffDays === 0) return 'Today, ' + format(date, 'h:mm a');
    if (diffDays === 1) return 'Tomorrow, ' + format(date, 'h:mm a');
    if (diffDays < 7) return format(date, 'EEEE, h:mm a');
    return format(date, 'MMM dd, h:mm a');
  };

  const getEventStatus = (dateString: string) => {
    const eventDate = new Date(dateString);
    const now = new Date();
    const diffTime = eventDate.getTime() - now.getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

    if (diffDays < 0) return { text: 'Past', color: 'bg-gray-100 text-gray-600' };
    if (diffDays === 0) return { text: 'Today', color: 'bg-green-100 text-green-800' };
    if (diffDays === 1) return { text: 'Tomorrow', color: 'bg-blue-100 text-blue-800' };
    if (diffDays < 7) return { text: 'This Week', color: 'bg-yellow-100 text-yellow-800' };
    return { text: 'Upcoming', color: 'bg-purple-100 text-purple-800' };
  };

  const handleEventSelect = (event: any) => {
    setSelectedEvent(event);
  };

  const handleEventDeselect = () => {
    setSelectedEvent(null);
  };

  return (
    <main className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-blue-50">
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-6xl mx-auto text-center mb-10">
          <h1 className="text-6xl font-extrabold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-indigo-600 via-purple-600 to-blue-600">
            Event Explorer
          </h1>
          <p className="text-gray-600 text-xl">Discover amazing events happening around you</p>
        </div>

        <div className="bg-white/80 backdrop-blur-sm p-8 rounded-3xl shadow-xl mb-8 max-w-6xl mx-auto border border-white/20">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <div className="space-y-2">
              <label className="text-sm font-semibold text-gray-700">State</label>
              <select
                value={selectedState}
                onChange={handleStateChange}
                className="w-full p-3 rounded-xl border-2 border-gray-200 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 transition-all bg-white/50 text-gray-900"
              >
                <option value="" className="text-gray-900">All States</option>
                {states.map(state => (
                  <option key={state.value} value={state.value} className="text-gray-900">
                    {state.label}
                  </option>
                ))}
              </select>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-semibold text-gray-700">City</label>
              <select
                value={selectedCity}
                onChange={handleCityChange}
                className="w-full p-3 rounded-xl border-2 border-gray-200 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 transition-all disabled:bg-gray-100 disabled:text-gray-400 bg-white/50 text-gray-900"
                disabled={!selectedState}
              >
                <option value="" className="text-gray-900">All Cities</option>
                {selectedState &&
                  cities[selectedState].map(city => (
                    <option key={city.value} value={city.value} className="text-gray-900">
                      {city.label}
                    </option>
                  ))}
              </select>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-semibold text-gray-700">Category</label>
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="w-full p-3 rounded-xl border-2 border-gray-200 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 transition-all bg-white/50 text-gray-900"
              >
                {categories.map(category => (
                  <option key={category.value} value={category.value} className="text-gray-900">
                    {category.label}
                  </option>
                ))}
              </select>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-semibold text-gray-700">Date Range</label>
              <select
                value={dateFilter}
                onChange={(e) => setDateFilter(e.target.value)}
                className="w-full p-3 rounded-xl border-2 border-gray-200 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 transition-all bg-white/50 text-gray-900"
              >
                <option value="all" className="text-gray-900">All Dates</option>
                <option value="today" className="text-gray-900">Today</option>
                <option value="tomorrow" className="text-gray-900">Tomorrow</option>
                <option value="week" className="text-gray-900">This Week</option>
                <option value="month" className="text-gray-900">This Month</option>
              </select>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
            <div className="space-y-2">
              <label className="text-sm font-semibold text-gray-700">Search Events</label>
              <div className="relative">
                <input
                  type="text"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  placeholder="Search by name, venue, or description..."
                  className="w-full p-3 pl-12 rounded-xl border-2 border-gray-200 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 transition-all bg-white/50"
                />
                <svg
                  className="w-5 h-5 text-gray-400 absolute left-4 top-3.5"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                  />
                </svg>
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-semibold text-gray-700">Sort By</label>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="w-full p-3 rounded-xl border-2 border-gray-200 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 transition-all bg-white/50 text-gray-900"
              >
                <option value="date" className="text-gray-900">Date</option>
                <option value="name" className="text-gray-900">Name</option>
                <option value="price" className="text-gray-900">Price</option>
              </select>
            </div>
          </div>
        </div>

        <div className="flex flex-col lg:flex-row gap-8">
          <div className="lg:w-2/5 space-y-6">
            <EventStats events={filteredEvents} />
            <div className="bg-white/80 backdrop-blur-sm rounded-3xl shadow-xl p-6 overflow-y-auto max-h-[600px] border border-white/20">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-3xl font-bold text-gray-900">
                  Events
                  <span className="ml-3 text-xl text-indigo-600 font-medium">({filteredEvents.length})</span>
                </h2>
                {isLoading && (
                  <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-indigo-600"></div>
                )}
              </div>

              {filteredEvents.length === 0 ? (
                <div className="text-center py-16">
                  <div className="w-16 h-16 mx-auto mb-4 bg-gray-100 rounded-full flex items-center justify-center">
                    <svg className="w-8 h-8 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9.172 16.172a4 4 0 015.656 0M9 12h6m-6-4h6m2 5.291A7.962 7.962 0 0112 15c-2.34 0-4.47-.881-6.08-2.33" />
                    </svg>
                  </div>
                  <p className="text-gray-500 text-lg font-medium">No events found</p>
                  <p className="text-gray-400 text-sm mt-2">Try adjusting your filters</p>
                </div>
              ) : (
                <div className="space-y-4">
                  {filteredEvents.map((event: any) => {
                    const status = getEventStatus(event.start.local);
                    return (
                      <div
                        key={event.id}
                        className={`p-6 rounded-2xl border transition-all duration-300 bg-white/60 backdrop-blur-sm group cursor-pointer ${selectedEvent?.id === event.id
                            ? 'border-indigo-500 shadow-xl bg-indigo-50/80'
                            : 'border-gray-100 hover:border-indigo-200 hover:shadow-xl'
                          }`}
                        onClick={() => handleEventSelect(event)}
                      >
                        <div className="flex items-start justify-between mb-3">
                          <h3 className="font-bold text-lg text-gray-900 group-hover:text-indigo-700 transition-colors">
                            {event.name.text}
                          </h3>
                          <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${status.color}`}>
                            {status.text}
                          </span>
                        </div>

                        <div className="flex items-center gap-2 mb-3 text-gray-600">
                          <svg className="w-4 h-4 text-indigo-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                          </svg>
                          <p className="text-sm font-medium">{formatEventDate(event.start.local)}</p>
                        </div>

                        <div className="flex items-start gap-2 mb-4 text-gray-600">
                          <svg className="w-4 h-4 text-indigo-500 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                          </svg>
                          <div>
                            <p className="text-sm font-semibold text-gray-900">{event.venue.name}</p>
                            <p className="text-sm text-gray-500">{event.venue.address.localized_address_display}</p>
                          </div>
                        </div>

                        <div className="flex items-center justify-between">
                          <div className="flex gap-2">
                            {event.category && (
                              <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-indigo-100 text-indigo-800">
                                {event.category}
                              </span>
                            )}
                            {event.ticket_availability && (
                              <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium ${event.ticket_availability.has_available_tickets
                                ? 'bg-green-100 text-green-800'
                                : 'bg-red-100 text-red-800'
                                }`}>
                                {event.ticket_availability.has_available_tickets
                                  ? `From ${event.ticket_availability.minimum_ticket_price?.display || 'Free'}`
                                  : 'Sold Out'}
                              </span>
                            )}
                          </div>
                          <a
                            href={event.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-xl shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-all transform hover:scale-105"
                          >
                            View Details →
                          </a>
                        </div>
                      </div>
                    );
                  })}
                </div>
              )}
            </div>
          </div>

          <div className="lg:w-3/5">
            <div className="rounded-3xl overflow-hidden shadow-2xl border-4 border-white/20 h-[800px] bg-white/80 backdrop-blur-sm">
              <MapView
                userLocation={userLocation}
                events={filteredEvents}
                selectedEvent={selectedEvent}
                onEventSelect={handleEventSelect}
                onEventDeselect={handleEventDeselect}
              />
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}

function calculateDistance(lat1: number, lon1: number, lat2: number, lon2: number): number {
  const R = 6371;
  const dLat = (lat2 - lat1) * (Math.PI / 180);
  const dLon = (lon2 - lon1) * (Math.PI / 180);

  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(lat1 * (Math.PI / 180)) * Math.cos(lat2 * (Math.PI / 180)) *
    Math.sin(dLon / 2) * Math.sin(dLon / 2);

  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  return R * c;
}
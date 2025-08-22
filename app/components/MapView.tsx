'use client';
import { useState, useEffect } from 'react';
import { Map, Marker, Popup } from 'react-map-gl';
import type { LngLatLike } from 'mapbox-gl';
import 'mapbox-gl/dist/mapbox-gl.css';

type Event = {
    id: string;
    name: { text: string };
    description: { text: string };
    start: { local: string };
    url: string;
    venue: {
        latitude: string;
        longitude: string;
        name: string;
        address: {
            localized_address_display: string;
        };
    };
    ticket_availability?: {
        has_available_tickets: boolean;
        minimum_ticket_price?: {
            display: string;
        };
    };
    category?: string;
};

interface MapViewProps {
    userLocation: {
        latitude: number;
        longitude: number;
    };
    events: Event[];
}

type MapViewState = {
    latitude: number;
    longitude: number;
    zoom: number;
    bearing: number;
    padding: { top: number; bottom: number; left: number; right: number };
    pitch: number;
};

function MapView({ userLocation, events }: MapViewProps) {
    const [viewState, setViewState] = useState<MapViewState>({
        latitude: userLocation.latitude,
        longitude: userLocation.longitude,
        zoom: 13,
        bearing: 0,
        padding: { top: 0, bottom: 0, left: 0, right: 0 },
        pitch: 0
    });
    const [selectedEvent, setSelectedEvent] = useState<Event | null>(null);

    useEffect(() => {
        setViewState(v => ({
            ...v,
            latitude: userLocation.latitude,
            longitude: userLocation.longitude
        }));
    }, [userLocation]);

    const handleMove = (evt: { viewState: MapViewState }) => {
        setViewState(evt.viewState);
    };

    const getEventStatus = (dateString: string) => {
        const eventDate = new Date(dateString);
        const now = new Date();
        const diffTime = eventDate.getTime() - now.getTime();
        const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

        if (diffDays < 0) return { text: 'Past', color: 'bg-gray-500' };
        if (diffDays === 0) return { text: 'Today', color: 'bg-green-500' };
        if (diffDays === 1) return { text: 'Tomorrow', color: 'bg-blue-500' };
        if (diffDays < 7) return { text: 'This Week', color: 'bg-yellow-500' };
        return { text: 'Upcoming', color: 'bg-purple-500' };
    };

    const getCategoryColor = (category?: string) => {
        switch (category) {
            case 'music': return 'bg-pink-500';
            case 'tech': return 'bg-blue-500';
            case 'sports': return 'bg-green-500';
            case 'food': return 'bg-orange-500';
            case 'arts': return 'bg-purple-500';
            default: return 'bg-indigo-500';
        }
    };

    const formatEventDate = (dateString: string) => {
        const date = new Date(dateString);
        const now = new Date();
        const diffTime = date.getTime() - now.getTime();
        const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

        if (diffDays === 0) return 'Today';
        if (diffDays === 1) return 'Tomorrow';
        if (diffDays < 7) return date.toLocaleDateString('en-US', { weekday: 'short' });
        return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
    };

    return (
        <Map
            {...viewState}
            onMove={handleMove}
            style={{ width: '100%', height: '100%' }}
            mapStyle="mapbox://styles/mapbox/light-v11"
            mapboxAccessToken={process.env.NEXT_PUBLIC_MAPBOX_TOKEN}
        >
            <Marker
                latitude={userLocation.latitude}
                longitude={userLocation.longitude}
            >
                <div className="relative">
                    <div className="w-8 h-8 bg-blue-500 rounded-full border-4 border-white shadow-lg animate-pulse" />
                    <div className="absolute -top-1 -right-1 w-4 h-4 bg-blue-600 rounded-full border-2 border-white" />
                </div>
            </Marker>

            {events.map(event => {
                const status = getEventStatus(event.start.local);
                const categoryColor = getCategoryColor(event.category);

                return (
                    <Marker
                        key={event.id}
                        latitude={Number(event.venue.latitude)}
                        longitude={Number(event.venue.longitude)}
                        onClick={(e: { originalEvent: MouseEvent }) => {
                            e.originalEvent.stopPropagation();
                            setSelectedEvent(event);
                        }}
                    >
                        <div className="cursor-pointer transform hover:scale-125 transition-all duration-200 group">
                            <div className="relative">
                                <div className={`w-6 h-6 ${categoryColor} rounded-full border-3 border-white shadow-lg`} />
                                <div className={`absolute -top-1 -right-1 w-3 h-3 ${status.color} rounded-full border border-white`} />
                                <div className="absolute -bottom-8 left-1/2 transform -translate-x-1/2 bg-black text-white text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap z-10">
                                    {event.name.text}
                                </div>
                            </div>
                        </div>
                    </Marker>
                );
            })}

            {selectedEvent && (
                <Popup
                    latitude={Number(selectedEvent.venue.latitude)}
                    longitude={Number(selectedEvent.venue.longitude)}
                    onClose={() => setSelectedEvent(null)}
                    closeButton={true}
                    closeOnClick={false}
                    className="z-50"
                    offset={30}
                    maxWidth="300px"
                >
                    <div className="p-4 max-w-xs">
                        <div className="flex items-start justify-between mb-3">
                            <h3 className="font-bold text-lg text-gray-900 leading-tight">
                                {selectedEvent.name.text}
                            </h3>
                            <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${getCategoryColor(selectedEvent.category)} text-white ml-2`}>
                                {selectedEvent.category}
                            </span>
                        </div>

                        <div className="space-y-2 mb-4">
                            <div className="flex items-center gap-2 text-gray-600">
                                <svg className="w-4 h-4 text-indigo-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                                </svg>
                                <p className="text-sm font-medium">{formatEventDate(selectedEvent.start.local)}</p>
                            </div>

                            <div className="flex items-start gap-2 text-gray-600">
                                <svg className="w-4 h-4 text-indigo-500 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                                </svg>
                                <div>
                                    <p className="text-sm font-semibold text-gray-900">{selectedEvent.venue.name}</p>
                                    <p className="text-sm text-gray-500">{selectedEvent.venue.address.localized_address_display}</p>
                                </div>
                            </div>
                        </div>

                        {selectedEvent.ticket_availability && (
                            <div className="mb-4">
                                <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium ${selectedEvent.ticket_availability.has_available_tickets
                                        ? 'bg-green-100 text-green-800'
                                        : 'bg-red-100 text-red-800'
                                    }`}>
                                    {selectedEvent.ticket_availability.has_available_tickets
                                        ? `From ${selectedEvent.ticket_availability.minimum_ticket_price?.display || 'Free'}`
                                        : 'Sold Out'}
                                </span>
                            </div>
                        )}

                        <a
                            href={selectedEvent.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center justify-center w-full px-4 py-2 border border-transparent text-sm font-medium rounded-lg shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-colors"
                        >
                            View Details →
                        </a>
                    </div>
                </Popup>
            )}
        </Map>
    );
}

export default MapView;

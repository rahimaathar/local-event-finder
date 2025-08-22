interface City {
  value: string;
  label: string;
  coordinates: {
    lat: number;
    lng: number;
  };
}

interface CitiesMap {
  [key: string]: City[];
}

export const states = [

  { value: "CA", label: "California" },
  { value: "NY", label: "New York" },
  { value: "TX", label: "Texas" },
  { value: "IL", label: "Illinois" },
  { value: "FL", label: "Florida" },
  { value: "WA", label: "Washington" },
  { value: "NV", label: "Nevada" },
] as const;

export const cities: CitiesMap = {
  CA: [
    { value: "SF", label: "San Francisco", coordinates: { lat: 37.7749, lng: -122.4194 } },
    { value: "LA", label: "Los Angeles", coordinates: { lat: 34.0522, lng: -118.2437 } },
    { value: "SD", label: "San Diego", coordinates: { lat: 32.7157, lng: -117.1611 } },
    { value: "SJ", label: "San Jose", coordinates: { lat: 37.3382, lng: -121.8863 } },
  ],
  NY: [
    { value: "NYC", label: "New York City", coordinates: { lat: 40.7128, lng: -74.006 } },
    { value: "BUF", label: "Buffalo", coordinates: { lat: 42.8864, lng: -78.8784 } },
    { value: "ROC", label: "Rochester", coordinates: { lat: 43.1566, lng: -77.6088 } },
  ],
  TX: [
    { value: "HOU", label: "Houston", coordinates: { lat: 29.7604, lng: -95.3698 } },
    { value: "AUS", label: "Austin", coordinates: { lat: 30.2672, lng: -97.7431 } },
    { value: "DAL", label: "Dallas", coordinates: { lat: 32.7767, lng: -96.797 } },
  ],
  IL: [
    { value: "CHI", label: "Chicago", coordinates: { lat: 41.8781, lng: -87.6298 } },
    { value: "SPI", label: "Springfield", coordinates: { lat: 39.7817, lng: -89.6501 } },
  ],
  FL: [
    { value: "MIA", label: "Miami", coordinates: { lat: 25.7617, lng: -80.1918 } },
    { value: "ORL", label: "Orlando", coordinates: { lat: 28.5383, lng: -81.3792 } },
    { value: "TPA", label: "Tampa", coordinates: { lat: 27.9506, lng: -82.4572 } },
  ],
  WA: [
    { value: "SEA", label: "Seattle", coordinates: { lat: 47.6062, lng: -122.3321 } },
    { value: "TAC", label: "Tacoma", coordinates: { lat: 47.2529, lng: -122.4443 } },
  ],
  NV: [
    { value: "LV", label: "Las Vegas", coordinates: { lat: 36.1699, lng: -115.1398 } },
    { value: "RNO", label: "Reno", coordinates: { lat: 39.5296, lng: -119.8138 } },
  ],
};

export const categories = [
  { value: "all", label: "All Categories" },
  { value: "music", label: "Music" },
  { value: "tech", label: "Technology" },
  { value: "sports", label: "Sports" },
  { value: "food", label: "Food & Drink" },
  { value: "arts", label: "Arts & Culture" },
];

export const mockEvents = [
  {
    id: "1",
    name: { text: "San Francisco Jazz Festival" },
    description: { text: "Annual jazz celebration featuring world-class musicians." },
    start: { local: "2025-06-15T19:00:00" },
    url: "https://example.com/event/1",
    venue: {
      name: "SFJAZZ Center",
      latitude: "37.7749",
      longitude: "-122.4194",
      address: { localized_address_display: "201 Franklin St, San Francisco, CA" },
    },
    ticket_availability: {
      has_available_tickets: true,
      minimum_ticket_price: { display: "$45" },
    },
    category: "music",
  },
  {
    id: "2",
    name: { text: "Los Angeles Tech Summit" },
    description: { text: "Innovation showcase with industry leaders and startups." },
    start: { local: "2025-04-22T09:00:00" },
    url: "https://example.com/event/2",
    venue: {
      name: "Los Angeles Convention Center",
      latitude: "34.0522",
      longitude: "-118.2437",
      address: { localized_address_display: "1201 S Figueroa St, Los Angeles, CA" },
    },
    ticket_availability: {
      has_available_tickets: true,
      minimum_ticket_price: { display: "$199" },
    },
    category: "tech",
  },
  {
    id: "3",
    name: { text: "New York Food & Wine Festival" },
    description: { text: "Culinary extravaganza with top chefs and wine experts." },
    start: { local: "2025-10-12T18:00:00" },
    url: "https://example.com/event/3",
    venue: {
      name: "Pier 92",
      latitude: "40.7128",
      longitude: "-74.0060",
      address: { localized_address_display: "711 12th Ave, New York, NY" },
    },
    ticket_availability: {
      has_available_tickets: true,
      minimum_ticket_price: { display: "$85" },
    },
    category: "food",
  },
  {
    id: "4",
    name: { text: "Chicago Bulls vs. Lakers" },
    description: { text: "NBA regular season game at United Center." },
    start: { local: "2025-02-28T20:00:00" },
    url: "https://example.com/event/4",
    venue: {
      name: "United Center",
      latitude: "41.8807",
      longitude: "-87.6742",
      address: { localized_address_display: "1901 W Madison St, Chicago, IL" },
    },
    ticket_availability: {
      has_available_tickets: false,
      minimum_ticket_price: { display: "$150" },
    },
    category: "sports",
  },
  {
    id: "5",
    name: { text: "Miami Beach Art Walk" },
    description: { text: "Monthly gallery tour featuring local and international artists." },
    start: { local: "2025-01-15T19:00:00" },
    url: "https://example.com/event/5",
    venue: {
      name: "Wynwood Walls",
      latitude: "25.7617",
      longitude: "-80.1918",
      address: { localized_address_display: "2520 NW 2nd Ave, Miami, FL" },
    },
    ticket_availability: {
      has_available_tickets: true,
      minimum_ticket_price: { display: "Free" },
    },
    category: "arts",
  },
  {
    id: "6",
    name: { text: "Austin SXSW Music Festival" },
    description: { text: "Interactive media and music festival." },
    start: { local: "2025-03-14T12:00:00" },
    url: "https://example.com/event/6",
    venue: {
      name: "Austin Convention Center",
      latitude: "30.2672",
      longitude: "-97.7431",
      address: { localized_address_display: "500 E Cesar Chavez St, Austin, TX" },
    },
    ticket_availability: {
      has_available_tickets: true,
      minimum_ticket_price: { display: "$299" },
    },
    category: "music",
  },
  {
    id: "7",
    name: { text: "Seattle Coffee Festival" },
    description: { text: "Celebration of coffee culture with tastings and workshops." },
    start: { local: "2025-07-20T10:00:00" },
    url: "https://example.com/event/7",
    venue: {
      name: "Seattle Center",
      latitude: "47.6205",
      longitude: "-122.3493",
      address: { localized_address_display: "305 Harrison St, Seattle, WA" },
    },
    ticket_availability: {
      has_available_tickets: true,
      minimum_ticket_price: { display: "$35" },
    },
    category: "food",
  },
  {
    id: "8",
    name: { text: "Las Vegas EDC Festival" },
    description: { text: "Electronic dance music festival under the stars." },
    start: { local: "2025-05-16T20:00:00" },
    url: "https://example.com/event/8",
    venue: {
      name: "Las Vegas Motor Speedway",
      latitude: "36.2723",
      longitude: "-115.0108",
      address: { localized_address_display: "7000 Las Vegas Blvd N, Las Vegas, NV" },
    },
    ticket_availability: {
      has_available_tickets: true,
      minimum_ticket_price: { display: "$399" },
    },
    category: "music",
  },
  {
    id: "9",
    name: { text: "San Diego Comic-Con" },
    description: { text: "International comic book and popular arts convention." },
    start: { local: "2025-07-24T09:00:00" },
    url: "https://example.com/event/9",
    venue: {
      name: "San Diego Convention Center",
      latitude: "32.7157",
      longitude: "-117.1611",
      address: { localized_address_display: "111 W Harbor Dr, San Diego, CA" },
    },
    ticket_availability: {
      has_available_tickets: false,
      minimum_ticket_price: { display: "$75" },
    },
    category: "arts",
  },
  {
    id: "10",
    name: { text: "Houston Rodeo" },
    description: { text: "World's largest livestock exhibition and rodeo." },
    start: { local: "2025-03-03T19:00:00" },
    url: "https://example.com/event/10",
    venue: {
      name: "NRG Stadium",
      latitude: "29.7604",
      longitude: "-95.3698",
      address: { localized_address_display: "1 NRG Pkwy, Houston, TX" },
    },
    ticket_availability: {
      has_available_tickets: true,
      minimum_ticket_price: { display: "$25" },
    },
    category: "sports",
  },
  {
    id: "11",
    name: { text: "Dallas Cowboys vs. Eagles" },
    description: { text: "NFL rivalry game at AT&T Stadium." },
    start: { local: "2025-11-23T15:30:00" },
    url: "https://example.com/event/11",
    venue: {
      name: "AT&T Stadium",
      latitude: "32.7473",
      longitude: "-97.0945",
      address: { localized_address_display: "1 AT&T Way, Arlington, TX" },
    },
    ticket_availability: {
      has_available_tickets: true,
      minimum_ticket_price: { display: "$120" },
    },
    category: "sports",
  },
  {
    id: "12",
    name: { text: "Orlando Disney Marathon" },
    description: { text: "Run through the magic of Walt Disney World." },
    start: { local: "2025-01-12T06:00:00" },
    url: "https://example.com/event/12",
    venue: {
      name: "Walt Disney World",
      latitude: "28.3852",
      longitude: "-81.5639",
      address: { localized_address_display: "1375 E Buena Vista Dr, Lake Buena Vista, FL" },
    },
    ticket_availability: {
      has_available_tickets: true,
      minimum_ticket_price: { display: "$185" },
    },
    category: "sports",
  },
  {
    id: "13",
    name: { text: "Tampa Bay Lightning Game" },
    description: { text: "NHL hockey game at Amalie Arena." },
    start: { local: "2025-02-15T19:00:00" },
    url: "https://example.com/event/13",
    venue: {
      name: "Amalie Arena",
      latitude: "27.9425",
      longitude: "-82.4519",
      address: { localized_address_display: "401 Channelside Dr, Tampa, FL" },
    },
    ticket_availability: {
      has_available_tickets: true,
      minimum_ticket_price: { display: "$45" },
    },
    category: "sports",
  },
  {
    id: "14",
    name: { text: "Buffalo Bills Home Game" },
    description: { text: "NFL football at Highmark Stadium." },
    start: { local: "2025-10-05T13:00:00" },
    url: "https://example.com/event/14",
    venue: {
      name: "Highmark Stadium",
      latitude: "42.7737",
      longitude: "-78.7870",
      address: { localized_address_display: "1 Bills Dr, Orchard Park, NY" },
    },
    ticket_availability: {
      has_available_tickets: true,
      minimum_ticket_price: { display: "$65" },
    },
    category: "sports",
  },
  {
    id: "15",
    name: { text: "Rochester Jazz Festival" },
    description: { text: "Nine-day jazz festival in downtown Rochester." },
    start: { local: "2025-06-20T18:00:00" },
    url: "https://example.com/event/15",
    venue: {
      name: "Eastman Theatre",
      latitude: "43.1566",
      longitude: "-77.6088",
      address: { localized_address_display: "26 Gibbs St, Rochester, NY" },
    },
    ticket_availability: {
      has_available_tickets: true,
      minimum_ticket_price: { display: "$30" },
    },
    category: "music",
  },
  {
    id: "16",
    name: { text: "San Jose Tech Conference" },
    description: { text: "Silicon Valley's premier technology conference." },
    start: { local: "2025-09-15T08:00:00" },
    url: "https://example.com/event/16",
    venue: {
      name: "San Jose Convention Center",
      latitude: "37.3382",
      longitude: "-121.8863",
      address: { localized_address_display: "150 W San Carlos St, San Jose, CA" },
    },
    ticket_availability: {
      has_available_tickets: true,
      minimum_ticket_price: { display: "$299" },
    },
    category: "tech",
  },
  {
    id: "17",
    name: { text: "Tacoma Art Museum Exhibition" },
    description: { text: "Contemporary art exhibition featuring Pacific Northwest artists." },
    start: { local: "2025-04-10T10:00:00" },
    url: "https://example.com/event/17",
    venue: {
      name: "Tacoma Art Museum",
      latitude: "47.2529",
      longitude: "-122.4443",
      address: { localized_address_display: "1701 Pacific Ave, Tacoma, WA" },
    },
    ticket_availability: {
      has_available_tickets: true,
      minimum_ticket_price: { display: "$15" },
    },
    category: "arts",
  },
  {
    id: "18",
    name: { text: "Reno Food Truck Festival" },
    description: { text: "Weekend celebration of mobile cuisine and local flavors." },
    start: { local: "2025-08-16T11:00:00" },
    url: "https://example.com/event/18",
    venue: {
      name: "Idlewild Park",
      latitude: "39.5296",
      longitude: "-119.8138",
      address: { localized_address_display: "1900 Idlewild Dr, Reno, NV" },
    },
    ticket_availability: {
      has_available_tickets: true,
      minimum_ticket_price: { display: "Free" },
    },
    category: "food",
  },
  {
    id: "19",
    name: { text: "Springfield State Fair" },
    description: { text: "Illinois State Fair with rides, food, and entertainment." },
    start: { local: "2025-08-14T10:00:00" },
    url: "https://example.com/event/19",
    venue: {
      name: "Illinois State Fairgrounds",
      latitude: "39.7817",
      longitude: "-89.6501",
      address: { localized_address_display: "801 E Sangamon Ave, Springfield, IL" },
    },
    ticket_availability: {
      has_available_tickets: true,
      minimum_ticket_price: { display: "$10" },
    },
    category: "arts",
  },
  {
    id: "20",
    name: { text: "Chicago Blues Festival" },
    description: { text: "The largest free blues festival in the world." },
    start: { local: "2025-06-07T12:00:00" },
    url: "https://example.com/event/20",
    venue: {
      name: "Millennium Park",
      latitude: "41.8826",
      longitude: "-87.6226",
      address: { localized_address_display: "Chicago, IL" },
    },
    ticket_availability: {
      has_available_tickets: true,
      minimum_ticket_price: { display: "Free" },
    },
    category: "music",
  },
  {
    id: "21",
    name: { text: "Miami Art Basel" },
    description: { text: "World-renowned art show featuring galleries from across the globe." },
    start: { local: "2025-12-04T10:00:00" },
    url: "https://example.com/event/21",
    venue: {
      name: "Miami Beach Convention Center",
      latitude: "25.7959",
      longitude: "-80.1333",
      address: { localized_address_display: "1901 Convention Center Dr, Miami Beach, FL" },
    },
    ticket_availability: {
      has_available_tickets: true,
      minimum_ticket_price: { display: "$65" },
    },
    category: "arts",
  },
  {
    id: "22",
    name: { text: "Seattle Tech Week" },
    description: { text: "A week-long series of events for startups and tech enthusiasts." },
    start: { local: "2025-05-20T09:00:00" },
    url: "https://example.com/event/22",
    venue: {
      name: "Seattle Convention Center",
      latitude: "47.6126",
      longitude: "-122.3316",
      address: { localized_address_display: "705 Pike St, Seattle, WA" },
    },
    ticket_availability: {
      has_available_tickets: true,
      minimum_ticket_price: { display: "$99" },
    },
    category: "tech",
  },
  {
    id: "23",
    name: { text: "Las Vegas Food Expo" },
    description: { text: "Discover new culinary trends with top chefs and vendors." },
    start: { local: "2025-09-25T11:00:00" },
    url: "https://example.com/event/23",
    venue: {
      name: "Las Vegas Convention Center",
      latitude: "36.1311",
      longitude: "-115.1522",
      address: { localized_address_display: "3150 Paradise Rd, Las Vegas, NV" },
    },
    ticket_availability: {
      has_available_tickets: true,
      minimum_ticket_price: { display: "$45" },
    },
    category: "food",
  },
  {
    id: "24",
    name: { text: "Orlando Magic vs. Miami Heat" },
    description: { text: "NBA showdown between Florida rivals." },
    start: { local: "2025-03-18T19:30:00" },
    url: "https://example.com/event/24",
    venue: {
      name: "Kia Center",
      latitude: "28.5392",
      longitude: "-81.3839",
      address: { localized_address_display: "400 W Church St #200, Orlando, FL" },
    },
    ticket_availability: {
      has_available_tickets: true,
      minimum_ticket_price: { display: "$110" },
    },
    category: "sports",
  },
  {
    id: "25",
    name: { text: "Reno Hot Air Balloon Race" },
    description: { text: "The world's largest free hot-air ballooning event." },
    start: { local: "2025-09-06T05:00:00" },
    url: "https://example.com/event/25",
    venue: {
      name: "Rancho San Rafael Regional Park",
      latitude: "39.5412",
      longitude: "-119.8296",
      address: { localized_address_display: "1595 N Sierra St, Reno, NV" },
    },
    ticket_availability: {
      has_available_tickets: true,
      minimum_ticket_price: { display: "Free" },
    },
    category: "arts",
  },
];

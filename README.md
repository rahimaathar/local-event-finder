# Event Explorer 🎉

A modern, interactive web application for discovering and exploring local events across major US cities. Built with Next.js, TypeScript, and Mapbox, Event Explorer provides a seamless experience for finding concerts, tech conferences, sports events, food festivals, and cultural activities near you.

## ✨ Features

### 🗺️ Interactive Map View
- **Real-time location tracking** with Mapbox integration
- **Event markers** with color-coded categories and status indicators
- **Interactive popups** showing event details, pricing, and availability
- **Responsive design** that works on desktop and mobile devices

### 🔍 Advanced Search & Filtering
- **Location-based filtering** by state and city
- **Category filtering** (Music, Technology, Sports, Food & Drink, Arts & Culture)
- **Date range filtering** (Today, Tomorrow, This Week, This Month)
- **Text search** across event names, venues, and descriptions
- **Smart sorting** by date, name, or price

### 📊 Event Statistics
- **Real-time event counts** and analytics
- **Category distribution** charts
- **Price range analysis**
- **Geographic event density** visualization

### 🎯 User Experience
- **Modern, glassmorphism UI** with smooth animations
- **Responsive design** that adapts to any screen size
- **Loading states** and error handling
- **Accessibility features** for inclusive design

## 🛠️ Technology Stack

- **Frontend Framework**: Next.js 15.4.6 with React 19.1.0
- **Language**: TypeScript for type safety
- **Styling**: Tailwind CSS 4 with custom glassmorphism effects
- **Mapping**: Mapbox GL JS with react-map-gl
- **Date Handling**: date-fns for robust date manipulation
- **Icons**: Lucide React for beautiful, consistent icons

## 🚀 Getting Started

### Prerequisites
- Node.js 18+ 
- npm or yarn package manager
- Mapbox API key (free tier available)

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/rahimaathar/local-event-finder.git
   cd local-event-finder
   ```

2. **Install dependencies**
   ```bash
   npm install
   # or
   yarn install
   ```

3. **Set up environment variables**
   Create a `.env.local` file in the root directory:
   ```env
   NEXT_PUBLIC_MAPBOX_TOKEN=your_mapbox_access_token_here
   ```

4. **Get a Mapbox API key**
   - Visit [Mapbox](https://www.mapbox.com/)
   - Create a free account
   - Generate an access token
   - Add it to your `.env.local` file

5. **Run the development server**
   ```bash
   npm run dev
   # or
   yarn dev
   ```

6. **Open your browser**
   Navigate to [http://localhost:3000](http://localhost:3000) to see the application

## 📁 Project Structure

```
local-event-finder/
├── app/
│   ├── components/
│   │   ├── EventStats.tsx      # Event statistics and analytics
│   │   └── MapView.tsx         # Interactive map component
│   ├── data/
│   │   ├── events.json         # Event data structure
│   │   └── mockData.ts         # Mock events and location data
│   ├── api/
│   │   └── events/
│   │       └── route.ts        # API endpoints for events
│   ├── globals.css             # Global styles and Tailwind config
│   ├── layout.tsx              # Root layout component
│   └── page.tsx                # Main application page
├── public/                     # Static assets
├── package.json                # Dependencies and scripts
└── README.md                   # This file
```

## 🎨 Key Components

### EventStats Component
Displays real-time analytics including:
- Total event count
- Category distribution
- Price range analysis
- Geographic event density

### MapView Component
Interactive map featuring:
- Event markers with category colors
- Popup information cards
- Real-time location updates
- Responsive zoom and pan controls

### Main Page
The central hub that combines:
- Advanced filtering controls
- Event list with detailed cards
- Interactive map view
- Search and sorting functionality

## 🔧 Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run start` - Start production server
- `npm run lint` - Run ESLint for code quality

## 🌍 Supported Locations

Currently supports events in major US cities:

**California**: San Francisco, Los Angeles, San Diego, San Jose  
**New York**: New York City, Buffalo, Rochester  
**Texas**: Houston, Austin, Dallas  
**Illinois**: Chicago, Springfield  
**Florida**: Miami, Orlando, Tampa  
**Washington**: Seattle, Tacoma  
**Nevada**: Las Vegas, Reno  

## 🎯 Event Categories

- **Music** - Concerts, festivals, live performances
- **Technology** - Conferences, meetups, hackathons
- **Sports** - Games, tournaments, fitness events
- **Food & Drink** - Festivals, tastings, culinary events
- **Arts & Culture** - Exhibitions, theater, museums

## 🔮 Future Enhancements

- [ ] Real-time event data integration
- [ ] User accounts and favorites
- [ ] Event recommendations
- [ ] Social sharing features
- [ ] Mobile app version
- [ ] Advanced filtering options
- [ ] Event ticket purchasing integration

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- [Mapbox](https://www.mapbox.com/) for mapping services
- [Next.js](https://nextjs.org/) for the React framework
- [Tailwind CSS](https://tailwindcss.com/) for styling
- [date-fns](https://date-fns.org/) for date utilities

## 📞 Support

If you have any questions or need help with the project, please open an issue on GitHub or contact the maintainers.

---

**Built with ❤️ using Next.js, TypeScript, and Mapbox**

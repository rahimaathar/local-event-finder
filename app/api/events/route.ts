import { NextResponse } from 'next/server';
import events from '../../data/events.json';

export async function GET(req: Request) {
    const { searchParams } = new URL(req.url);
    const lat = searchParams.get('lat');
    const lng = searchParams.get('lng');

    console.log('API Route - Received request:', { lat, lng });

    if (!lat || !lng) {
        return NextResponse.json(
            { message: 'Latitude and longitude are required' },
            { status: 400 }
        );
    }

    try {
        // Convert search coordinates to numbers
        const searchLat = parseFloat(lat);
        const searchLng = parseFloat(lng);

        // Filter events within ~10km radius (rough approximation)
        const nearbyEvents = events.filter(event => {
            const eventLat = parseFloat(event.venue.latitude);
            const eventLng = parseFloat(event.venue.longitude);

            // Simple distance calculation (this is a rough approximation)
            const distance = Math.sqrt(
                Math.pow(eventLat - searchLat, 2) +
                Math.pow(eventLng - searchLng, 2)
            );

            // ~0.1 degrees is roughly 10km
            return distance < 0.1;
        });

        console.log(`Found ${nearbyEvents.length} nearby events`);

        return NextResponse.json({ events: nearbyEvents });
    } catch (error) {
        console.error('API Route Error:', error);
        return NextResponse.json(
            { message: error instanceof Error ? error.message : 'Server error' },
            { status: 500 }
        );
    }
}
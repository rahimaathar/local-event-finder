'use client';

import { useMemo } from 'react';

interface Event {
    id: string;
    name: { text: string };
    start: { local: string };
    category?: string;
    ticket_availability?: {
        has_available_tickets: boolean;
        minimum_ticket_price?: {
            display: string;
        };
    };
}

interface EventStatsProps {
    events: Event[];
}

export default function EventStats({ events }: EventStatsProps) {
    const stats = useMemo(() => {
        const totalEvents = events.length;
        const freeEvents = events.filter(event =>
            event.ticket_availability?.minimum_ticket_price?.display === 'Free'
        ).length;
        const soldOutEvents = events.filter(event =>
            !event.ticket_availability?.has_available_tickets
        ).length;

        const categoryCounts = events.reduce((acc, event) => {
            const category = event.category || 'other';
            acc[category] = (acc[category] || 0) + 1;
            return acc;
        }, {} as Record<string, number>);

        const upcomingEvents = events.filter(event => {
            const eventDate = new Date(event.start.local);
            const now = new Date();
            return eventDate > now;
        }).length;

        return {
            totalEvents,
            freeEvents,
            soldOutEvents,
            upcomingEvents,
            categoryCounts
        };
    }, [events]);

    const getCategoryIcon = (category: string) => {
        switch (category) {
            case 'music': return '🎵';
            case 'tech': return '💻';
            case 'sports': return '⚽';
            case 'food': return '🍕';
            case 'arts': return '🎨';
            default: return '📅';
        }
    };

    return (
        <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-lg p-6 mb-6 border border-white/20">
            <h3 className="text-xl font-bold text-gray-900 mb-4">Event Overview</h3>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
                <div className="text-center p-4 bg-gradient-to-br from-blue-50 to-blue-100 rounded-xl">
                    <div className="text-2xl font-bold text-blue-600">{stats.totalEvents}</div>
                    <div className="text-sm text-blue-700 font-medium">Total Events</div>
                </div>

                <div className="text-center p-4 bg-gradient-to-br from-green-50 to-green-100 rounded-xl">
                    <div className="text-2xl font-bold text-green-600">{stats.freeEvents}</div>
                    <div className="text-sm text-green-700 font-medium">Free Events</div>
                </div>

                <div className="text-center p-4 bg-gradient-to-br from-purple-50 to-purple-100 rounded-xl">
                    <div className="text-2xl font-bold text-purple-600">{stats.upcomingEvents}</div>
                    <div className="text-sm text-purple-700 font-medium">Upcoming</div>
                </div>

                <div className="text-center p-4 bg-gradient-to-br from-red-50 to-red-100 rounded-xl">
                    <div className="text-2xl font-bold text-red-600">{stats.soldOutEvents}</div>
                    <div className="text-sm text-red-700 font-medium">Sold Out</div>
                </div>
            </div>

            <div>
                <h4 className="text-lg font-semibold text-gray-900 mb-3">Events by Category</h4>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                    {Object.entries(stats.categoryCounts).map(([category, count]) => (
                        <div key={category} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                            <div className="flex items-center gap-2">
                                <span className="text-lg">{getCategoryIcon(category)}</span>
                                <span className="text-sm font-medium text-gray-700 capitalize">
                                    {category}
                                </span>
                            </div>
                            <span className="text-sm font-bold text-gray-900">{count}</span>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}

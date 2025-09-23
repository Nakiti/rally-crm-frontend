'use client';

import React, { useState, useMemo } from 'react';
import { 
  EventsHeader, 
  EventsTabs, 
  EventCard 
} from '@/components/public/dashboard';
import { eventsData, getRegisteredEvents, getPastEvents } from '@/lib/data/eventsData';

type TabType = 'registered' | 'past';

export default function EventsPage() {
  const [activeTab, setActiveTab] = useState<TabType>('registered');

  // Get events data
  const registeredEvents = useMemo(() => getRegisteredEvents(eventsData), []);
  const pastEvents = useMemo(() => getPastEvents(eventsData), []);

  const handleCreateEvent = () => {
    // TODO: Implement create event functionality
    console.log('Create new event');
  };

  const handleViewDetails = (event: any) => {
    // TODO: Implement view event details
    console.log('View event details:', event.id);
  };

  const handleRegister = (event: any) => {
    // TODO: Implement event registration
    console.log('Register for event:', event.id);
  };

  const currentEvents = activeTab === 'registered' ? registeredEvents : pastEvents;

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <EventsHeader onCreateEvent={handleCreateEvent} />

        {/* Tabs */}
        <EventsTabs
          activeTab={activeTab}
          onTabChange={setActiveTab}
          registeredCount={registeredEvents.length}
          pastCount={pastEvents.length}
          className="mb-8"
        />

        {/* Events Grid */}
        {currentEvents.length > 0 ? (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {currentEvents.map((event) => (
              <EventCard
                key={event.id}
                event={event}
                onViewDetails={handleViewDetails}
                onRegister={handleRegister}
              />
            ))}
          </div>
        ) : (
          <div className="bg-white rounded-xl border border-gray-200 shadow-sm">
            <div className="text-center py-12">
              <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
              </div>
              <h3 className="text-lg font-medium text-gray-900 mb-2">
                {activeTab === 'registered' ? 'No upcoming events' : 'No past events'}
              </h3>
              <p className="text-gray-600 mb-6">
                {activeTab === 'registered' 
                  ? 'You haven\'t registered for any upcoming events yet.'
                  : 'You haven\'t attended any past events yet.'
                }
              </p>
              {activeTab === 'registered' && (
                <button
                  onClick={handleCreateEvent}
                  className="inline-flex items-center px-4 py-2 border border-transparent rounded-lg text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  Browse Events
                </button>
              )}
            </div>
          </div>
        )}

        {/* Quick Stats */}
        {currentEvents.length > 0 && (
          <div className="mt-12 bg-white rounded-xl border border-gray-200 shadow-sm p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Quick Stats</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="text-center">
                <div className="text-2xl font-bold text-blue-600">
                  {currentEvents.length}
                </div>
                <div className="text-sm text-gray-600">
                  {activeTab === 'registered' ? 'Upcoming Events' : 'Past Events'}
                </div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-green-600">
                  {currentEvents.filter(e => e.status === 'completed').length}
                </div>
                <div className="text-sm text-gray-600">
                  Completed
                </div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-purple-600">
                  {new Set(currentEvents.map(e => e.category)).size}
                </div>
                <div className="text-sm text-gray-600">
                  Categories
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
import React from 'react';
import { Card, CardHeader, CardContent } from '@/components/ui';
import Table from '@/components/ui/Table';
import { ColumnDefinition } from '@/lib/types';
// Simple date formatting function
const formatDate = (dateString: string) => {
  const date = new Date(dateString);
  return date.toLocaleDateString('en-US', { 
    month: 'short', 
    day: '2-digit', 
    year: 'numeric' 
  });
};

const formatDateTime = (dateString: string) => {
  const date = new Date(dateString);
  return date.toLocaleDateString('en-US', { 
    month: 'short', 
    day: '2-digit', 
    year: 'numeric',
    hour: 'numeric',
    minute: '2-digit',
    hour12: true
  });
};
import { Calendar, MapPin, Users } from 'lucide-react';

interface Event {
  id: string;
  title: string;
  date: string;
  location: string;
  attendees: number;
  maxAttendees: number;
  status: 'upcoming' | 'full' | 'cancelled';
}

interface UpcomingEventsTableProps {
  events: Event[];
  className?: string;
}

export const UpcomingEventsTable: React.FC<UpcomingEventsTableProps> = ({
  events,
  className = ''
}) => {
  const columns: ColumnDefinition<Event>[] = [
    {
      accessorKey: 'title',
      label: 'Event',
      render: (event) => (
        <div>
          <div className="font-medium text-gray-900">{event.title}</div>
          <div className="flex items-center text-sm text-gray-500 mt-1">
            <Calendar className="w-4 h-4 mr-1" />
            {formatDateTime(event.date)}
          </div>
        </div>
      ),
    },
    {
      accessorKey: 'location',
      label: 'Location',
      render: (event) => (
        <div className="flex items-center text-gray-600">
          <MapPin className="w-4 h-4 mr-1" />
          {event.location}
        </div>
      ),
    },
    {
      accessorKey: 'attendees',
      label: 'Attendance',
      render: (event) => (
        <div className="flex items-center text-gray-600">
          <Users className="w-4 h-4 mr-1" />
          <span>{event.attendees}/{event.maxAttendees}</span>
        </div>
      ),
    },
    {
      accessorKey: 'status',
      label: 'Status',
      render: (event) => (
        <span
          className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
            event.status === 'upcoming'
              ? 'bg-blue-100 text-blue-800'
              : event.status === 'full'
              ? 'bg-orange-100 text-orange-800'
              : 'bg-red-100 text-red-800'
          }`}
        >
          {event.status === 'upcoming' ? 'Upcoming' : 
           event.status === 'full' ? 'Full' : 'Cancelled'}
        </span>
      ),
    },
  ];

  return (
    <Card className={className}>
      <CardHeader>
        <h3 className="text-lg font-semibold text-gray-900">Upcoming Events</h3>
        <p className="text-sm text-gray-600">Scheduled events and fundraisers</p>
      </CardHeader>
      <CardContent className="p-0">
        <Table
          data={events}
          columns={columns}
        />
      </CardContent>
    </Card>
  );
};

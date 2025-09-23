import React from 'react';
import { Card, CardContent } from '@/components/ui';
import { Calendar, MapPin, Users, Clock, ExternalLink } from 'lucide-react';

interface Event {
  id: string;
  title: string;
  description: string;
  date: string;
  time: string;
  location: string;
  attendees: number;
  maxAttendees: number;
  status: 'upcoming' | 'ongoing' | 'completed' | 'cancelled';
  imageUrl?: string;
  category: string;
}

interface EventCardProps {
  event: Event;
  onViewDetails?: (event: Event) => void;
  onRegister?: (event: Event) => void;
  className?: string;
}

export const EventCard: React.FC<EventCardProps> = ({
  event,
  onViewDetails,
  onRegister,
  className = ''
}) => {
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { 
      weekday: 'long',
      month: 'long', 
      day: 'numeric',
      year: 'numeric'
    });
  };

  const formatTime = (timeString: string) => {
    const time = new Date(`2000-01-01T${timeString}`);
    return time.toLocaleTimeString('en-US', {
      hour: 'numeric',
      minute: '2-digit',
      hour12: true
    });
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'upcoming':
        return 'bg-blue-100 text-blue-800';
      case 'ongoing':
        return 'bg-green-100 text-green-800';
      case 'completed':
        return 'bg-gray-100 text-gray-800';
      case 'cancelled':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case 'upcoming':
        return 'Upcoming';
      case 'ongoing':
        return 'Ongoing';
      case 'completed':
        return 'Completed';
      case 'cancelled':
        return 'Cancelled';
      default:
        return status;
    }
  };

  const isEventFull = event.attendees >= event.maxAttendees;
  const canRegister = event.status === 'upcoming' && !isEventFull;

  return (
    <Card className={`hover:shadow-lg transition-shadow duration-200 ${className}`}>
      <CardContent className="p-0">
        {/* Event Image */}
        {event.imageUrl && (
          <div className="h-32 w-full overflow-hidden rounded-t-lg">
            <img
              src={event.imageUrl}
              alt={event.title}
              className="h-full w-full object-cover"
            />
          </div>
        )}

        <div className="p-4">
          {/* Header */}
          <div className="flex items-start justify-between mb-3">
            <div className="flex-1">
              <div className="flex items-center gap-2 mb-2">
                <span className="text-xs font-medium text-blue-600 bg-blue-50 px-2 py-1 rounded-full">
                  {event.category}
                </span>
                <span className={`text-xs font-semibold px-2 py-1 rounded-full ${getStatusColor(event.status)}`}>
                  {getStatusText(event.status)}
                </span>
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-1">
                {event.title}
              </h3>
              <p className="text-gray-600 text-xs line-clamp-2">
                {event.description}
              </p>
            </div>
          </div>

          {/* Event Details */}
          <div className="space-y-2 mb-4">
            <div className="flex items-center text-xs text-gray-600">
              <Calendar className="w-3 h-3 mr-2 text-gray-400" />
              <span>{formatDate(event.date)}</span>
            </div>
            <div className="flex items-center text-xs text-gray-600">
              <Clock className="w-3 h-3 mr-2 text-gray-400" />
              <span>{formatTime(event.time)}</span>
            </div>
            <div className="flex items-center text-xs text-gray-600">
              <MapPin className="w-3 h-3 mr-2 text-gray-400" />
              <span className="truncate">{event.location}</span>
            </div>
            <div className="flex items-center text-xs text-gray-600">
              <Users className="w-3 h-3 mr-2 text-gray-400" />
              <span>
                {event.attendees}/{event.maxAttendees} attendees
                {isEventFull && <span className="text-red-600 ml-1">(Full)</span>}
              </span>
            </div>
          </div>

          {/* Actions */}
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              {canRegister && (
                <button
                  onClick={() => onRegister?.(event)}
                  className="px-3 py-1.5 bg-blue-600 hover:bg-blue-700 text-white text-xs font-medium rounded-md transition-colors duration-200"
                >
                  Register
                </button>
              )}
              <button
                onClick={() => onViewDetails?.(event)}
                className="px-3 py-1.5 border border-gray-300 hover:bg-gray-50 text-gray-700 text-xs font-medium rounded-md transition-colors duration-200"
              >
                View Details
              </button>
            </div>
            <button className="text-gray-400 hover:text-gray-600">
              <ExternalLink className="w-3 h-3" />
            </button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

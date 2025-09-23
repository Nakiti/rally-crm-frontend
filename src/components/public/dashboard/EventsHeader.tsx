"use client";

import { Calendar, Plus } from "lucide-react";
import { Button } from "@/components/ui";

interface EventsHeaderProps {
  onCreateEvent?: () => void;
}

const EventsHeader: React.FC<EventsHeaderProps> = ({ 
  onCreateEvent 
}) => {
  return (
    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-8">
      <div className="space-y-1">
        <h1 className="text-3xl font-bold text-gray-900 tracking-tight">
          My Events
        </h1>
        <p className="text-gray-600 text-lg">
          View your registered events and past event history
        </p>
      </div>
      <div className="flex gap-3">
        <Button 
          onClick={onCreateEvent}
          className="flex items-center gap-2 px-4 py-2 text-sm font-medium bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors duration-200"
        >
          <Plus className="w-4 h-4" />
          Create Event
        </Button>
      </div>
    </div>
  );
};

export default EventsHeader;

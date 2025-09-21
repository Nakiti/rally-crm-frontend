import React from 'react';
import { Mail, Phone } from 'lucide-react';

// Define the shape of the props this component expects
interface ThankYouInfoSectionProps {
  nextStepsText?: string;
  helpText?: string;
  email?: string;
  phone?: string;
}

// This is a simple, "dumb" component. It just receives props and renders UI.
export function ThankYouInfoSection({ 
  nextStepsText = "You'll receive a confirmation email shortly. Your donation will be processed and you'll get updates on how your contribution is making a difference.",
  helpText = "Need help?",
  email = "support@example.org",
  phone = "(555) 123-4567"
}: ThankYouInfoSectionProps) {
  return (
    <div className="text-left space-y-4">
      <div>
        <h4 className="font-semibold mb-2 text-sm text-slate-800">
          What happens next?
        </h4>
        <p className="text-xs leading-relaxed text-slate-600">
          {nextStepsText}
        </p>
      </div>
      
      <div>
        <h4 className="font-semibold mb-2 text-sm text-slate-800">
          {helpText}
        </h4>
        <div className="flex items-center space-x-4 text-xs text-slate-600">
          <div className="flex items-center space-x-1.5">
            <Mail className="w-3 h-3" />
            <span>{email}</span>
          </div>
          <div className="flex items-center space-x-1.5">
            <Phone className="w-3 h-3" />
            <span>{phone}</span>
          </div>
        </div>
      </div>
    </div>
  );
}

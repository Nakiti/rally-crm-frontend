import Link from 'next/link';
import { ChevronRight } from 'lucide-react';

interface SettingsCardData {
  title: string;
  description: string;
  href: string;
  icon: React.ReactNode;
  comingSoon?: boolean;
}

interface SettingsCardProps {
  card: SettingsCardData;
}

export const SettingsCard: React.FC<SettingsCardProps> = ({ card }) => {
  return (
    <Link 
      href={card.comingSoon ? '#' : card.href}
      className={`group bg-white rounded-lg p-6 transition-all duration-200 border border-transparent ${
        card.comingSoon 
          ? 'opacity-60 cursor-not-allowed' 
          : 'hover:bg-gray-50 hover:border-gray-200 cursor-pointer'
      }`}
      onClick={card.comingSoon ? (e) => e.preventDefault() : undefined}
    >
      <div className="flex items-start space-x-4">
        <div className={`p-3 bg-white rounded-lg transition-colors duration-200 shadow-sm ${
          card.comingSoon ? 'bg-gray-100' : 'group-hover:bg-gray-50'
        }`}>
          {card.icon}
        </div>
        <div className="flex-1">
          <div className="flex items-center justify-between mb-2">
            <h3 className={`text-lg font-medium transition-colors duration-200 ${
              card.comingSoon 
                ? 'text-gray-500' 
                : 'text-gray-900 group-hover:text-blue-600'
            }`}>
              {card.title}
            </h3>
            {!card.comingSoon && (
              <ChevronRight className="w-5 h-5 text-gray-400 group-hover:text-blue-600 transition-colors duration-200" />
            )}
          </div>
          <p className={`text-sm leading-relaxed ${
            card.comingSoon ? 'text-gray-400' : 'text-gray-600'
          }`}>
            {card.description}
          </p>
          {card.comingSoon && (
            <span className="inline-block mt-2 text-xs font-medium text-gray-400 bg-gray-100 px-2 py-1 rounded-full">
              Coming Soon
            </span>
          )}
        </div>
      </div>
    </Link>
  );
};

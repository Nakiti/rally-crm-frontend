import Link from 'next/link';
import { SettingsCardProps } from '@/lib/types/settings.types';

export const SettingsCard: React.FC<SettingsCardProps> = ({ card }) => {
  return (
    <Link 
      href={card.href} 
      className="group bg-white rounded-lg p-6 hover:bg-gray-100 transition-all duration-200 border border-transparent hover:border-gray-200"
    >
      <div className="flex items-start space-x-4">
        <div className="p-3 bg-white rounded-lg group-hover:bg-gray-50 transition-colors duration-200 shadow-sm">
          {card.icon}
        </div>
        <div className="flex-1">
          <h3 className="text-lg font-medium text-gray-900 group-hover:text-blue-600 transition-colors duration-200 mb-2">
            {card.title}
          </h3>
          <p className="text-sm text-gray-600 leading-relaxed">
            {card.description}
          </p>
        </div>
      </div>
    </Link>
  );
};

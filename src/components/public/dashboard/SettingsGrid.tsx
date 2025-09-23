import { SettingsCard } from './SettingsCard';

interface SettingsCardData {
  title: string;
  description: string;
  href: string;
  icon: React.ReactNode;
  comingSoon?: boolean;
}

interface SettingsGridProps {
  cards: SettingsCardData[];
}

export const SettingsGrid: React.FC<SettingsGridProps> = ({ cards }) => {
  return (
    <div className="overflow-hidden">      
      <div className="">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {cards.map((card, index) => (
            <SettingsCard key={index} card={card} />
          ))}
        </div>
      </div>
    </div>
  );
};

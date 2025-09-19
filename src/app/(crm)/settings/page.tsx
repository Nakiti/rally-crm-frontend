import { SettingsHeader, SettingsGrid } from '@/components/crm/settings';
import { createSettingsCards } from '@/lib/utils/settings.utils';
import { SettingsPageProps } from '@/lib/types/settings.types';

/**
 * Component: Settings
 * Description: Renders the settings page with organization configuration options
 */
const Settings: React.FC<SettingsPageProps> = ({ params }) => {
  const { organizationId } = params;
  const settingsCards = createSettingsCards(organizationId);

  return (
    <div className="w-full bg-gray-50">
      <div className="p-6 space-y-6">
        <SettingsHeader 
          title="Settings" 
          description="Manage your organization's configuration and preferences" 
        />
        <SettingsGrid cards={settingsCards} />
      </div>
    </div>
  );
};

export default Settings
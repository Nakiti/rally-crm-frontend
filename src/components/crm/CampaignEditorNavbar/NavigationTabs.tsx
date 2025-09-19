import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { ChevronDown, ChevronUp } from 'lucide-react';
import { PageLink } from './types';
import { isActiveTab } from './utils';
import PreviewDropdown from './PreviewDropdown';

interface NavigationTabsProps {
  detailsLink: string;
  pageLinks: PageLink[];
  showDropdown: boolean;
  onToggleDropdown: () => void;
  onCloseDropdown: () => void;
}

const NavigationTabs: React.FC<NavigationTabsProps> = ({
  detailsLink,
  pageLinks,
  showDropdown,
  onToggleDropdown,
  onCloseDropdown,
}) => {
  const pathname = usePathname();

  return (
    <div className="flex flex-row justify-between w-11/12 mx-auto mt-6 text-white">
      <div className="flex space-x-10">
        <Link
          className={`cursor-pointer text-md font-medium py-1 px-6 border-b-4 ${
            isActiveTab(pathname, detailsLink) ? "border-blue-600" : "border-transparent"
          } hover:text-blue-600`}
          href={detailsLink}
          onClick={onCloseDropdown}
        >
          Details
        </Link>
        <button
          className="cursor-pointer text-md font-medium py-1 px-6 flex items-center border-b-4 border-transparent hover:text-blue-600"
          onClick={onToggleDropdown}
        >
          Pages
          {showDropdown ? <ChevronUp className="ml-2" /> : <ChevronDown className="ml-2" />}
        </button>
      </div>

      <PreviewDropdown pageLinks={pageLinks} />
    </div>
  );
};

export default NavigationTabs;

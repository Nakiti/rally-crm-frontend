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
    <div className="flex flex-row justify-between w-11/12 mx-auto mt-4 pb-2 text-white">
      <div className="flex space-x-8">
        <Link
          className={`cursor-pointer text-sm font-medium py-2 px-4 border-b-2 transition-colors duration-200 ${
            isActiveTab(pathname, detailsLink) 
              ? "border-blue-500 text-blue-400" 
              : "border-transparent text-gray-300 hover:text-blue-400 hover:border-blue-500"
          }`}
          href={detailsLink}
          onClick={onCloseDropdown}
        >
          Details
        </Link>
        <button
          className={`cursor-pointer text-sm font-medium py-2 px-4 flex items-center border-b-2 transition-colors duration-200 ${
            showDropdown
              ? "border-blue-500 text-blue-400"
              : "border-transparent text-gray-300 hover:text-blue-400 hover:border-blue-500"
          }`}
          onClick={onToggleDropdown}
        >
          Pages
          {showDropdown ? <ChevronUp className="ml-2 h-4 w-4" /> : <ChevronDown className="ml-2 h-4 w-4" />}
        </button>
      </div>

      <PreviewDropdown pageLinks={pageLinks} />
    </div>
  );
};

export default NavigationTabs;

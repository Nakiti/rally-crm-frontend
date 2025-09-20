import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { PageLink } from './types';
import { isActiveTab } from './utils';

interface PagesDropdownProps {
  pageLinks: PageLink[];
  showDropdown: boolean;
}

const PagesDropdown: React.FC<PagesDropdownProps> = ({ pageLinks, showDropdown }) => {
  const pathname = usePathname();

  if (!showDropdown) return null;

  return (
    <div className="border-t border-gray-600 bg-gray-800 px-6 w-11/12 mx-auto py-4">
      <div className="mx-auto flex flex-row justify-center space-x-6">
        {pageLinks.filter(item => item != null).map(item => (
          <div key={item.title} className="flex w-48 flex-col items-center">
            <Link 
              className={`w-full h-24 border-2 ${
                isActiveTab(pathname, item.path) 
                  ? "border-blue-500 bg-blue-900/20" 
                  : "border-gray-500 bg-gray-700/20"
              } rounded-lg p-3 flex justify-center items-center hover:border-blue-500 hover:bg-blue-900/20 transition-all duration-200 group`}
              href={item.path}
            >
              <span className="text-gray-300 group-hover:text-blue-300 text-xs font-medium text-center">
                {item.title}
              </span>
            </Link>
            <p className="text-center text-xs text-gray-300 mt-2 font-medium">
              {item.title}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PagesDropdown;

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
    <div className="border-t border-gray-300 px-6 w-11/12 mx-auto py-4">
      <div className="mx-auto flex flex-row justify-center space-x-8">
        {pageLinks.filter(item => item != null).map(item => (
          <div key={item.title} className="flex w-52 flex-col items-center">
            <Link 
              className={`w-full h-28 border-2 ${
                isActiveTab(pathname, item.path) ? "border-blue-600" : "border-gray-400"
              } rounded-md p-4 flex justify-center items-center hover:border-blue-600 transition-all duration-200`}
              href={item.path}
            />
            <p className="text-center text-sm text-white mt-2">{item.title}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PagesDropdown;

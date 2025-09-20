import React, { useState, useRef, useEffect } from 'react';
import { ChevronDown, ChevronUp } from 'lucide-react';
import { PageLink } from './types';

interface PreviewDropdownProps {
  pageLinks: PageLink[];
}

const PreviewDropdown: React.FC<PreviewDropdownProps> = ({ pageLinks }) => {
  const [showLinks, setShowLinks] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setShowLinks(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const toggleDropdown = () => {
    setShowLinks(!showLinks);
  };

  return (
    <div className="relative inline-block" ref={dropdownRef}>
      <button
        onClick={toggleDropdown}
        className="cursor-pointer px-3 py-2 text-gray-300 text-sm flex flex-row justify-between items-center space-x-2 hover:text-white transition-colors duration-200 border border-gray-600 rounded-md hover:border-gray-500"
      >
        <span>Preview</span>
        {showLinks ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
      </button>
      {showLinks && (
        <div className="absolute right-0 top-full mt-1 bg-gray-800 border border-gray-600 shadow-lg w-48 z-50 rounded-md overflow-hidden">
          {pageLinks.filter(item => item != null).map((item, index) => (
            <a
              key={index}
              href={`${item?.link}preview`}
              target="_blank"
              rel="noopener noreferrer"
              className="block px-4 py-3 text-sm text-gray-300 hover:bg-gray-700 hover:text-white transition-colors duration-200 border-b border-gray-700 last:border-b-0"
            >
              {item?.title}
            </a>
          ))}
        </div>
      )}
    </div>
  );
};

export default PreviewDropdown;

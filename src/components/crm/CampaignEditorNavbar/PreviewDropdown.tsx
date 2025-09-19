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
      <div
        onClick={toggleDropdown}
        className="cursor-pointer px-4 py-2 text-white text-sm flex flex-row justify-between items-center space-x-4"
      >
        <p>Preview a Page</p>
        {showLinks ? <ChevronUp /> : <ChevronDown />}
      </div>
      {showLinks && (
        <div className="absolute left-0 bg-gray-800 border border-gray-200 shadow-xs w-48 z-50">
          {pageLinks.filter(item => item != null).map((item, index) => (
            <a
              key={index}
              href={`${item?.link}preview`}
              className="block border-b border-gray-200 px-4 py-3 text-sm text-white hover:bg-gray-700"
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

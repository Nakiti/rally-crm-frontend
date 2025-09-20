'use client';

import React from 'react';
import Link from 'next/link';
import { ArrowLeft } from 'lucide-react'; // Using lucide-react for a clean icon

/**
 * A simple, reusable back button. In this context, it navigates from a specific
 * editor page back to the main resource list (e.g., from a campaign editor
 * back to the main /campaigns page).
 */
export default function BackButton() {
  return (
    <div className="flex flex-row py-3 px-6">
      <Link
        // The link now points to the clean, top-level campaigns list page.
        // This is a more predictable and standard user experience.
        href="/campaigns"
        className="flex items-center text-gray-300 hover:text-white transition-colors duration-200 p-1 rounded-md hover:bg-gray-700/50"
        aria-label="Back to campaigns list"
      >
        <ArrowLeft size={20} />
        <span className="ml-2 text-sm font-medium">Back to Campaigns</span>
      </Link>
    </div>
  );
}

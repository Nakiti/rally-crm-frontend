import React from 'react';
import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';

interface BackButtonProps {
  organizationId: string;
  campaignId: string;
}

const BackButton: React.FC<BackButtonProps> = ({ organizationId, campaignId }) => {
  return (
    <div className="flex flex-row py-2 px-6">
      <Link 
        href={`/org/${organizationId}/dashboard/campaigns/${campaignId}`} 
        className="flex items-center text-gray-200 hover:text-gray-100"
      >
        <ArrowLeft className="text-2xl" />
      </Link>
    </div>
  );
};

export default BackButton;

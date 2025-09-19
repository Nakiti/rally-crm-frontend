import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { BackNavigationProps } from "./types";

const BackNavigation: React.FC<BackNavigationProps> = ({ campaignId }) => {
  return (
    <div className="px-6 py-2">
      <Link 
        href="/campaigns" 
        className="inline-flex items-center text-sm text-gray-300 hover:text-white transition-colors duration-200"
      >
        <ArrowLeft className="w-4 h-4 mr-2" />
        <span className="font-medium">Back to Campaigns</span>
      </Link>
    </div>
  );
};

export default BackNavigation;

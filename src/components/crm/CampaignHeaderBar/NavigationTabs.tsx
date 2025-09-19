import Link from "next/link";
import { NavigationTabsProps, NavigationLink } from "./types";

const NavigationTabs: React.FC<NavigationTabsProps> = ({ campaignId, currentPath }) => {
  const links: NavigationLink[] = [
    { title: "Overview", pathName: `/campaigns/${campaignId}` },
    { title: "Insights", pathName: `/campaigns/${campaignId}/insights` },
    { title: "Transactions", pathName: `/campaigns/${campaignId}/transactions` },
    { title: "Share", pathName: `/campaigns/${campaignId}/share` }
  ];

  return (
    <div className="px-6">
      <nav className="flex space-x-8">
        {links.map((item, index) => (
          <Link 
            key={index} 
            href={item.pathName} 
            className={`px-1 py-2 text-sm font-medium border-b-2 transition-all duration-200 ${
              currentPath === item.pathName 
                ? "border-blue-500 text-blue-400" 
                : "border-transparent text-gray-400 hover:text-gray-200 hover:border-gray-500"
            }`}
          >
            {item.title}
          </Link>
        ))}
      </nav>
    </div>
  );
};

export default NavigationTabs;

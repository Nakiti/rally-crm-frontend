"use client";

import { usePathname } from "next/navigation";
import { NavigationSidebar } from "@/components/crm/NavigationSidebar";
import { MainContentArea } from "@/components/crm/MainContentArea";
import { getNavigationLinks } from "./constants";
import type { DetailsLayoutProps } from "./types";

const DetailsLayout: React.FC<DetailsLayoutProps> = ({ params, children }) => {
  const campaignId = params.id;
  const pathName = usePathname();
  const navigationLinks = getNavigationLinks(campaignId);

  return (
    <div className="bg-white rounded-lg shadow-sm w-11/12 mx-auto flex flex-row">
      <NavigationSidebar
        campaignId={campaignId}
        pathName={pathName}
        links={navigationLinks}
      />
      <MainContentArea>{children}</MainContentArea>
    </div>
  );
};

export default DetailsLayout;
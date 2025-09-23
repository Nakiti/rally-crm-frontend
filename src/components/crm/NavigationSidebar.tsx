"use client";

import Link from "next/link";
import type { NavigationSidebarProps } from "../../app/admin/campaigns/[id]/editor/details/types";

export const NavigationSidebar: React.FC<NavigationSidebarProps> = ({
  campaignId,
  pathName,
  links,
}) => {
  return (
    <div className="flex flex-col border-r-4 border-gray-100 w-1/4 py-8 text-md text-gray-600">
      {links
        .filter((item): item is NonNullable<typeof item> => item != null)
        .map((item, index) => (
          <Link
            key={`${item.title}-${index}`}
            href={item.path}
            className={`p-4 mb-4 pl-6 flex items-center hover:bg-gray-100 transition duration-200 ${
              pathName === item.path
                ? "border-l-4 border-blue-600 font-semibold text-black"
                : "border-l-4 border-transparent text-gray-600"
            }`}
          >
            <p>{item.title}</p>
          </Link>
        ))}
    </div>
  );
};

"use client";

import type { MainContentAreaProps } from "../../app/admin/campaigns/[id]/editor/details/types";

export const MainContentArea: React.FC<MainContentAreaProps> = ({
  children,
}) => {
  return (
    <div className="p-8 w-3/4 rounded-lg">
      {children}
    </div>
  );
};

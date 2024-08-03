import PortalBanner from "@/components/portal/banner";
import React from "react";

type Props = {
  children: React.ReactNode;
};

const layout = ({ children }: Props) => {
  return (
    <div className="flex flex-col md:h-screen min-h-screen">
      <PortalBanner />
      <div className="container flex justify-center flex-1 h-0 py-12">
        {children}
      </div>
    </div>
  );
};

export default layout;

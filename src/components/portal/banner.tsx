import Image from "next/image";
import React from "react";

type Props = {};

const PortalBanner = (props: Props) => {
  return (
    <div className="bg-white flex justify-center max-h-[300px] border-8 border-orange rounded-xl">
      <Image
        src="/images/corn-ai-logo.png"
        alt="portal-banner"
        sizes="100vw"
        width={180}
        height={200}
        className="relative z-10"
      />
    </div>
  );
};

export default PortalBanner;

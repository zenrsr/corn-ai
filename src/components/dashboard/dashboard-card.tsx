import React from "react";

type Props = {
  value: number;
  title: string;
  icon: JSX.Element;
  sales?: boolean;
};

const DasboardCard = ({ title, value, icon, sales }: Props) => {
  return (
    <div className="w-full bg-muted rounded-lg flex flex-col gap-3 pr-10 pl-10 py-10 md:pl-10 md:pr-20 border-[1px] border-gray-900 cursor-pointer md:w-fit">
      <div className="flex gap-3 items-center">
        {icon}
        <h2 className="font-bold text-2xl">{title}</h2>
      </div>
      <p className="font-bold text-4xl">
        {sales && "$"}
        {value}
      </p>
    </div>
  );
};

export default DasboardCard;

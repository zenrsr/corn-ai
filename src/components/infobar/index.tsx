import React from "react";
import BreadCrumb from "./BreadCrumb";
import { Card } from "../ui/card";
import { Headphones, Star, Trash } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { UserButton } from "@clerk/nextjs";

type Props = {};

const InfoBar = (props: Props) => {
  return (
    <div className="flex w-full justify-between items-center p-4 mb-8">
      <BreadCrumb />
      <Avatar className="border-[1px] border-gray-900 flex items-center justify-center">
        <UserButton />
      </Avatar>
    </div>
  );
};

export default InfoBar;

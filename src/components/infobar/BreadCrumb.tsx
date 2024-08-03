"use client";
import React from "react";
import useSidebar from "../sidebar/use-sidebar";
import { Loader } from "../loader";
import { Switch } from "../ui/switch";

type Props = {};

const BreadCrumb = (props: Props) => {
  const {
    chatRoom,
    expand,
    loading,
    onActivateRealtime,
    onExpand,
    onSignOut,
    page,
    realtime
  } = useSidebar();
  console.log("BreadCrumb render:", { loading, realtime, page, chatRoom });
  return (
    <div className="flex flex-col">
      <div className="flex gap-5 items-center">
        <h2 className="text-3xl font-bold capitalize">{page}</h2>
        {page == "conversation" && chatRoom && (
          <Loader loading={loading} className="p-0 inline">
            <Switch
              defaultChecked={realtime}
              onClick={(e) => onActivateRealtime(e)}
              className="data-[state=checked]:bg-orange data-[state=unchecked]:bg-peach"
            />
          </Loader>
        )}
      </div>
      <p className="text-gray-500 text-sm mt-2">
        {page == "settings"
          ? "Manage your account settings , preferences and integrations"
          : page == "dashboard"
          ? "A detailed overview of your metrics , usage, cutomer and more"
          : page == "appointment"
          ? "View and edit all your appointments"
          : page == "email-marketing"
          ? "Send bulk emails to your customers"
          : page == "integration"
          ? "Connect third-party applications into Corn-Ai"
          : " Modify domain settings, change chatbot options, enter sales questions and train your bot to do what you want it to."}
      </p>
    </div>
  );
};

export default BreadCrumb;

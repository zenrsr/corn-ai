/* eslint-disable react-hooks/exhaustive-deps */
"use client";
import { useToast } from "@/components/ui/use-toast";
import { usePathname, useRouter } from "next/navigation";
import React from "react";
import { useEffect, useState } from "react";
import {
  onGetConversationMode,
  onToggleRealtime
} from "@/actions/conversation";
import { useClerk } from "@clerk/nextjs";
import { useChatContext } from "@/context/use-chat-context";

// for some reason the realtime messages only manintains consistancy if it is enabled on the customer side and by the customer himself/herself

const useSideBar = () => {
  const [expand, setExpand] = useState<boolean | undefined>(undefined);
  const router = useRouter();
  const pathname = usePathname();
  const { toast } = useToast();
  const [realtime, setRealtime] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);

  const { chatRoom } = useChatContext();

  const onActivateRealtime = async (e: any) => {
    try {
      const realtime = await onToggleRealtime(
        chatRoom!,
        e.target.ariaChecked == "true" ? false : true
      );
      if (realtime) {
        setRealtime(realtime.chatRoom.live);
        toast({
          title: "Success",
          description: realtime.message
        });
      }
    } catch (error) {
      console.log(error);
    }
  };

  const onGetCurrentMode = async () => {
    setLoading(true);
    try {
      const mode = await onGetConversationMode(chatRoom!);
      if (mode) {
        setRealtime(mode.live);
      }
    } catch (error) {
      console.error("Error fetching conversation mode:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (chatRoom) {
      onGetCurrentMode();
    }
  }, [chatRoom]);

  const page = pathname.split("/").pop();
  const { signOut } = useClerk();

  const onSignOut = () => signOut(() => router.push("/"));

  const onExpand = () => setExpand((prev) => !prev);

  return {
    expand,
    onExpand,
    page,
    onSignOut,
    realtime,
    onActivateRealtime,
    chatRoom,
    loading
  };
};

export default useSideBar;

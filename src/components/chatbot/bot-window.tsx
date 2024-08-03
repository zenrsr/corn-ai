import { ChatBotMessageProps } from "@/schemas/conversation.shema";
import React, { forwardRef } from "react";
import { UseFormRegister } from "react-hook-form";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import RealtimeMode from "./reatime-mode";
import Image from "next/image";
import TabsMenu from "../tabs";
import { BOT_TABS_MENU } from "@/constants/menu";
import { TabsContent } from "../ui/tabs";
import { Separator } from "../ui/separator";
import Bubble from "./bubble";
import Responding from "./responding";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { PaperclipIcon, SendHorizonalIcon } from "lucide-react";
import { Label } from "../ui/label";
import { CardDescription, CardTitle } from "../ui/card";
import Accordian from "../accordian";

type Props = {
  register: UseFormRegister<ChatBotMessageProps>;
  chats: { role: "assistant" | "user"; content: string; link?: string }[];
  onChat(): void;
  onResponding: boolean;
  domainName: string;
  theme?: string | null;
  textColor?: string | null;
  help?: boolean;
  realtimeMode:
    | {
        chatroom: string;
        mode: boolean;
      }
    | undefined;
  helpdesk: {
    id: string;
    question: string;
    answer: string;
    domainId: string | null;
  }[];
  setChat: React.Dispatch<
    React.SetStateAction<
      {
        role: "user" | "assistant";
        content: string;
        link?: string | undefined;
      }[]
    >
  >;
};

const BotWindow = forwardRef<HTMLDivElement, Props>(
  (
    {
      register,
      chats,
      onChat,
      onResponding,
      domainName,
      helpdesk,
      realtimeMode,
      setChat,
      textColor,
      theme,
      help
    },
    ref
  ) => {
    console.log("helpdesk", helpdesk);
    return (
      <div className="h-[570px] w-[450px] flex flex-col bg-white rounded-xl mr-[80px] border-[1px] overflow-x-hidden overflow-y-auto">
        <div className="flex justify-between px-4 pt-4">
          <div className="flex gap-2">
            <Avatar className="w-20 h-20">
              <AvatarImage
                src="https://ucarecdn.com/774ce863-578f-4bed-ac36-780c5e6cf4ec/da9e8a7d1bdff9bfaf00b5508ab8172dphotoaidcomcropped.jpg"
                alt="@batman"
              />
              <AvatarFallback>BW</AvatarFallback>
            </Avatar>
            <div className="flex items-start flex-col">
              <h3 className="text-lg font-bold leading-none">
                AI Assistant - Batman
              </h3>
              <p className="text-sm">{domainName.split(".com")[0]}</p>
              {realtimeMode?.mode && (
                <RealtimeMode
                  setChats={setChat}
                  chatRoomId={realtimeMode.chatroom}
                />
              )}
            </div>
          </div>

          <div className="relative w-16 h-16">
            <Image
              src="https://ucarecdn.com/019dd17d-b69b-4dea-a16b-60e0f25de1e9/propuser.png"
              fill
              alt="users"
              objectFit="contain"
            />
          </div>
        </div>
        <TabsMenu
          triggers={BOT_TABS_MENU}
          className="bg-transparent border-[1px] border-border m-2"
        >
          <TabsContent value="chat">
            <Separator orientation="horizontal" />
            <div className="flex flex-col h-[calc(100%-60px)]">
              <div
                style={{ background: theme || "", color: textColor || "" }}
                className="px-3 flex-1 overflow-y-auto py-5 gap-3 chat-window"
                ref={ref}
              >
                {chats.map((chat, key) => (
                  <Bubble key={key} message={chat} />
                ))}
                {onResponding && <Responding />}
              </div>
              <form
                onSubmit={onChat}
                className="flex px-3 py-2 items-center bg-porcelain border-t border-gray-200 sticky bottom-0"
              >
                <Label htmlFor="upload" className="mx-2 cursor-pointer">
                  <PaperclipIcon />
                  <Input
                    type="file"
                    id="upload"
                    {...register("image")}
                    className="hidden"
                  />
                </Label>
                <Input
                  {...register("content")}
                  placeholder="Type a message"
                  className="focus-visible:ring-0 flex-1 p-2 focus-visible:ring-offset-0 bg-white rounded-md outline-none border"
                />
                <Button type="submit" className="ml-2">
                  <SendHorizonalIcon />
                </Button>
              </form>
            </div>
          </TabsContent>
          <TabsContent value="helpdesk">
            <div className="h-[485px] overflow-y-auto overflow-x-hidden p-4 flex flex-col gap-4">
              <div>
                <CardTitle>Help Desk</CardTitle>
                <CardDescription>
                  Browse from a list of questions people usually ask.
                </CardDescription>
              </div>
              <Separator orientation="horizontal" />
              {helpdesk.map((help) => (
                <Accordian
                  key={help.id}
                  trigger={help.question}
                  content={help.answer}
                  className=""
                />
              ))}
            </div>
          </TabsContent>
        </TabsMenu>
        <div className="flex justify-center py-2">
          <p className="text-gray-400 text-sm">Powered by Corn-Ai</p>
        </div>
      </div>
    );
  }
);

export default BotWindow;
BotWindow.displayName = "BotWindow";

import { currentUser } from "@clerk/nextjs";
import Image from "next/image";
import { redirect } from "next/navigation";
import React from "react";

type Props = {
  children: React.ReactNode;
};

const layout = async ({ children }: Props) => {
  const user = await currentUser();

  if (user) {
    redirect("/");
  }
  return (
    <div className="h-screen w-full flex justify-center">
      <div className="">
        <Image
          src={"/images/corinna-ai-logo.png"}
          alt="logo"
          width={250}
          height={100}
          className="ml-14 pt-6"
        />
        {children}
      </div>
      <div className="hidden lg:flex flex-1 w-full max-h-full max-w-4000px overflow-hidden relative bg-cream flex-col pt-10 pl-24 gap-3">
        <h2 className="text-gravel md:text-4xl font-bold">
          Hi , I&apos;m your AI powered sales assistant, Corny!
        </h2>
        <p className="text-iridium md:text-sm mb-10">
          Corny is capable of capturing lead information without a form...{""}
          <br />
          Something never done before 😏.
        </p>
        <Image
          src="/images/app-ui.png"
          alt="app-ui"
          loading="lazy"
          sizes="30"
          className="absolute shrink-0 !w-[1600px] top-48"
          width={0}
          height={0}
        />
      </div>
    </div>
  );
};

export default layout;

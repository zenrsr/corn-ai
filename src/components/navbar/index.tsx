import Image from "next/image";
import * as React from "react";
import Link from "next/link";
import { Button } from "../ui/button";

function NavBar() {
  return (
    <div className="flex w-screen gap-5 justify-between items-center px-7 font-bold border-none leading-[154.5%] max-md:flex-wrap max-md:px-5 shadow-b-lg sticky top-0 left-0 right-0 backdrop-blur-md bg-opacity-25 z-10">
      <div className="flex gap-1.5 justify-center self-stretch text-2xl tracking-tighter text-neutral-700 p-4">
        <Image
          src="/images/corinna-ai-logo.png"
          alt="LOGO"
          sizes="100vw"
          style={{
            width: "180px",
            height: "auto"
          }}
          width={0}
          height={0}
          className="cursor-pointer hover:scale-110 transotion-all duration-500"
        />
      </div>
      <ul className="gap-5 justify-between self-stretch my-auto text-sm leading-5 text-neutral-700 max-md:flex-wrap max-md:max-w-full font-normal hidden md:flex">
        <li className="hover:cursor-pointer hover:text-black/60 text-lg font-semibold">
          Home
        </li>
        <li className="hover:cursor-pointer hover:text-black/60 text-lg font-semibold">
          Pricing
        </li>
        <li className="hover:cursor-pointer hover:text-black/60 text-lg font-semibold">
          News Room
        </li>
        <li className="hover:cursor-pointer hover:text-black/60 text-lg font-semibold">
          Features
        </li>
        <li className="hover:cursor-pointer hover:text-black/60 text-lg font-semibold">
          Contact us
        </li>
      </ul>
      <Button className="bg-orange px-4 py-2 rounded-sm text-white">
        <Link href="/dashboard">Free Trial</Link>
      </Button>
    </div>
  );
}

export default NavBar;

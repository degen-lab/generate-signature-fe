"use client";

// import Link from "next/link";
import ConnectWallet from "../connect-wallet/ConnectWallet";
import { NetworkDropdown } from "./NetworkDropdown";
import { ThemeSwitch } from "./ThemeSwitch";

export const Navbar = () => {
  return (
    <div
      className={`
      h-[75px] 
      w-full 
      flex 
      flex-row 
      justify-between 
      bg-white dark:bg-black
      text-black dark:text-white
      p-4 
      fixed
    `}
      style={{ zIndex: 100 }}
    >
      {/* <Link
        href="http://www.degenlab.io"
        target="new"
        style={{ color: "white" }}
      >
        Docs
      </Link> */}
      <ConnectWallet />
      <NetworkDropdown />
      <ThemeSwitch />
    </div>
  );
};

"use client";

import Link from "next/link";
import ConnectWallet from "../connect-wallet/ConnectWallet";

export const Navbar = () => {
  return (
    <div
      className="h-[75px] w-full flex flex-row justify-between bg-black/100 p-4 fixed"
      style={{ zIndex: 100 }}
    >
      <Link
        href="http://www.degenlab.io"
        target="new"
        style={{ color: "white" }}
      >
        Docs
      </Link>
      <ConnectWallet></ConnectWallet>
    </div>
  );
};

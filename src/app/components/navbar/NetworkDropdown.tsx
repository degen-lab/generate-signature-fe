"use client";

import { Network } from "@/app/types/types";
import {
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownTrigger,
} from "@nextui-org/react";
import { useNetwork } from "@/app/contexts/NetworkContext";
import { networkInfo } from "@/app/utils/networks";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";

export const NetworkDropdown = () => {
  const { networksList, isWalletConnected } = useNetwork();
  const { resolvedTheme: theme } = useTheme();
  const [render, setRender] = useState(false);

  useEffect(() => {
    setRender(true);
  }, []);

  if (render && isWalletConnected()) {
    return (
      <Dropdown
        closeOnSelect={false}
        className={`rounded-lg border ${
          theme === "dark" ? "border-white/10" : "border-gray-300"
        } flex flex-1 outline-none focus-visible-none`}
      >
        <DropdownTrigger>
          <div className="mr-2">
            <SelectedNetwork />
          </div>
        </DropdownTrigger>
        <DropdownMenu className="p-1">
          <DropdownItem
            key="wallet-settings"
            className="p-2 rounded-xl border-none text-center w-full cursor-default focus:bg-transparent hover:bg-transparent focus:outline-none"
            isReadOnly
          >
            <div className="text-sm text-default-foreground pointer-events-none">
              Change network in wallet settings and connect again
            </div>
          </DropdownItem>
        </DropdownMenu>
      </Dropdown>
    );
  }

  // If wallet is not connected, show network selector
  return (
    <Dropdown
      closeOnSelect={true}
      className={`rounded-lg border-2 ${
        theme === "dark" ? "border-white/10" : "border-gray-300 bg-white"
      } flex flex-1 outline-none focus-visible-none`}
    >
      <DropdownTrigger>
        <div className="mr-2">
          <SelectedNetwork />
        </div>
      </DropdownTrigger>
      <DropdownMenu className="p-1">
        {networksList.map((network) => (
          <DropdownItem
            key={network}
            className="p-2 rounded-xl border-none w-full focus:outline-none focus:bg-transparent"
          >
            <NetworkOption network={network} />
          </DropdownItem>
        ))}
      </DropdownMenu>
    </Dropdown>
  );
};

export const SelectedNetwork: React.FC = () => {
  const { network } = useNetwork();

  return (
    <div className="w-40 rounded-xl text-center p-2 border-1 border-default-foreground cursor-pointer">
      <div className="text-xs p-1 md:text-medium md:p-0">
        {networkInfo[network].title}
      </div>
    </div>
  );
};

export const NetworkOption: React.FC<{ network: Network }> = ({ network }) => {
  const { updateNetwork } = useNetwork();

  return (
    <div
      className="text-center rounded-xl bg-[#FA5512] p-1 cursor-pointer"
      onClick={() => updateNetwork(network)}
      onKeyDown={(e) => {
        if (e.key === "Enter" || e.key === " ") {
          updateNetwork(network);
        }
      }}
      role="button"
      tabIndex={0}
    >
      <div className="text-md text-white">{networkInfo[network].title}</div>
      <div className="text-xs text-white">{networkInfo[network].url}</div>
    </div>
  );
};

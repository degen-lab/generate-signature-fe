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
export const NetworkDropdown = () => {
  const { networksList } = useNetwork();

  return (
    <Dropdown
      closeOnSelect={true}
      className="rounded-lg border-2 border-gray-300 bg-white flex flex-1 outline-none focus-visible-none"
    >
      <DropdownTrigger>
        <div>
          <SelectedNetwork />
        </div>
      </DropdownTrigger>
      <DropdownMenu className="p-1">
        {networksList.map((network) => (
          <DropdownItem
            key={network}
            className="p-2 hover:bg-gray-300 rounded-xl border-none"
            style={{ width: "100%" }}
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
    <div
      className="w-36 rounded-xl text-center p-2 border-2 border-white"
      style={{ cursor: "pointer" }}
    >
      <div className="text-sm">{networkInfo[network].title}</div>
    </div>
  );
};

export const NetworkOption: React.FC<{ network: Network }> = ({ network }) => {
  const { updateNetwork } = useNetwork();

  return (
    <div
      className="text-center rounded-xl bg-[#FA5512] p-1"
      style={{ cursor: "pointer" }}
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

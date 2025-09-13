"use client";
import React, {
  ReactNode,
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";
import { Network } from "@/app/types/types";
import { isConnected } from "@stacks/connect";
import { getUserAddress, detectNetworkFromAddress } from "@/app/utils/wallet";

interface NetworkContextInterface {
  network: Network;
  networksList: Network[];
  updateNetwork: (newNetwork: Network) => void;
  isWalletConnected: () => boolean;
}
const NetworkContext = createContext<NetworkContextInterface>(
  {} as NetworkContextInterface
);

export const NetworkProvider: React.FC<{
  children: ReactNode;
}> = ({ children }) => {
  const [network, setNetwork] = useState<Network>("mainnet");

  const networksList: Network[] = ["mainnet", "testnet", "nakamoto-testnet"];

  useEffect(() => {
    const updateNetworkFromWallet = () => {
      if (typeof window !== "undefined") {
        if (isConnected()) {
          const userAddress = getUserAddress();
          const detectedNetwork = detectNetworkFromAddress(userAddress);
          setNetwork(detectedNetwork);
          localStorage.setItem("network", detectedNetwork);
        } else {
          const savedNetwork = (localStorage.getItem("network") ||
            "mainnet") as Network;
          setNetwork(savedNetwork);
        }
      }
    };
    updateNetworkFromWallet();
  }, []);

  const updateNetwork = (newNetwork: Network) => {
    setNetwork(newNetwork);
    if (typeof window !== "undefined") {
      localStorage.setItem("network", newNetwork);
    }
  };

  const isWalletConnected = () => {
    return isConnected();
  };

  return (
    <NetworkContext.Provider
      value={{ network, networksList, updateNetwork, isWalletConnected }}
    >
      {children}
    </NetworkContext.Provider>
  );
};

export const useNetwork = () => useContext(NetworkContext);

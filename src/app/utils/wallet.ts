import { getLocalStorage, isConnected } from "@stacks/connect";
import { Network } from "../types/types";

export const getUserAddress = () => {
  if (!isConnected()) return null;
  const storage = getLocalStorage();
  console.log(storage);
  if (!storage?.addresses?.stx?.[0]?.address) return null;
  return storage.addresses.stx[0].address as string;
};

export const getUserBtcAddress = () => {
  if (!isConnected()) return null;
  const storage = getLocalStorage();
  if (!storage?.addresses?.btc?.[0]?.address) return null;
  return storage.addresses.btc[0].address as string;
};

export const detectNetworkFromAddress = (address: string | null): Network => {
  if (!address) return "mainnet";
  if (address.startsWith("ST")) {
    return "testnet";
  }
  return "mainnet";
};

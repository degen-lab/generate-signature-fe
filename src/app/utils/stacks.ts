import { StacksTestnet, StacksMainnet } from "@stacks/network";
import { StackingClient } from "@stacks/stacking";
import { Network } from "../types/types";

export const getPoxRewardCycle = async (network: Network) => {
  const stacksNetwork =
    network?.toLowerCase() === "nakamoto-testnet"
      ? new StacksTestnet({ url: "https://api.nakamoto.testnet.hiro.so" })
      : network?.toLowerCase() === "testnet"
      ? new StacksTestnet()
      : new StacksMainnet();
  const address = "ST3XKKN4RPV69NN1PHFDNX3TYKXT7XPC4N8KC1ARH";
  const stackingClient = new StackingClient(address, stacksNetwork);

  return (await stackingClient.getPoxInfo()).reward_cycle_id;
};

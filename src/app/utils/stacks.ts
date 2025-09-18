import { StackingClient } from "@stacks/stacking";
import { Network } from "../types/types";
import { STACKS_MAINNET, STACKS_TESTNET } from "@stacks/network";

export const getPoxRewardCycle = async (network: Network) => {
  const stacksNetwork =
    network?.toLowerCase() === "testnet" ? STACKS_TESTNET : STACKS_MAINNET;

  const address = "ST3XKKN4RPV69NN1PHFDNX3TYKXT7XPC4N8KC1ARH";

  const stackingClient = new StackingClient({
    address,
    network: stacksNetwork,
  });

  return (await stackingClient.getPoxInfo()).reward_cycle_id;
};

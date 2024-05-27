import { StacksTestnet, StacksMainnet } from "@stacks/network";
import { StackingClient } from "@stacks/stacking";

// for mainnet: const network = new StacksMainnet();
const network = process.env.NEXT_PUBLIC_NETWORK;
const stacksNetwork =
  network?.toLowerCase() === "testnet"
    ? new StacksTestnet()
    : new StacksMainnet();
// the stacks STX address
const address = "ST3XKKN4RPV69NN1PHFDNX3TYKXT7XPC4N8KC1ARH";
export const stackingClient = new StackingClient(address, stacksNetwork);

export const getPoxRewardCycle = async () => {
  console.log(network);
  return (await stackingClient.getPoxInfo()).reward_cycle_id;
};

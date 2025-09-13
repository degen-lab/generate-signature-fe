"use client";

import React, { useEffect, useState } from "react";
import { connect, disconnect, isConnected } from "@stacks/connect";

async function authenticate() {
  try {
    await connect({
      walletConnectProjectId: process.env.NEXT_PUBLIC_WALLET_CONNECT_PROJECT_ID,
      approvedProviderIds: [
        "LeatherProvider",
        "XverseProviders.BitcoinProvider",
        "FordefiProviders.UtxoProvider",
        "WalletConnectProvider",
      ],
    });
    window.location.reload();
  } catch (error) {
    console.error("Failed to connect wallet:", error);
  }
}

function disconnectWallet() {
  disconnect();
  window.location.href = "/";
}

const ConnectWallet = () => {
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);

  if (mounted && isConnected()) {
    return (
      <>
        <button
          className="Connect text-xs mr-2 rounded-xl  border-1 border-default-foreground px-3 md:text-medium"
          onClick={disconnectWallet}
          style={{}}
        >
          Disconnect Wallet
        </button>
      </>
    );
  }

  return (
    <button
      className="Connect text-xs mr-2 rounded-xl border-1 border-default-foreground px-3 md:text-medium"
      onClick={authenticate}
      style={{}}
    >
      Connect Wallet
    </button>
  );
};

export default ConnectWallet;

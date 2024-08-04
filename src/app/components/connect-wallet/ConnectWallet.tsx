"use client";

import React, { useEffect, useState } from "react";
import { AppConfig, showConnect, UserSession } from "@stacks/connect";

const appConfig = new AppConfig(["store_write", "publish_data"]);

export const userSession = new UserSession({ appConfig });

function authenticate() {
  showConnect({
    appDetails: {
      name: "Degenlab Stacks Signer",
      icon: window.location.origin + "/stacks-logo.png",
    },
    redirectTo: "/",
    onFinish: () => {
      window.location.reload();
    },
    userSession,
  });
}

function disconnect() {
  userSession.signUserOut("/");
}

const ConnectWallet = () => {
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);

  if (mounted && userSession.isUserSignedIn()) {
    return (
      <>
        <button
          className="Connect text-sm rounded-xl  border-1 border-default-foreground px-3"
          onClick={disconnect}
          style={{}}
        >
          Disconnect Wallet
        </button>
      </>
    );
  }

  return (
    <button
      className="Connect text-sm rounded-xl border-1 border-default-foreground px-3"
      onClick={authenticate}
      style={{}}
    >
      Connect Wallet
    </button>
  );
};

export default ConnectWallet;

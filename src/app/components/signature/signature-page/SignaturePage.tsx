"use client";

import { useEffect, useState } from "react";
import { SigForm } from "../signature-form/SigForm";
import { SignatureResponse } from "../signature-response/SignatureResponse";
import { getPoxRewardCycle } from "@/app/utils/stacks";
import { Pox4SignatureTopic } from "@stacks/stacking";
import { useNetwork } from "@/app/contexts/NetworkContext";

export type SigResponse = {
  signerSignature: string;
  signerKey: string;
  maxAmount: string;
  authId: string;
  rewardCycle: number;
  period: number;
  method: Pox4SignatureTopic;
  poxAddress: string;
};

export const SignaturePage = () => {
  const { network } = useNetwork();
  const [copyConfirmation, setCopyConfirmation] = useState("");
  const [sigResponse, setSigResponse] = useState<SigResponse | undefined>(
    undefined
  );
  const [hasSigResponse, setHasSigResponse] = useState<boolean>(false);
  const [curRewCycle, setCurRewCycle] = useState<number | undefined>(undefined);

  useEffect(() => {
    const getCurrentCycle = async () => {
      try {
        const cycle = await getPoxRewardCycle(network);
        setCurRewCycle(cycle);
      } catch (error) {
        console.error("Error fetching current cycle:", error);
      }
    };

    getCurrentCycle();

    const intervalId = setInterval(() => {
      getCurrentCycle();
    }, 60000);

    return () => clearInterval(intervalId);
  }, [network]);

  return (
    <div className="flex flex-col md:flex-row w-full md:justify-between text-[#141416]">
      <div
        className="fixed text-center w-full bg-transparent text-black dark:text-white"
        style={{ zIndex: "100" }}
      >
        {copyConfirmation}
      </div>
      <SigForm
        curRewCycle={curRewCycle}
        hasSigResponse={hasSigResponse}
        setSigResponse={setSigResponse}
        setHasSigResponse={setHasSigResponse}
      />
      <SignatureResponse
        curRewCycle={curRewCycle}
        hasSigResponse={hasSigResponse}
        signerSignature={
          hasSigResponse ? sigResponse?.signerSignature ?? "" : ""
        }
        signerKey={hasSigResponse ? sigResponse?.signerKey ?? "" : ""}
        maxAmount={hasSigResponse ? sigResponse?.maxAmount ?? "" : ""}
        authId={hasSigResponse ? sigResponse?.authId ?? "" : ""}
        setCopyConfirmation={setCopyConfirmation}
        rewardCycle={hasSigResponse ? sigResponse?.rewardCycle ?? 0 : 0}
        period={hasSigResponse ? sigResponse?.period ?? 0 : 0}
        method={sigResponse?.method as Pox4SignatureTopic}
        poxAddress={sigResponse?.poxAddress ?? ""}
      ></SignatureResponse>
    </div>
  );
};

"use client";

import { useEffect, useState } from "react";
import { SigForm } from "../signature-form/SigForm";
import { SignatureResponse } from "../signature-response/SignatureResponse";
import { getPoxRewardCycle } from "@/app/utils/stacks";

export type SigResponse = {
  signature: string;
  signerPublicKey: string;
  maxAmount: number;
  authId: number;
};

export const SignaturePage = () => {
  const [copyConfirmation, setCopyConfirmation] = useState("");
  const [sigResponse, setSigResponse] = useState<SigResponse | undefined>(
    undefined
  );
  const [hasSigResponse, setHasSigResponse] = useState<boolean>(false);
  const [curRewCycle, setCurRewCycle] = useState<number | undefined>(undefined);

  useEffect(() => {
    const getCurrentCycle = async () => {
      try {
        const cycle = await getPoxRewardCycle();
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
  }, []);

  return (
    <div className="flex flex-col md:flex-row overflow-y-scroll w-full md:justify-between text-white">
      <div className="fixed text-center w-full" style={{ zIndex: "100" }}>
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
        signature={hasSigResponse ? sigResponse?.signature ?? "" : ""}
        publicKey={hasSigResponse ? sigResponse?.signerPublicKey ?? "" : ""}
        maxAmount={hasSigResponse ? sigResponse?.maxAmount ?? 0 : 0}
        authId={hasSigResponse ? sigResponse?.authId ?? 0 : 0}
        setCopyConfirmation={setCopyConfirmation}
      ></SignatureResponse>
    </div>
  );
};

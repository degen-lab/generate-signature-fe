"use client";

import { useState } from "react";
import { SigForm } from "../signature-form/SigForm";
import { SignatureResponse } from "../signature-response/SignatureResponse";

export type SigResponse = {
  signature: string;
  signerPublicKey: string;
  maxAmount: number;
  authId: number;
};

export const SignaturePage = () => {
  const [sigResponse, setSigResponse] = useState<SigResponse | undefined>(
    undefined
  );
  const [hasSigResponse, setHasSigResponse] = useState<boolean>(false);

  return (
    <div className="flex flex-col md:flex-row overflow-y-scroll w-full md:justify-between text-white">
      <SigForm
        hasSigResponse={hasSigResponse}
        setSigResponse={setSigResponse}
        setHasSigResponse={setHasSigResponse}
      />
      <SignatureResponse
        hasSigResponse={hasSigResponse}
        signature={hasSigResponse ? sigResponse?.signature ?? "" : ""}
        publicKey={hasSigResponse ? sigResponse?.signerPublicKey ?? "" : ""}
        maxAmount={hasSigResponse ? sigResponse?.maxAmount ?? 0 : 0}
        authId={hasSigResponse ? sigResponse?.authId ?? 0 : 0}
      ></SignatureResponse>
    </div>
  );
};

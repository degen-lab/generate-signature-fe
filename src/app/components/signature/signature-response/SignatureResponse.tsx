"use client";
import {
  Button,
  Card,
  CardBody,
  CardHeader,
  Input,
  Textarea,
} from "@nextui-org/react";
import React from "react";
import ContentCopyIcon from "@mui/icons-material/ContentCopy";
import { Pox4SignatureTopic } from "@stacks/stacking";

export interface SignatureResponse {
  curRewCycle: number | undefined;
  hasSigResponse: boolean;
  signerSignature: string;
  signerKey: string;
  maxAmount: string;
  authId: string;
  rewardCycle: number;
  period: number;
  method: Pox4SignatureTopic | undefined;
  poxAddress: string;
  setCopyConfirmation: (value: string) => void;
}
export const SignatureResponse = ({
  curRewCycle,
  signerSignature,
  signerKey,
  maxAmount,
  authId,
  rewardCycle,
  period,
  method,
  poxAddress,
  setCopyConfirmation,
}: SignatureResponse) => {
  const handleCopy = (text: string, content: string) => {
    navigator.clipboard.writeText(text).then(() => {
      setCopyConfirmation(`Copied ${content} to clipboard!`);
      setTimeout(() => setCopyConfirmation(""), 2000);
    });
  };

  return (
    <>
      {curRewCycle && (
        <div className="xs:w-1/1 sm:w-1/10 md:w-1/3 lg:w-1/3">
          <Card className="ml-10 mr-10 mt-10 mb-2 text-left">
            <CardHeader className="flex text-center justify-center">
              <div className="font-bold text-3xl p-2">Signature</div>
            </CardHeader>
            <CardBody>
              <div className="p-4">
                <div className="text-left">
                  <div className="font-bold text-lg mb-2">Signer Signature</div>
                  <div className="relative mb-2">
                    <Textarea
                      isReadOnly
                      id="signature"
                      value={signerSignature}
                    />
                    <ContentCopyIcon
                      className="absolute right-0 bottom-0 mb-3 mr-1 p-1 bg-transparent"
                      data-tip="Copy"
                      onClick={() => handleCopy(signerSignature, "signature")}
                      cursor="pointer"
                    ></ContentCopyIcon>
                  </div>
                  <div className="font-bold text-lg mb-2">
                    Signer Public Key
                  </div>
                  <div className="relative mb-2">
                    <Textarea isReadOnly id="public-key" value={signerKey} />
                    <ContentCopyIcon
                      className="absolute right-0 bottom-0 mb-3 mr-1 p-1 bg-transparent"
                      data-tip="Copy"
                      onClick={() => handleCopy(signerKey, "public key")}
                      cursor="pointer"
                    ></ContentCopyIcon>
                  </div>
                  <div className="font-bold text-lg mb-2">Max Amount</div>
                  <div className="relative mb-2">
                    <Input isReadOnly value={maxAmount.toString()} />
                    <ContentCopyIcon
                      className="absolute right-0 bottom-0 mb-1 mr-1 p-1 bg-transparent"
                      data-tip="Copy"
                      onClick={() =>
                        handleCopy(maxAmount.toString(), "max amount")
                      }
                      cursor="pointer"
                    ></ContentCopyIcon>
                  </div>
                  <div className="font-bold text-lg mb-2">Reward Cycle</div>
                  <div className="relative mb-2">
                    <Input isReadOnly value={rewardCycle.toString()} />
                    <ContentCopyIcon
                      className="absolute right-0 bottom-0 mb-1 mr-1 p-1 bg-transparent"
                      data-tip="Copy"
                      onClick={() =>
                        handleCopy(rewardCycle.toString(), "reward cycle")
                      }
                      cursor="pointer"
                    ></ContentCopyIcon>
                  </div>
                  <div className="font-bold text-lg mb-2">Period</div>
                  <div className="relative mb-2">
                    <Input isReadOnly value={period.toString()} />
                    <ContentCopyIcon
                      className="absolute right-0 bottom-0 mb-1 mr-1 p-1 bg-transparent"
                      data-tip="Copy"
                      onClick={() => handleCopy(period.toString(), "period")}
                      cursor="pointer"
                    ></ContentCopyIcon>
                  </div>
                  <div className="font-bold text-lg mb-2">Method</div>
                  <div className="relative mb-2">
                    <Input isReadOnly value={method?.toString()} />
                    <ContentCopyIcon
                      className="absolute right-0 bottom-0 mb-1 mr-1 p-1 bg-transparent"
                      data-tip="Copy"
                      onClick={() =>
                        handleCopy(method ? method.toString() : "", "method")
                      }
                      cursor="pointer"
                    ></ContentCopyIcon>
                  </div>
                  <div className="font-bold text-lg mb-2">PoX Address</div>
                  <div className="relative mb-2">
                    <Input isReadOnly value={poxAddress.toString()} />
                    <ContentCopyIcon
                      className="absolute right-0 bottom-0 mb-1 mr-1 p-1 bg-transparent"
                      data-tip="Copy"
                      onClick={() =>
                        handleCopy(poxAddress.toString(), "PoX address")
                      }
                      cursor="pointer"
                    ></ContentCopyIcon>
                  </div>
                  <div className="font-bold text-lg mb-2">Auth ID</div>
                  <div className="relative mb-2">
                    <Input isReadOnly value={authId.toString()} />
                    <ContentCopyIcon
                      className="absolute right-0 bottom-0 mb-1 mr-1 p-1 bg-transparent"
                      data-tip="Copy"
                      onClick={() => handleCopy(authId.toString(), "auth ID")}
                      cursor="pointer"
                    ></ContentCopyIcon>
                  </div>
                </div>
              </div>
            </CardBody>

            <div className="text-center justify-center mb-4">
              <div className="flex flex-row justify-center gap-10">
                <Button
                  className="rounded-md"
                  style={{
                    backgroundColor: "#FA5512",
                    color: "white",

                    maxWidth: "40%",
                    padding: "1.5%",
                  }}
                  disabled={signerSignature === ""}
                  onClick={() =>
                    handleCopy(
                      JSON.stringify({
                        signerSignature,
                        signerKey,
                        maxAmount,
                        rewardCycle,
                        period,
                        method,
                        authId,
                        poxAddress,
                      }),
                      "JSON"
                    )
                  }
                >
                  Copy JSON
                </Button>
              </div>
            </div>
          </Card>
        </div>
      )}
    </>
  );
};

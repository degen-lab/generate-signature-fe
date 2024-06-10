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

export interface SignatureResponse {
  curRewCycle: number | undefined;
  hasSigResponse: boolean;
  signature: string;
  publicKey: string;
  maxAmount: number;
  authId: number;
  setCopyConfirmation: (value: string) => void;
}
export const SignatureResponse = ({
  curRewCycle,
  signature,
  publicKey,
  maxAmount,
  authId,
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
                  <div className="font-bold text-lg mb-4">Signer Signature</div>
                  <div className="relative mb-4">
                    <Textarea isReadOnly id="signature" value={signature} />
                    <ContentCopyIcon
                      className="absolute right-0 bottom-0 mb-3 mr-1 p-1 bg-black "
                      data-tip="Copy"
                      onClick={() => handleCopy(signature, "signature")}
                      cursor="pointer"
                    ></ContentCopyIcon>
                  </div>
                  <div className="font-bold text-lg mb-4">
                    Signer Public Key
                  </div>
                  <div className="relative mb-4">
                    <Textarea isReadOnly id="public-key" value={publicKey} />
                    <ContentCopyIcon
                      className="absolute right-0 bottom-0 mb-3 mr-1 p-1 bg-black "
                      data-tip="Copy"
                      onClick={() => handleCopy(publicKey, "public key")}
                      cursor="pointer"
                    ></ContentCopyIcon>
                  </div>
                  <div className="font-bold text-lg mb-4">Max Amount</div>
                  <div className="relative mb-4">
                    <Input isReadOnly value={maxAmount.toString()} />
                    <ContentCopyIcon
                      className="absolute right-0 bottom-0 mb-1 mr-1 p-1 bg-black"
                      data-tip="Copy"
                      onClick={() =>
                        handleCopy(maxAmount.toString(), "max amount")
                      }
                      cursor="pointer"
                    ></ContentCopyIcon>
                  </div>
                  <div className="font-bold text-lg mb-4">Auth ID</div>
                  <div className="relative mb-4">
                    <Input isReadOnly value={authId.toString()} />
                    <ContentCopyIcon
                      className="absolute right-0 bottom-0 mb-1 mr-1 p-1 bg-black"
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
                    backgroundColor: "black",
                    color: "white",
                    border: "1px solid white",
                    maxWidth: "40%",
                    padding: "1%",
                  }}
                  disabled={signature === ""}
                  onClick={() =>
                    handleCopy(
                      JSON.stringify({
                        signature,
                        publicKey,
                        maxAmount,
                        authId,
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

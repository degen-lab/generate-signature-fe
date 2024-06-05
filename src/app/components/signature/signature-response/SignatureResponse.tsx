"use client";
import {
  Card,
  CardBody,
  CardHeader,
  Divider,
  Input,
  Textarea,
} from "@nextui-org/react";
import React from "react";
import ContentCopyIcon from "@mui/icons-material/ContentCopy";

export interface SignatureResponse {
  hasSigResponse: boolean;
  signature: string;
  publicKey: string;
  maxAmount: number;
  authId: number;
}
export const SignatureResponse = ({
  signature,
  publicKey,
  maxAmount,
  authId,
}: SignatureResponse) => {
  const handleCopy = (text: string) => {
    navigator.clipboard.writeText(text);
  };

  return (
    <div className="xs:w-1/1 sm:w-1/10 md:w-1/3 lg:w-1/3">
      <Card className="ml-10 mr-10 mt-10 mb-2 text-left">
        <CardHeader className="flex text-center justify-center">
          <div className="font-bold text-3xl p-2">Signature</div>
        </CardHeader>
        <Divider />
        <CardBody>
          <div className="p-4">
            <div className="text-left">
              <div className="font-bold">Signer Signature</div>
              <div className="relative mb-4">
                <Textarea isReadOnly id="signature" value={signature} />
                <ContentCopyIcon
                  className="absolute right-0 bottom-0 mb-4 mr-2 p-1 bg-black border rounded"
                  data-tip="Copy"
                  onClick={() => handleCopy(signature)}
                  cursor="pointer"
                ></ContentCopyIcon>
              </div>
              <div className="font-bold">Signer Public Key</div>
              <div className="relative mb-4">
                <Textarea isReadOnly id="public-key" value={publicKey} />
                <ContentCopyIcon
                  className="absolute right-0 bottom-0 mb-4 mr-2 p-1 bg-black border rounded"
                  data-tip="Copy"
                  onClick={() => handleCopy(publicKey)}
                  cursor="pointer"
                ></ContentCopyIcon>
              </div>
              <div className="font-bold">Max Amount</div>
              <div className="relative mb-4">
                <Input isReadOnly value={maxAmount.toString()} />
                <ContentCopyIcon
                  className="absolute right-0 bottom-0 mb-2 mr-2 p-1 bg-black border rounded"
                  data-tip="Copy"
                  onClick={() => handleCopy(maxAmount.toString())}
                  cursor="pointer"
                ></ContentCopyIcon>
              </div>
              <div className="font-bold">Auth ID</div>
              <div className="relative mb-4">
                <Input isReadOnly value={authId.toString()} />
                <ContentCopyIcon
                  className="absolute right-0 bottom-0 mb-2 mr-2 p-1 bg-black border rounded"
                  data-tip="Copy"
                  onClick={() => handleCopy(authId.toString())}
                  cursor="pointer"
                ></ContentCopyIcon>
              </div>
            </div>
          </div>
        </CardBody>

        <div className="text-center justify-center mb-4">
          <div className="flex flex-row justify-center gap-10">
            <div
              onClick={() =>
                handleCopy(
                  JSON.stringify({
                    signature,
                    publicKey,
                    maxAmount,
                    authId,
                  })
                )
              }
            >
              Copy JSON
            </div>
          </div>
        </div>
      </Card>
    </div>
  );
};

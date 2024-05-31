"use client";
import {
  Divider,
  Input,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  Textarea,
} from "@nextui-org/react";
import React from "react";
import ContentCopyIcon from "@mui/icons-material/ContentCopy";

export interface SignatureResponse {
  signature: string;
  publicKey: string;
  maxAmount: number;
  authId: number;
  isOpen: boolean;
  setIsOpen: (open: boolean) => void;
}
export const SignatureResponse = ({
  signature,
  publicKey,
  maxAmount,
  authId,
  isOpen,
  setIsOpen,
}: SignatureResponse) => {
  const onClose = () => setIsOpen(false);
  const handleCopy = (text: string) => {
    navigator.clipboard.writeText(text);
  };

  return (
    <>
      <Modal
        isOpen={isOpen}
        onOpenChange={onClose}
        className="w-1/2 h-1/2 absolute top-[25%] left-[25%] flex bg-black bg-opacity-100 border-2 border-white rounded-md overflow-scroll p-2"
        closeButton="hover:bg-white/5 active:bg-white/10"
        classNames={{
          closeButton: "absolute top-2 right-2",
        }}
      >
        <ModalContent>
          <ModalHeader className="flex flex-col text-2xl p-4">
            <div className="font-bold text-3xl p-2">Your Signature</div>
          </ModalHeader>
          <Divider />
          <ModalBody className="p-4">
            <div className="text-left">
              <div>Signature</div>
              <br />
              <div className="relative mb-4">
                <Textarea isReadOnly id="signature" value={signature} />
                <ContentCopyIcon
                  className="absolute right-0 bottom-0 mb-4 mr-2 p-1 bg-black border rounded"
                  data-tip="Copy"
                  onClick={() => handleCopy(signature)}
                  cursor="pointer"
                ></ContentCopyIcon>
              </div>
              <br />
              <div>Signer Public Key</div>
              <br />
              <div className="relative mb-4">
                <Textarea isReadOnly id="public-key" value={publicKey} />
                <ContentCopyIcon
                  className="absolute right-0 bottom-0 mb-4 mr-2 p-1 bg-black border rounded"
                  data-tip="Copy"
                  onClick={() => handleCopy(publicKey)}
                  cursor="pointer"
                ></ContentCopyIcon>
              </div>
              <br />
              <div>Max Amount</div>
              <br />
              <div className="relative mb-4">
                <Input isReadOnly value={maxAmount.toString()} />
                <ContentCopyIcon
                  className="absolute right-0 bottom-0 mb-2 mr-2 p-1 bg-black border rounded"
                  data-tip="Copy"
                  onClick={() => handleCopy(maxAmount.toString())}
                  cursor="pointer"
                ></ContentCopyIcon>
              </div>
              <br />
              <div>Auth ID</div>
              <br />
              <div className="relative mb-4">
                <Input isReadOnly value={authId.toString()} />
                <ContentCopyIcon
                  className="absolute right-0 bottom-0 mb-2 mr-2 p-1 bg-black border rounded"
                  data-tip="Copy"
                  onClick={() => handleCopy(authId.toString())}
                  cursor="pointer"
                ></ContentCopyIcon>
              </div>
              <br />
            </div>
          </ModalBody>
          <ModalFooter className="text-center justify-center mb-4">
            <div className="flex flex-row justify-center gap-10">
              <div>Copy JSON</div>
              <div>Copy Other</div>
            </div>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};

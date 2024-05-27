"use client";
import { GetSignatureBtn } from "./GetSignatureBtn";

export const Landing = () => {
  return (
    <>
      <h1 className="text-3xl mb-10">Degen Lab Ӿ Signer</h1>
      <div className="mb-5">
        <GetSignatureBtn />
      </div>
      {/* <Link href="https://x.com/DegenLabBTC">Follow us on Twitter</Link> */}
    </>
  );
};

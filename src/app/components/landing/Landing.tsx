"use client";
// import Link from "next/link";
import { GetSignatureBtn } from "./GetSignatureBtn";

export const Landing = () => {
  return (
    <>
      <h1 className="text-3xl mb-10">Degen Lab Ӿ Signer</h1>
      <div className="mb-5">
        <div className="mb-10">
          <GetSignatureBtn />
        </div>
        {/* <br />
        <div className="flex flex-row justify-center gap-10">
          <Link href="http://www.degenlab.io" target="new">
            Docs
          </Link>
        </div> */}
      </div>
    </>
  );
};

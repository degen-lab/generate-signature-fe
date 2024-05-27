import { Background } from "../components/background/Background";
import { SigForm } from "../components/signature-form/SigForm";
import { SigInfo } from "../components/signature-info/SigInfo";

export default function Signature() {
  return (
    <>
      <Background />
      {/* <div className="flex flex-row"> */}
      {/* <div className="relative h-[100vh] flex justify-center items-center flex-col">
          <SigInfo />
        </div> */}
      <div className="relative h-[100vh] flex justify-center items-center flex-col">
        <SigForm />
      </div>
      {/* </div> */}
    </>
  );
}

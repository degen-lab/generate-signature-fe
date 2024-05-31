import { Background } from "../components/background/Background";
import { SigForm } from "../components/signature-form/SigForm";
import { SigInfo } from "../components/signature-info/SigInfo";

export default function Signature() {
  return (
    <>
      <Background />
      <div className="flex justify-center items-center flex-col overflow-y-scroll w-full">
        <SigForm />
      </div>
    </>
  );
}

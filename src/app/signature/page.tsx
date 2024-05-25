import { Background } from "../components/background/Background";
import { SigForm } from "../components/signature-form/SigForm";

export default function Signature() {
  return (
    <>
      <Background />
      <div className="relative h-[100vh] flex justify-center items-center flex-col">
        <SigForm />
      </div>
    </>
  );
}

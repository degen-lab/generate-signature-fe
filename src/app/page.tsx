import { Background } from "./components/background/Background";
import { SignaturePage } from "./components/signature/signature-page/SignaturePage";

export default function Home() {
  return (
    <>
      <Background />
      <div className="relative h-[100vh] flex justify-center items-center flex-col">
        <SignaturePage />
      </div>
    </>
  );
}

import { Landing } from "./components/landing/Landing";
import { Background } from "./components/background/Background";

export default function Home() {
  return (
    <>
      <Background />
      <div className="relative h-[100vh] flex justify-center items-center flex-col">
        <Landing />
      </div>
    </>
  );
}

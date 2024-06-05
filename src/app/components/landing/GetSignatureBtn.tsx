import { Button } from "@nextui-org/react";
import { useRouter } from "next/navigation";

export const GetSignatureBtn = () => {
  const router = useRouter();
  const onClickButton = () => {
    router.push("/signature");
  };
  return (
    <Button className="rounded-md" onClick={onClickButton}>
      Get Your Stacking Signature
    </Button>
  );
};

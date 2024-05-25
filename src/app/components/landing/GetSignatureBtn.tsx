import { Button } from "@nextui-org/react";
import { useRouter } from "next/navigation";

export const GetSignatureBtn = () => {
  const router = useRouter();
  const onClickButton = () => {
    router.push("/signature");
  };
  return (
    <>
      <Button color="success" onClick={onClickButton}>
        Get Your Stacking Signature
      </Button>
    </>
  );
};

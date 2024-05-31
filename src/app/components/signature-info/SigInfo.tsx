"use client";
import { getPoxRewardCycle } from "@/app/utils/stacks";
import { Card, CardBody, CardHeader, Divider } from "@nextui-org/react";
import { useEffect, useState } from "react";

export const SigInfo = () => {
  const [curRewCycle, setCurRewCycle] = useState<number | undefined>(undefined);
  useEffect(() => {
    const getCurrentCycle = async () => {
      setCurRewCycle(await getPoxRewardCycle());
    };
    getCurrentCycle();
  });
  return (
    <>
      {curRewCycle && (
        <div>
          <div className="flex min-h-screen flex-row justify-between items-center">
            <div className="flex flex-col flex-grow bg-black opacity-75 text-center">
              <Card className="m-10 mb-40 text-left">
                <CardHeader className="flex">
                  <div className="font-bold text-4xl p-4">PoX Info</div>
                </CardHeader>
                <CardBody className="flex flex-col p-6">
                  <CardHeader>
                    <div className="font-bold text-xl p-4">
                      Current PoX Reward Cycle: {curRewCycle}
                    </div>
                  </CardHeader>
                  <CardHeader>
                    <div className="font-bold text-xl p-4">
                      Current Burn Height: {curRewCycle}
                    </div>
                  </CardHeader>
                  <CardHeader>
                    <div className="font-bold text-xl p-4">
                      Current PoX Reward Cycle: {curRewCycle}
                    </div>
                  </CardHeader>
                  <CardHeader>
                    <div className="font-bold text-xl p-4">
                      Current PoX Reward Cycle: {curRewCycle}
                    </div>
                  </CardHeader>
                  <CardHeader>
                    <div className="font-bold text-xl p-4">
                      Current PoX Reward Cycle: {curRewCycle}
                    </div>
                  </CardHeader>
                  <CardHeader>
                    <div className="font-bold text-xl p-4">
                      Current PoX Reward Cycle: {curRewCycle}
                    </div>
                  </CardHeader>
                  <CardHeader>
                    <div className="font-bold text-xl p-4">
                      Current PoX Reward Cycle: {curRewCycle}
                    </div>
                  </CardHeader>
                  <CardHeader>
                    <div className="font-bold text-xl p-4">
                      Current PoX Reward Cycle: {curRewCycle}
                    </div>
                  </CardHeader>
                  <CardHeader>
                    <div className="font-bold text-xl p-4">
                      Current PoX Reward Cycle: {curRewCycle}
                    </div>
                  </CardHeader>
                  <CardHeader>
                    <div className="font-bold text-xl p-4">
                      Current PoX Reward Cycle: {curRewCycle}
                    </div>
                  </CardHeader>
                </CardBody>
              </Card>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

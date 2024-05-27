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
                {/* <Divider /> */}
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
                  {/* <Formik
                initialValues={{
                  rewardCycle: curRewCycle,
                  poxAddress: undefined,
                  maxAmount: undefined,
                  period: undefined,
                  topic: "stack-stx",
                }}
                validationSchema={SigReqValidationSchema}
                enableReinitialize={true}
                onSubmit={handleAddData}
              >
                {({ values, errors, touched }) => (
                  <Form className="flex flex-col mb-4">
                    <label htmlFor="topic">Topic</label>
                    <Field
                      as="select"
                      className="mb-5"
                      name="topic"
                      isRequired
                      errorMessage={touched.topic && errors.topic}
                      isInvalid={errors.topic}
                    >
                      {TopicOptions.map((option: Topic) => (
                        <option key={option} value={option}>
                          {TopicMapping[option]}
                        </option>
                      ))}
                    </Field>
                    <label htmlFor="rewardCycle">Reward Cycle</label>
                    <Field
                      as={Input}
                      className="mb-5 w-full"
                      name="rewardCycle"
                      type="number"
                      isRequired
                      defaultValue={
                        values.topic === "StackStx" ? curRewCycle : ""
                      }
                      errorMessage={touched.rewardCycle && errors.rewardCycle}
                      isInvalid={errors.rewardCycle}
                    />
                    <label htmlFor="poxAddress">PoX Address</label>
                    <Field
                      as={Input}
                      className="mb-5 w-full"
                      name="poxAddress"
                      type="text"
                      isRequired
                      errorMessage={touched.poxAddress && errors.poxAddress}
                      isInvalid={errors.poxAddress}
                    />
                    <label htmlFor="maxAmount">
                      Maximum amount to authorize
                    </label>
                    <Field
                      as={Input}
                      className="mb-5 w-full"
                      name="maxAmount"
                      type="text"
                      isRequired
                      errorMessage={touched.maxAmount && errors.maxAmount}
                      isInvalid={errors.maxAmount}
                    />
                    <label htmlFor="period">Period</label>
                    <Field
                      as={Input}
                      className="mb-5 w-full"
                      name="period"
                      type="number"
                      isRequired
                      errorMessage={touched.period && errors.period}
                      isInvalid={errors.period}
                    />
                    <Button color="success" variant="ghost" type="submit">
                      Get Signature
                    </Button>
                    <br />
                    <div className="flex flex-row justify-center gap-10">
                      <Link href="http://www.degenlab.io" target="new">
                        How to
                      </Link>
                      <Link href="http://www.degenlab.io" target="new">
                        FAQ
                      </Link>
                      <Link href="http://www.degenlab.io" target="new">
                        Help
                      </Link>
                      <Link href="/">Home</Link>
                    </div>
                  </Form>
                )}
              </Formik> */}
                </CardBody>
              </Card>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

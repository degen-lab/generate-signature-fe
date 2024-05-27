"use client";
import { Topic } from "@/app/types/types";
import { getPoxRewardCycle, stackingClient } from "@/app/utils/stacks";
import { testRewardCycle, TopicMapping, TopicOptions } from "@/app/utils/utils";
import {
  Button,
  Card,
  CardBody,
  CardHeader,
  Divider,
  Input,
  Link,
} from "@nextui-org/react";
import axios from "axios";
import validate from "bitcoin-address-validation";
import { Field, Form, Formik } from "formik";
import { useEffect, useState } from "react";
import * as Yup from "yup";

const SigReqValidationSchema = (currentRewardCycle: number) =>
  Yup.object<InitialValues>().shape({
    rewardCycle: Yup.number().test("rew-cycle-test", function (value) {
      const { topic } = this.parent;

      // Test the reward cycle validity based on the selected topic.
      // If the reward cycle is not valid, return an error message.
      const [valid, message] = testRewardCycle(
        topic,
        currentRewardCycle,
        value
      );
      return valid || this.createError({ message });
    }),
    poxAddress: Yup.string()
      .required("Please add the PoX address.")
      .test("validate-btc", "Not a valid BTC address.", (btcAddress) =>
        validate(btcAddress)
      ),
    maxAmount: Yup.string().required("Please specify the maximum amount."),
    period: Yup.number().required("Please specify the period."),
    topic: Yup.string().required("Please select the signature topic."),
  });

interface InitialValues {
  rewardCycle: number | undefined;
  poxAddress: string | undefined;
  maxAmount: string | undefined;
  period: number | undefined;
  topic: string | undefined;
}
export const SigForm = () => {
  const [curRewCycle, setCurRewCycle] = useState<number | undefined>(undefined);

  useEffect(() => {
    const getCurrentCycle = async () => {
      console.log(await getPoxRewardCycle());
      setCurRewCycle(await getPoxRewardCycle());
    };
    getCurrentCycle();
  });
  const handleAddData = async (values: InitialValues) => {
    console.log("values:::", values);
    try {
      await axios.post("http://localhost:8080/get-signature", values);
    } catch (e) {
      console.error(e);
    }
  };
  return (
    <>
      {curRewCycle && (
        <div>
          <div className="flex min-h-screen flex-row justify-between items-center">
            <div className="flex flex-col flex-grow bg-black opacity-75 text-center">
              <Card className="m-10 mb-40 text-left">
                <CardHeader className="flex">
                  <div className="font-bold text-4xl p-4">
                    Get Your Stacking Signature
                  </div>
                </CardHeader>
                <Divider />
                <CardBody className="flex flex-col p-6">
                  <Formik
                    initialValues={{
                      rewardCycle: curRewCycle,
                      poxAddress: undefined,
                      maxAmount: undefined,
                      period: undefined,
                      topic: "stack-stx",
                    }}
                    validationSchema={SigReqValidationSchema(curRewCycle)}
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
                            <option key={option} value={TopicMapping[option]}>
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
                          errorMessage={
                            touched.rewardCycle && errors.rewardCycle
                          }
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
                  </Formik>
                </CardBody>
              </Card>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

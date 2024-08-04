"use client";
import { Network, Topic } from "@/app/types/types";
import { getPoxRewardCycle } from "@/app/utils/stacks";
import {
  getPeriodPlaceholder,
  getRewardCyclePlaceholder,
  testPeriod,
  testRewardCycle,
  PeriodInfoMessages,
  TopicMapping,
  TopicOptions,
  RewCycleInfoMessages,
  isValidInteger,
  MaxAmountInfoMessages,
  isMaxAmountWithinMaxAllowed,
} from "@/app/utils/utils";
import {
  Button,
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  Divider,
  Input,
} from "@nextui-org/react";
import axios from "axios";
import validate from "bitcoin-address-validation";
import { Field, Form, Formik } from "formik";
import * as Yup from "yup";
import { SigResponse } from "../signature-page/SignaturePage";
import { userSession } from "../../connect-wallet/ConnectWallet";
import { MAX_ALLOWED_STX_AMOUNT } from "@/app/utils/constants";
import CustomErrorMessage from "../CustomErrorMessage";
import { useNetwork } from "@/app/contexts/NetworkContext";
import { useTheme } from "next-themes";

const SigReqValidationSchema = (network: Network) =>
  Yup.object<InitialValues>().shape({
    rewardCycle: Yup.number().test("rew-cycle-test", async function (value) {
      const { topic } = this.parent;
      const [valid, message] = testRewardCycle(
        topic,
        await getPoxRewardCycle(network),
        value
      );
      return valid || this.createError({ message });
    }),
    poxAddress: Yup.string()
      .required("Please add the PoX address.")
      .test("validate-btc", "Not a valid BTC address.", (btcAddress) =>
        validate(btcAddress)
      ),
    maxAmount: Yup.string()
      .required("Please specify the maximum STX amount.")
      .test("is-valid-number", "Invalid number", (value) => {
        return isValidInteger(value);
      })
      .test(
        "max-amount-test",
        `Max allowed STX amount is ${MAX_ALLOWED_STX_AMOUNT}`,
        (value) => {
          return isMaxAmountWithinMaxAllowed(value);
        }
      ),
    period: Yup.number()
      .required("Please specify the period.")
      .max(12, "The maximum period for stacking operations is 12.")
      .test("period-test", function (value) {
        const { topic } = this.parent;
        const [valid, message] = testPeriod(topic, value);
        return valid || this.createError({ message });
      }),
    topic: Yup.string().required("Please select the signature topic."),
  });

interface InitialValues {
  rewardCycle: number | undefined;
  poxAddress: string | undefined;
  maxAmount: string | undefined;
  period: number | undefined;
  topic: string | undefined;
  network: "mainnet" | "testnet" | "nakamoto-testnet";
}

interface SigFormProps {
  hasSigResponse: boolean;
  curRewCycle: number | undefined;
  setSigResponse: React.Dispatch<React.SetStateAction<SigResponse | undefined>>;
  setHasSigResponse: React.Dispatch<React.SetStateAction<boolean>>;
}

export const SigForm = ({
  hasSigResponse,
  curRewCycle,
  setHasSigResponse,
  setSigResponse,
}: SigFormProps) => {
  const { network } = useNetwork();
  const handleAddData = async (values: InitialValues) => {
    try {
      const sigResponse = await axios
        .post("https://signature-be.degenlab.io/get-signature", values)
        .then((res) => res.data);
      console.log(sigResponse);
      setHasSigResponse(true);
      setSigResponse(sigResponse);
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <>
      {curRewCycle && (
        <div className="xs:w-1/1 sm:w-9/10 md:w-2/3 lg:w-2/3">
          <div className="flex flex-row justify-between items-center">
            <div className="flex flex-col flex-grow text-center">
              <Card className="ml-10 mr-10 mt-10 mb-2 text-left">
                <CardHeader className="flex text-center justify-center">
                  <div className="font-bold text-3xl p-2">
                    Get Your Ӿ Stacking Signature
                  </div>
                </CardHeader>
                <Divider />
                <CardBody className="flex flex-col p-6">
                  <Formik
                    initialValues={{
                      rewardCycle: undefined,
                      poxAddress: userSession.isUserSignedIn()
                        ? userSession.loadUserData().profile.btcAddress.p2wpkh[
                            network ?? "testnet"
                          ]
                        : undefined,
                      maxAmount: undefined,
                      period: undefined,
                      topic: "stack-stx",
                      network: network,
                    }}
                    validationSchema={() => SigReqValidationSchema(network)}
                    enableReinitialize={true}
                    onSubmit={handleAddData}
                  >
                    {({ values, errors, touched }) => (
                      <Form className="flex flex-col mb-4">
                        <label
                          htmlFor="topic"
                          className="text-2xl font-bold mb-2"
                        >
                          What will be the topic of your signature?
                        </label>
                        <div className="text-md mb-4 text-neutral-900 dark:text-neutral-300">
                          The topic represents the stacking operation to be
                          authorized. Please pick the operation you want to
                          authorize from the list.
                        </div>
                        <Field
                          as="select"
                          className={`mb-3 bg-default-100 text-default-900 
                          }`}
                          name="topic"
                          isRequired
                          isInvalid={errors.topic}
                        >
                          {TopicOptions.map((option: Topic) => (
                            <option key={option} value={TopicMapping[option]}>
                              {TopicMapping[option]}
                            </option>
                          ))}
                        </Field>
                        {touched.topic && errors.topic && (
                          <CustomErrorMessage message={errors.topic} />
                        )}

                        <label
                          htmlFor="rewardCycle"
                          className="text-2xl font-bold mb-2"
                        >
                          Reward Cycle
                        </label>
                        <div className="text-md mb-4 text-neutral-900 dark:text-neutral-300">
                          Please insert the reward cycle for which the
                          authorization is valid. For {values.topic},
                          {RewCycleInfoMessages[values.topic || ""]}.
                          <div> The current reward cycle is {curRewCycle}.</div>
                        </div>
                        <Field
                          as={Input}
                          className={`mb-3 w-full`}
                          name="rewardCycle"
                          type="number"
                          isRequired
                          placeholder={getRewardCyclePlaceholder(
                            values.topic as Topic,
                            curRewCycle
                          )}
                          isInvalid={errors.rewardCycle}
                        />
                        {touched.rewardCycle && errors.rewardCycle && (
                          <CustomErrorMessage message={errors.rewardCycle} />
                        )}

                        <label
                          htmlFor="poxAddress"
                          className="text-2xl font-bold mb-2"
                        >
                          PoX Address
                        </label>
                        <div className="text-md mb-4 text-neutral-900 dark:text-neutral-300">
                          Please insert the Bitcoin Address you want to
                          authorize for stacking operations.
                        </div>
                        <Field
                          as={Input}
                          className="mb-3 w-full"
                          name="poxAddress"
                          type="text"
                          isRequired
                          isInvalid={errors.poxAddress}
                        />
                        {touched.poxAddress && errors.poxAddress && (
                          <CustomErrorMessage
                            message={errors.poxAddress?.toString()}
                          />
                        )}

                        <label
                          htmlFor="maxAmount"
                          className="text-2xl font-bold mb-2"
                        >
                          Maximum STX amount to authorize
                        </label>
                        <div className="text-md mb-4 text-neutral-900 dark:text-neutral-300">
                          Please insert the maximum amount of STX you want to
                          authorize.{" "}
                          {values.topic === "stack-increase" &&
                            MaxAmountInfoMessages[values.topic]}
                        </div>
                        <Field
                          as={Input}
                          className="mb-3 w-full"
                          name="maxAmount"
                          type="text"
                          isRequired
                          isInvalid={errors.maxAmount}
                        />
                        {touched.maxAmount && errors.maxAmount && (
                          <CustomErrorMessage message={errors.maxAmount} />
                        )}

                        <label
                          htmlFor="period"
                          className="text-2xl font-bold mb-2"
                        >
                          Period
                        </label>
                        <div className="text-md mb-4 text-neutral-900 dark:text-neutral-300">
                          Please insert the number of reward cycles you want to
                          issue the authorization for. For {values.topic},
                          {PeriodInfoMessages[values.topic || ""]}.
                        </div>
                        <Field
                          as={Input}
                          className="mb-3 w-full"
                          name="period"
                          type="number"
                          isRequired
                          placeholder={getPeriodPlaceholder(
                            values.topic as Topic
                          )}
                          isInvalid={errors.period}
                        />
                        {touched.period && errors.period && (
                          <CustomErrorMessage message={errors.period} />
                        )}

                        <CardFooter style={{ justifyContent: "center" }}>
                          <Button
                            type="submit"
                            className="rounded-md"
                            style={{
                              backgroundColor: "#FA5512",
                              color: "white",
                              maxWidth: "40%",
                              padding: "1.5%",
                            }}
                          >
                            {hasSigResponse
                              ? "Regenerate"
                              : "Generate Signature"}
                          </Button>
                        </CardFooter>
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

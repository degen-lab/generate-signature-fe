import { Topic } from "../types/types";

// Util data structures for the signature request form.
export const PeriodInfoMessages: Record<string, string> = {
  "stack-stx":
    " the period refers to the `lock-period` argument in the PoX-4 function",
  "stack-extend":
    " the period refers to the `extend-count` argument in the PoX-4 function",
  "stack-increase":
    " the period should be equal to the PoX-4 stacking state lock period",
  "stack-aggregation-commit": " the period is 1",
  "stack-aggregation-increase": " the period is 1",
};

export const RewCycleInfoMessages: Record<string, string> = {
  "stack-stx":
    " it refers to the reward cycle where the transaction is confirmed",
  "stack-extend":
    " it refers to the reward cycle where the transaction is confirmed",
  "stack-increase":
    " it refers to the reward cycle where the transaction is confirmed",
  "stack-aggregation-commit":
    " this refers to the reward cycle argument in the PoX-4 function",
  "stack-aggregation-increase":
    " this refers to the reward cycle argument in the PoX-4 function",
};

export const TopicOptions: Topic[] = [
  "StackStx",
  "StackExtend",
  "StackIncrease",
  "AggCommit",
  "AggIncrease",
];

export const TopicMapping: Record<Topic, string> = {
  StackStx: "stack-stx",
  StackExtend: "stack-extend",
  StackIncrease: "stack-increase",
  AggCommit: "stack-aggregation-commit",
  AggIncrease: "stack-aggregation-increase",
};

export const SigFormErrorMessages = {
  EmptyRewardCycle: "Please add the reward cycle.",
  PastRewCycle: "Past reward cycles are not permitted.",
  RewCycleGreaterThanCurrent: (currentRewardCycle: number) =>
    `The reward cycle is greater than the current one (${currentRewardCycle}).`,
  AggFutureCycle: "For the selected topic you must insert a future cycle.",
  WrongTopic: "Please select a valid topic.",
  EmptyPeriod: "Please add the period.",
  NegativeOrZeroPeriod:
    "Period should be greater than 0 for the selected topic.",
  PeriodExceedsMaximum: "The maximum period for stacking operations is 12.",
  AggCommitWrongPeriod: (topic: Topic) =>
    `The period for ${topic} signature should be 1.`,
};

// Display helpers

export const getRewardCyclePlaceholder = (
  topic: string,
  currentRewardCycle: number
) =>
  [TopicMapping.AggCommit, TopicMapping.AggIncrease].indexOf(topic) > -1
    ? `${currentRewardCycle + 1}`
    : [TopicMapping.StackStx, TopicMapping.StackExtend].indexOf(topic) > -1
    ? `${currentRewardCycle}`
    : "";

export const getPeriodPlaceholder = (topic: string) =>
  [TopicMapping.AggCommit, TopicMapping.AggIncrease].indexOf(topic) > -1
    ? 1
    : "";
// Data validation for the signature request form.

/**
 * Reward Cycle validator for a given topic.
 * @param topic The topic of the signature request.
 * @param currentRewardCycle The current reward cycle.
 * @param selectedRewardCycle The reward cycle selected by the user.
 */
export const testRewardCycle = (
  topic: Topic,
  currentRewardCycle: number,
  selectedRewardCycle: number | undefined
): [boolean, string] => {
  const topicMapping: Record<
    string,
    (selectedRewardCycle: number) => [boolean, string]
  > = {
    [TopicMapping.StackStx]: (
      selectedRewardCycle: number
    ): [boolean, string] => {
      if (!selectedRewardCycle)
        return [false, SigFormErrorMessages.EmptyRewardCycle];
      if (selectedRewardCycle < currentRewardCycle)
        return [false, SigFormErrorMessages.PastRewCycle];
      if (selectedRewardCycle > currentRewardCycle)
        return [
          false,
          SigFormErrorMessages.RewCycleGreaterThanCurrent(currentRewardCycle),
        ];
      return [true, "OK"];
    },
    [TopicMapping.StackExtend]: (
      selectedRewardCycle: number
    ): [boolean, string] => {
      if (!selectedRewardCycle)
        return [false, SigFormErrorMessages.EmptyRewardCycle];
      if (selectedRewardCycle < currentRewardCycle)
        return [false, SigFormErrorMessages.PastRewCycle];
      if (selectedRewardCycle > currentRewardCycle)
        return [
          false,
          SigFormErrorMessages.RewCycleGreaterThanCurrent(currentRewardCycle),
        ];
      return [true, "OK"];
    },
    [TopicMapping.StackIncrease]: (
      selectedRewardCycle: number
    ): [boolean, string] => {
      if (!selectedRewardCycle)
        return [false, SigFormErrorMessages.EmptyRewardCycle];
      if (selectedRewardCycle < currentRewardCycle)
        return [false, SigFormErrorMessages.PastRewCycle];
      if (selectedRewardCycle > currentRewardCycle)
        return [
          false,
          SigFormErrorMessages.RewCycleGreaterThanCurrent(currentRewardCycle),
        ];
      return [true, "OK"];
    },
    [TopicMapping.AggCommit]: (
      selectedRewardCycle: number
    ): [boolean, string] => {
      if (!selectedRewardCycle)
        return [false, SigFormErrorMessages.EmptyRewardCycle];
      if (selectedRewardCycle <= currentRewardCycle)
        return [false, SigFormErrorMessages.AggFutureCycle];
      return [true, "OK"];
    },
    [TopicMapping.AggIncrease]: (
      selectedRewardCycle: number
    ): [boolean, string] => {
      if (!selectedRewardCycle)
        return [false, SigFormErrorMessages.EmptyRewardCycle];
      if (selectedRewardCycle <= currentRewardCycle)
        return [false, SigFormErrorMessages.AggFutureCycle];
      return [true, "OK"];
    },
  };

  const validate = topicMapping[topic];
  if (validate) {
    if (!selectedRewardCycle)
      return [false, SigFormErrorMessages.EmptyRewardCycle];
    return validate(selectedRewardCycle);
  }

  return [false, SigFormErrorMessages.WrongTopic];
};

/**
 * Period validator for a given topic.
 * @param topic The topic of the signature request.
 * @param selectedPeriod The period selected by the user.
 */
export const testPeriod = (
  topic: Topic,
  selectedPeriod: number | undefined
): [boolean, string] => {
  const topicMapping: Record<
    string,
    (selectedRewardCycle: number) => [boolean, string]
  > = {
    [TopicMapping.StackStx]: (selectedPeriod: number): [boolean, string] => {
      if (selectedPeriod === undefined)
        return [false, SigFormErrorMessages.EmptyPeriod];
      if (selectedPeriod < 1)
        return [false, SigFormErrorMessages.NegativeOrZeroPeriod];
      if (selectedPeriod > 12)
        return [false, SigFormErrorMessages.PeriodExceedsMaximum];
      return [true, "OK"];
    },
    [TopicMapping.StackExtend]: (selectedPeriod: number): [boolean, string] => {
      if (selectedPeriod === undefined)
        return [false, SigFormErrorMessages.EmptyPeriod];
      if (selectedPeriod < 1)
        return [false, SigFormErrorMessages.NegativeOrZeroPeriod];
      if (selectedPeriod > 12)
        return [false, SigFormErrorMessages.PeriodExceedsMaximum];
      return [true, "OK"];
    },
    [TopicMapping.StackIncrease]: (): [boolean, string] => {
      // TODO: Should be equal to current lock period!
      if (selectedPeriod === undefined)
        return [false, SigFormErrorMessages.EmptyPeriod];
      if (selectedPeriod < 1)
        return [false, SigFormErrorMessages.NegativeOrZeroPeriod];
      if (selectedPeriod > 12)
        return [false, SigFormErrorMessages.PeriodExceedsMaximum];
      return [true, "OK"];
    },
    [TopicMapping.AggCommit]: (selectedPeriod: number): [boolean, string] => {
      if (selectedPeriod === undefined)
        return [false, SigFormErrorMessages.EmptyPeriod];
      if (selectedPeriod !== 1)
        return [false, SigFormErrorMessages.AggCommitWrongPeriod(topic)];
      return [true, "OK"];
    },
    [TopicMapping.AggIncrease]: (selectedPeriod: number): [boolean, string] => {
      if (selectedPeriod === undefined)
        return [false, SigFormErrorMessages.EmptyPeriod];
      if (selectedPeriod !== 1)
        return [false, SigFormErrorMessages.AggCommitWrongPeriod(topic)];
      return [true, "OK"];
    },
  };

  const validate = topicMapping[topic];
  if (validate) {
    if (selectedPeriod === undefined)
      return [false, SigFormErrorMessages.EmptyPeriod];
    return validate(selectedPeriod);
  }

  return [false, SigFormErrorMessages.WrongTopic];
};

export const isValidInteger = (str: string) => {
  const regex = /^(0|[1-9]\d*)$/;
  return regex.test(str);
};

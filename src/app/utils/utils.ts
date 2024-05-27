import { Topic } from "../types/types";

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
      return [true, "OK"];
    },
    [TopicMapping.StackExtend]: (
      selectedRewardCycle: number
    ): [boolean, string] => {
      if (!selectedRewardCycle)
        return [false, SigFormErrorMessages.EmptyRewardCycle];
      if (selectedRewardCycle < currentRewardCycle)
        return [false, SigFormErrorMessages.PastRewCycle];
      return [true, "OK"];
    },
    [TopicMapping.StackIncrease]: (): [boolean, string] => [true, "OK"],
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

export const SigFormErrorMessages = {
  EmptyRewardCycle: "Please add the reward cycle.",
  PastRewCycle: "Past reward cycles are not permitted.",
  AggFutureCycle: "For the selected topic you must insert a future cycle.",
  WrongTopic: "Please select a valid topic.",
};

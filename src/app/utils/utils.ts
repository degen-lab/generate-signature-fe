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

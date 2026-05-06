import { PushCarChallengeDto } from "../../../../shared/types/dto/challenges/PushCarChallenge.dto";
import ChallengeStepItem from "../ChallengeStepItem";

export default function PushCarChallenge({
  step,
}: {
  step: PushCarChallengeDto;
}) {
  return <ChallengeStepItem step={step}></ChallengeStepItem>;
}

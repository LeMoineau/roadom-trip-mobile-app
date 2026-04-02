import { PushCarChallengeDto } from "../../../../shared/types/dto/challenges/PushCarChallenge.dto";
import ChallengeStepItem from "../../../common/items/ChallengeStepItem";

export default function PushCarChallenge({
  step,
}: {
  step: PushCarChallengeDto;
}) {
  return <ChallengeStepItem step={step}></ChallengeStepItem>;
}

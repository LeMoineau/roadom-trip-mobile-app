import { StateProductChallengeDto } from "../../../../shared/types/dto/challenges/StateProductChallenge.dto";
import ChallengeStepItem from "../../../common/items/ChallengeStepItem";

export default function StateProductChallenge({
  step,
}: {
  step: StateProductChallengeDto;
}) {
  return <ChallengeStepItem step={step}></ChallengeStepItem>;
}

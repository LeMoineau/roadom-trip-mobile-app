import { ComplimentChallengeDto } from "../../../../shared/types/dto/challenges/ComplimentChallenge.dto";
import ChallengeStepItem from "../../../common/items/ChallengeStepItem";

export default function ComplimentChallenge({
  step,
}: {
  step: ComplimentChallengeDto;
}) {
  return <ChallengeStepItem step={step}></ChallengeStepItem>;
}

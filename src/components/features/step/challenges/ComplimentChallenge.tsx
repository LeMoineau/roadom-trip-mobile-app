import { ComplimentChallengeDto } from "../../../../shared/types/dto/challenges/ComplimentChallenge.dto";
import ChallengeStepItem from "../ChallengeStepItem";

export default function ComplimentChallenge({
  step,
}: {
  step: ComplimentChallengeDto;
}) {
  return <ChallengeStepItem step={step}></ChallengeStepItem>;
}

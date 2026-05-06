import { Toyota5ChallengeDto } from "../../../../shared/types/dto/challenges/Toyota5Challenge.dto";
import ChallengeStepItem from "../ChallengeStepItem";

export default function Toyota5Challenge({
  step,
}: {
  step: Toyota5ChallengeDto;
}) {
  return <ChallengeStepItem step={step}></ChallengeStepItem>;
}

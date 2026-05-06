import { ChangeWheelChallengeDto } from "../../../../shared/types/dto/challenges/ChangeWheelChallenge.dto";
import ChallengeStepItem from "../ChallengeStepItem";

export default function ChangeWheelChallenge({
  step,
}: {
  step: ChangeWheelChallengeDto;
}) {
  return <ChallengeStepItem step={step}></ChallengeStepItem>;
}

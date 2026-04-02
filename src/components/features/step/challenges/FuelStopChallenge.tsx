import { FuelStopChallengeDto } from "../../../../shared/types/dto/challenges/FuelStopChallenge.dto";
import ChallengeStepItem from "../../../common/items/ChallengeStepItem";

export default function FuelStopChallenge({
  step,
}: {
  step: FuelStopChallengeDto;
}) {
  return <ChallengeStepItem step={step}></ChallengeStepItem>;
}

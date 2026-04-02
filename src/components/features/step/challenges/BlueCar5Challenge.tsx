import { BlueCar5ChallengeDto } from "../../../../shared/types/dto/challenges/BlueCar5Challenge.dto";
import ChallengeStepItem from "../../../common/items/ChallengeStepItem";

export default function BlueCar5Challenge({
  step,
}: {
  step: BlueCar5ChallengeDto;
}) {
  return <ChallengeStepItem step={step}></ChallengeStepItem>;
}

import { PotatoeChallengeDto } from "../../../../shared/types/dto/challenges/PotatoeChallenge.dto";
import ChallengeStepItem from "../../../common/items/ChallengeStepItem";

export default function PotatoeChallenge({
  step,
}: {
  step: PotatoeChallengeDto;
}) {
  return <ChallengeStepItem step={step}></ChallengeStepItem>;
}

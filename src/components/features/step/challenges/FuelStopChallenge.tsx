import { Challenge } from "../../../../models/features/challenge.model";
import ChallengeStepItem from "../ChallengeStepItem";

export default function FuelStopChallenge({
  challenge,
}: {
  challenge: Challenge;
}) {
  return <ChallengeStepItem challenge={challenge}></ChallengeStepItem>;
}

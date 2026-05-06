import { Challenge } from "../../../../models/features/challenge.model";
import ChallengeStepItem from "../ChallengeStepItem";

export default function PushCarChallenge({
  challenge,
}: {
  challenge: Challenge;
}) {
  return <ChallengeStepItem challenge={challenge}></ChallengeStepItem>;
}

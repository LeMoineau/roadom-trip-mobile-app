import { Challenge } from "../../../../models/features/challenge.model";
import ChallengeStepItem from "../ChallengeStepItem";

export default function StateProductChallenge({
  challenge,
}: {
  challenge: Challenge;
}) {
  return <ChallengeStepItem challenge={challenge}></ChallengeStepItem>;
}

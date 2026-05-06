import { Text } from "react-native";
import { Challenge } from "../../../../models/features/challenge.model";
import { AttractionChallengeDto } from "../../../../shared/types/dto/challenges/AttractionChallenge.dto";
import ChallengeStepItem from "../ChallengeStepItem";

export default function AttractionChallenge({
  challenge,
}: {
  challenge: Challenge;
}) {
  return (
    <ChallengeStepItem challenge={challenge}>
      <Text>
        {JSON.stringify((challenge.dto as AttractionChallengeDto).attraction)}
      </Text>
    </ChallengeStepItem>
  );
}

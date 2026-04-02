import { Text } from "react-native";
import { AttractionChallengeDto } from "../../../../shared/types/dto/challenges/AttractionChallenge.dto";
import ChallengeStepItem from "../../../common/items/ChallengeStepItem";

export default function AttractionChallenge({
  step,
}: {
  step: AttractionChallengeDto;
}) {
  return (
    <ChallengeStepItem step={step}>
      <Text>{JSON.stringify(step.attraction)}</Text>
    </ChallengeStepItem>
  );
}

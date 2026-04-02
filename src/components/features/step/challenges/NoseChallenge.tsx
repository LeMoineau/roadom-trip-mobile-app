import { Image, TouchableOpacity } from "react-native";
import { NoseChallengeDto } from "../../../../shared/types/dto/challenges/NoseChallenge.dto";
import ChallengeStepItem from "../../../common/items/ChallengeStepItem";

const HAT_URL =
  "https://png.pngtree.com/png-vector/20230120/ourmid/pngtree-straw-hat-cartoon-illustration-png-image_6562738.png";

const NOSE_URL = "https://pngimg.com/d/nose_PNG14.png";

export default function NoseChallenge({ step }: { step: NoseChallengeDto }) {
  return (
    <ChallengeStepItem step={step}>
      <TouchableOpacity activeOpacity={0.8}>
        <Image
          source={{ uri: step.variants === "hat" ? HAT_URL : NOSE_URL }}
          style={{
            marginTop: 20,
            width: 200,
            height: step.variants === "hat" ? 200 : 120,
            transform: step.variants === "hat" ? [{ rotate: "30deg" }] : [],
          }}
          resizeMode="contain"
        ></Image>
      </TouchableOpacity>
    </ChallengeStepItem>
  );
}

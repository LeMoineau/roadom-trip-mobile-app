import { Image, View } from "react-native";
import { BlasonHintDto } from "../../../../shared/types/dto/hints/BlasonHint.dto";

export default function BlasonHint({ step }: { step: BlasonHintDto }) {
  return (
    <View style={{ gap: 10 }}>
      <View
        style={{
          flex: 1,
          display: "flex",
          flexDirection: "row",
          alignItems: "center",
          gap: 10,
        }}
      >
        <Image source={{ uri: step.blasonURL }}></Image>
      </View>
    </View>
  );
}

import { Image, View } from "react-native";
import { FlagHintDto } from "../../../../shared/types/dto/hints/FlagHint.dto";

export default function FlagHint({ step }: { step: FlagHintDto }) {
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
        <Image source={{ uri: step.flagURL }}></Image>
      </View>
    </View>
  );
}

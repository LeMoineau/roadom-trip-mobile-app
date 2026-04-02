import { Text, View } from "react-native";
import { RebusHintDto } from "../../../../shared/types/dto/hints/RebusHint.dto";

export default function RebusHint({ step }: { step: RebusHintDto }) {
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
        <Text style={{ fontSize: 17 }}>{step.message}</Text>
      </View>
    </View>
  );
}

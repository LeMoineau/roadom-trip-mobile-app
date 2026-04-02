import { Text, View } from "react-native";
import { NearCityHintDto } from "../../../../shared/types/dto/hints/NearCityHint.dto";

export default function NearCityHint({ step }: { step: NearCityHintDto }) {
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

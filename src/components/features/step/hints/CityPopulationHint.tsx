import { Text, View } from "react-native";
import { CityPopulationHintDto } from "../../../../shared/types/dto/hints/CityPopulationHint.dto";

export default function CityPopulationHint({
  step,
}: {
  step: CityPopulationHintDto;
}) {
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

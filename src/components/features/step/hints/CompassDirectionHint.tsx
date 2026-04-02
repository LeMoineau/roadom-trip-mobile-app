import { Text, View } from "react-native";
import { CompassDirectionHintDto } from "../../../../shared/types/dto/hints/CompassDirectionHint.dto";

export default function CompassDirectionHint({
  step,
}: {
  step: CompassDirectionHintDto;
}) {
  return (
    <View style={{ gap: 10 }}>
      <View
        style={{
          flex: 1,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: 10,
        }}
      >
        <Text style={{ fontSize: 20 }}>
          {step.direction} {step.from}
        </Text>
        <Text style={{ fontSize: 12 }}>{step.method}</Text>
      </View>
    </View>
  );
}

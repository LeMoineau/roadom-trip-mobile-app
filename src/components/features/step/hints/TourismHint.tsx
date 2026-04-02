import { Text, View } from "react-native";
import { TourismHintDto } from "../../../../shared/types/dto/hints/TourismHint.dto";

export default function TourismHint({ step }: { step: TourismHintDto }) {
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
        <Text style={{ fontSize: 17 }}>{step.message}</Text>
        <Text style={{ fontSize: 12 }}>{step.methodGenerationMessage}</Text>
      </View>
    </View>
  );
}

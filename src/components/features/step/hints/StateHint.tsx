import { Text, View } from "react-native";
import { StateHintDto } from "../../../../shared/types/dto/hints/StateHint.dto";

export default function StateHint({ step }: { step: StateHintDto }) {
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

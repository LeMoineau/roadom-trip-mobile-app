import { Text, View } from "react-native";
import { DepartementHintDto } from "../../../../shared/types/dto/hints/DepartementHint.dto";

export default function DepartementHint({
  step,
}: {
  step: DepartementHintDto;
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

import { Text, View } from "react-native";
import { DishHintDto } from "../../../../shared/types/dto/hints/DishHint.dto";

export default function DishHint({ step }: { step: DishHintDto }) {
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
        <Text style={{ fontSize: 20 }}>{step.dish.name}</Text>
        <Text style={{ fontSize: 15 }}>{step.dish.desc}</Text>
      </View>
    </View>
  );
}

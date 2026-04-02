import { Text, View } from "react-native";
import { ShoesHintDto } from "../../../../shared/types/dto/hints/ShoesHint.dto";

export default function ShoesHint({ step }: { step: ShoesHintDto }) {
  //TODO: mettre des images pour chaque type de chaussures
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
        <Text style={{ fontSize: 20 }}>{step.shoes}</Text>
      </View>
    </View>
  );
}

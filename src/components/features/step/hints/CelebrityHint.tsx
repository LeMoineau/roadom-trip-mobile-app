import { Text, View } from "react-native";
import { CelebrityHintDto } from "../../../../shared/types/dto/hints/CelebrityHint.dto";

export default function CelebrityHint({ step }: { step: CelebrityHintDto }) {
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
        <Text style={{ fontSize: 17 }}>
          {step.celebrity.name} ({step.celebrity.main_occ}) est{" "}
          {step.nearestFromPlace === "birth" ? "né.e" : "mort.e"} proche de
          votre destination !
        </Text>
      </View>
    </View>
  );
}

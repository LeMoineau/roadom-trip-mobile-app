import { Text, View } from "react-native";
import { PreciseDescriptionHintDto } from "../../../../shared/types/dto/hints/PreciseDescriptionHint.dto";

export default function PreciseDescriptionHint({
  step,
}: {
  step: PreciseDescriptionHintDto;
}) {
  return (
    <View style={{ gap: 10 }}>
      <View
        style={{
          flex: 1,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: 30,
        }}
      >
        {step.wikipediaPage.map((section, index) => (
          <View
            style={{
              flex: 1,
              display: "flex",
              flexDirection: "column",
              gap: 10,
              width: "100%",
            }}
            key={`s-${index}`}
          >
            <Text style={{ fontSize: 20 }}>{section.title}</Text>
            {section.paragraphes.map((p, indexP) => (
              <Text style={{ fontSize: 15 }} key={`s-${index}-${indexP}`}>
                {p}
              </Text>
            ))}
          </View>
        ))}
      </View>
    </View>
  );
}

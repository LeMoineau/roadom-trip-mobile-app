import { Text, View } from "react-native";
import { HGBDHintDto } from "../../../../shared/types/dto/hints/HGBDHint.dto";
import ExpoIcon from "../../../common/icons/ExpoIcon";

const PROPS = {
  haut: {
    label: "En haut",
    icon: "arrow-up",
  },
  gauche: {
    label: "A gauche",
    icon: "arrow-back",
  },
  bas: {
    label: "En bas",
    icon: "arrow-down",
  },
  droite: {
    label: "A droite",
    icon: "arrow-forward",
  },
};

export default function HGBDHint({ step }: { step: HGBDHintDto }) {
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
        <ExpoIcon name={PROPS[step.direction].icon as any} size={50}></ExpoIcon>
        <Text style={{ fontSize: 20 }}>
          {PROPS[step.direction].label as any}
        </Text>
      </View>
    </View>
  );
}

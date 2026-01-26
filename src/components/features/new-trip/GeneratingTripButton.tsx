import { useState } from "react";
import { ActivityIndicator } from "react-native";
import { colors } from "../../../constants/style/colors";
import FloatingButton from "../../common/buttons/FloatingButton";
import ExpoIcon from "../../common/icons/ExpoIcon";

export default function GeneratingTripButton({
  activated,
  onPress,
}: {
  activated?: boolean;
  onPress?: () => Promise<void>;
}) {
  const [loading, setLoading] = useState(false);

  return (
    <FloatingButton
      content={loading ? "En cours de génération..." : "Générer un voyage"}
      bgColor={loading || !activated ? colors.gray[400] : colors.primary}
      appendIcon={
        loading ? (
          <ActivityIndicator color={colors.white}></ActivityIndicator>
        ) : (
          <ExpoIcon
            name="arrow-forward"
            size={20}
            style={{ color: colors.white }}
          ></ExpoIcon>
        )
      }
      onPress={() => {
        if (!activated) return;
        if (onPress) {
          setLoading(true);
          onPress().finally(() => {
            setLoading(false);
          });
        }
      }}
    ></FloatingButton>
  );
}

import { Text, TouchableOpacity, View } from "react-native";
import { colors } from "../../../constants/style/colors";
import { DateUtils } from "../../../shared/utils/date.utils";
import ExpoIcon from "../../common/icons/ExpoIcon";
import Divider from "../../common/misc/Divider";

export default function StartingStepItem({
  started,
  startingDate,
  onPress,
}: {
  started: boolean;
  startingDate?: Date;
  onPress?: () => void;
}) {
  return (
    <TouchableOpacity
      style={{
        padding: 20,
        borderRadius: 10,
        backgroundColor: !started ? colors.primary : colors.green[50],
        borderWidth: 1,
        borderColor: !started ? colors.gray[100] : colors.green[200],
        display: "flex",
        flexDirection: "column",
        alignItems: "flex-start",
        paddingRight: 15,
        flex: 1,
        gap: 20,
      }}
      onPress={() => {
        onPress && onPress();
      }}
      activeOpacity={0.8}
    >
      <View style={{ flex: 1, display: "flex", flexDirection: "column" }}>
        <Text
          style={{
            fontWeight: !started ? 600 : undefined,
            color: !started ? colors.white : colors.green[500],
            fontSize: !started ? undefined : 12,
          }}
        >
          {!started
            ? "Vous êtes prêt à partir ?!"
            : (!!startingDate
                ? DateUtils.toHHmmDDMMYY(startingDate) + " - "
                : "") + "Début de l'aventure !"}
        </Text>
      </View>
      {!started && <Divider style={{ width: "100%" }}></Divider>}
      {!started && (
        <View
          style={{
            flex: 1,
            display: "flex",
            flexDirection: "row",
            justifyContent: "flex-end",
            alignItems: "flex-end",
            gap: 10,
            width: "100%",
          }}
        >
          <Text style={{ color: colors.white, fontWeight: "600" }}>
            Commencer le Road-Trip
          </Text>
          <ExpoIcon
            name="chevron-forward"
            size={20}
            style={{ color: colors.white }}
          ></ExpoIcon>
        </View>
      )}
    </TouchableOpacity>
  );
}

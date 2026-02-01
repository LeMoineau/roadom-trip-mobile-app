import { Text, View } from "react-native";
import { colors } from "../../../constants/style/colors";
import ExpoIcon from "../icons/ExpoIcon";

export default function NoArchivedTripsYetItem() {
  return (
    <View
      style={{
        display: "flex",
        flexDirection: "row",
        gap: 20,
        width: "100%",
        backgroundColor: colors.gray[50],
        borderWidth: 1,
        borderColor: colors.gray[100],
        padding: 20,
        borderRadius: 20,
      }}
    >
      <ExpoIcon name="history" size={30}></ExpoIcon>
      <Text style={{ flex: 1, fontSize: 13 }}>
        Tous vos précédents voyages seront archivés ici !
      </Text>
    </View>
  );
}

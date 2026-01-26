import { ScrollView, Text, View } from "react-native";
import ExpoIcon from "../components/common/icons/ExpoIcon";
import { colors } from "../constants/style/colors";

export default function newTripPage() {
  return (
    <View
      style={{
        flex: 1,
        paddingHorizontal: 20,
        paddingTop: 20,
        paddingBottom: 50,
      }}
    >
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
      <ScrollView></ScrollView>
    </View>
  );
}

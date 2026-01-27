import { AntDesign } from "@expo/vector-icons";
import { Text, View } from "react-native";
import { colors } from "../../../constants/style/colors";

export default function NoTripYetItem() {
  return (
    <View
      style={{
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        width: "100%",
        backgroundColor: colors.gray[50],
        borderWidth: 1,
        borderColor: colors.gray[100],
        borderRadius: 20,
        gap: 5,
        marginTop: 20,
        marginVertical: 20,
        paddingVertical: 20,
      }}
    >
      <AntDesign
        name="car"
        size={50}
        style={{ color: colors.gray[500] }}
      ></AntDesign>
      <Text style={{ color: colors.gray[500] }}>
        Pas de voyages en cours...
      </Text>
    </View>
  );
}

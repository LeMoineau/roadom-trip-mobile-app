import { Text, View } from "react-native";
import { colors } from "../../../constants/style/colors";

export default function NoMoreStepItem() {
  return (
    <View
      style={{
        padding: 20,
        borderRadius: 10,
        backgroundColor: colors.gray[50],
        borderWidth: 1,
        borderColor: colors.gray[100],
        display: "flex",
        flexDirection: "column",
        alignItems: "flex-start",
        paddingRight: 15,
        flex: 1,
        gap: 20,
      }}
    >
      <View
        style={{ flex: 1, display: "flex", flexDirection: "column", gap: 10 }}
      >
        <Text style={{ fontWeight: 600 }}>Plus de prochaine étape !</Text>
        <Text style={{ fontSize: 12 }}>
          Vous avez épuisé tous les indices et challenges disponibles ! Bon
          courage pour trouver votre destination !
        </Text>
      </View>
    </View>
  );
}

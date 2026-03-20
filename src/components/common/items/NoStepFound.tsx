import { Text, View } from "react-native";
import { colors } from "../../../constants/style/colors";
import ExpoIcon from "../icons/ExpoIcon";

export default function NoStepFound() {
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
      <ExpoIcon
        name="not-interested"
        size={50}
        style={{ color: colors.gray[500] }}
      ></ExpoIcon>
      <Text style={{ color: colors.gray[500] }}>Aucune étape trouvée...</Text>
    </View>
  );
}

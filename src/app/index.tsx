import { AntDesign } from "@expo/vector-icons";
import { router } from "expo-router";
import { Text, View } from "react-native";
import FloatingButton from "../components/common/buttons/FloatingButton";
import OutlineButton from "../components/common/buttons/OutlineButton";
import ExpoIcon from "../components/common/icons/ExpoIcon";
import { colors } from "../constants/style/colors";

export default function Index() {
  return (
    <View
      style={{
        flex: 1,
        paddingHorizontal: 20,
        paddingTop: 20,
        justifyContent: "flex-start",
        alignItems: "flex-start",
      }}
    >
      <Text style={{ fontSize: 25, fontWeight: 500 }}>Vos Voyages</Text>
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
        <AntDesign name="car" size={50} color={colors.gray[500]}></AntDesign>
        <Text style={{ color: colors.gray[500] }}>
          Pas de voyages en cours...
        </Text>
      </View>
      <OutlineButton
        content="Historiques des voyages"
        appendIcon={<ExpoIcon name="chevron-forward" size={20}></ExpoIcon>}
        onPress={() => {
          router.push("/trip-history");
        }}
      ></OutlineButton>
      <FloatingButton
        content="Nouveau Voyage"
        appendIcon={
          <ExpoIcon
            name="add"
            size={20}
            style={{ color: colors.white }}
          ></ExpoIcon>
        }
        onPress={() => {
          router.push("/new-trip");
        }}
      ></FloatingButton>
    </View>
  );
}

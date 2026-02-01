import { useNavigation } from "expo-router";
import { useEffect } from "react";
import { View } from "react-native";

export default function HintPage() {
  const navigation = useNavigation();

  useEffect(() => {
    navigation.setOptions({ title: "Un nom d'indice" });
  }, []);

  return <View style={{ flex: 1, padding: 20 }}></View>;
}

import { Ionicons } from "@expo/vector-icons";
import { router, Stack } from "expo-router";
import { Pressable } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { colors } from "../constants/style/colors";

export default function RootLayout() {
  return (
    <SafeAreaView
      edges={{ top: "off", bottom: "additive" }}
      style={{ flex: 1 }}
    >
      <Stack
        screenOptions={{
          contentStyle: { backgroundColor: colors.white },
        }}
      >
        <Stack.Screen
          name="index"
          options={{
            headerTitle: "Roadom Trip",
            headerRight: () => (
              <Pressable
                onPress={() => {
                  router.push("/settings");
                }}
              >
                <Ionicons name="settings-sharp" size={23}></Ionicons>
              </Pressable>
            ),
          }}
        />
        <Stack.Screen
          name="new-trip/index"
          options={{ headerTitle: "Nouveau voyage" }}
        />
        <Stack.Screen
          name="new-trip/location-selector"
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="new-trip/distance-selector"
          options={{ headerShown: false }}
        />
        <Stack.Screen name="settings" options={{ headerTitle: "Paramètres" }} />
        <Stack.Screen
          name="trip-history"
          options={{ headerTitle: "Historiques des voyages" }}
        />
        <Stack.Screen name="trip/[id]" options={{ headerTitle: "Voyage" }} />
      </Stack>
    </SafeAreaView>
  );
}

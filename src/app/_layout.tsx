import { Ionicons } from "@expo/vector-icons";
import { router, Stack } from "expo-router";
import { Pressable } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { colors } from "../constants/style/colors";
import ToastProvider from "../contexts/ToastProvider";

export default function RootLayout() {
  return (
    <SafeAreaView
      edges={{ top: "off", bottom: "additive" }}
      style={{ flex: 1 }}
    >
      <ToastProvider>
        <Stack
          screenOptions={{
            contentStyle: { backgroundColor: colors.white },
          }}
        >
          <Stack.Screen
            name="index"
            options={{
              headerTitle: "AléaCarta",
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
            options={{ headerTitle: "Nouveau Road-Trip" }}
          />
          <Stack.Screen
            name="new-trip/location-selector"
            options={{
              headerTitle: "Sélectionnez une position",
              headerShown: true,
            }}
          />
          <Stack.Screen
            name="new-trip/distance-selector"
            options={{
              headerTitle: "Sélectionnez une distance",
              headerShown: true,
            }}
          />
          <Stack.Screen
            name="settings"
            options={{ headerTitle: "Paramètres" }}
          />
          <Stack.Screen
            name="history"
            options={{ headerTitle: "Historiques des voyages" }}
          />
          <Stack.Screen
            name="trips/[id]/(tabs)"
            options={{ headerTitle: "Votre Road-Trip" }}
          />
          <Stack.Screen
            name="trips/[id]/steps/[index]"
            options={{ headerTitle: "Informations étape" }}
          />
          <Stack.Screen
            name="trips/[id]/recap/(tabs)"
            options={{ headerTitle: "Récapitulatif du Road-Trip" }}
          />
        </Stack>
      </ToastProvider>
    </SafeAreaView>
  );
}

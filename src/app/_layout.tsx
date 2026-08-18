import * as Notifications from "expo-notifications";
import { router, Stack } from "expo-router";
import { Pressable } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import ExpoIcon from "../components/common/icons/ExpoIcon";
import { colors } from "../constants/style/colors";
import ToastProvider from "../contexts/ToastProvider";

Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldPlaySound: false,
    shouldSetBadge: false,
    shouldShowBanner: true,
    shouldShowList: true,
  }),
});

//TODO: continuer d'investiguer pour les notifications en background

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
              headerLeft: () => (
                <Pressable
                  onPress={() => {
                    router.push("/settings");
                  }}
                  style={{
                    paddingRight: 20,
                    paddingVertical: 10,
                  }}
                >
                  <ExpoIcon name="menu-sharp" size={23}></ExpoIcon>
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
            name="new-trip/search-location-response-selector"
            options={{
              headerShown: false,
              presentation: "transparentModal",
              animation: "fade",
              contentStyle: { backgroundColor: colors.transparent },
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
            name="new-trip/more-options"
            options={{
              headerTitle: "Plus d'options",
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

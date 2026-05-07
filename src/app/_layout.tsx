import { Ionicons } from "@expo/vector-icons";
import * as Notifications from "expo-notifications";
import { router, Stack } from "expo-router";
import * as TaskManager from "expo-task-manager";
import { useEffect } from "react";
import { Pressable } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { storageKeys } from "../config/storage-keys";
import { colors } from "../constants/style/colors";
import ToastProvider from "../contexts/ToastProvider";
import useNotifications from "../hooks/common/use-notifications";
import useStorage from "../hooks/common/use-storage";

const BACKGROUND_NOTIFICATION_TASK = "BACKGROUND-NOTIFICATION-TASK";
const { saveJson } = useStorage();

Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldPlaySound: false,
    shouldSetBadge: false,
    shouldShowBanner: true,
    shouldShowList: true,
  }),
});

TaskManager.defineTask<Notifications.NotificationTaskPayload>(
  BACKGROUND_NOTIFICATION_TASK,
  async ({ data }) => {
    console.log(data);
    saveJson(storageKeys.NOTIFICATION_TEST, {
      ...data,
      receivedDate: new Date().toString(),
    });
    if (
      !("actionIdentifier" in data) && //n'est pas une notification de réponse
      data.data.body &&
      typeof data.data.body === "string"
    ) {
    }
  },
);

Notifications.registerTaskAsync(BACKGROUND_NOTIFICATION_TASK);

//TODO: continuer d'investiguer pour les notifications en background

export default function RootLayout() {
  const { expoPushToken, shortExpoPushToken, sendPushNotification } =
    useNotifications();
  const { saveJson, getJson } = useStorage();

  useEffect(() => {
    console.log("token", expoPushToken);
    getJson(storageKeys.NOTIFICATION_TEST).then((res) => {
      console.log("test notif", res);
    });
  }, [expoPushToken]);

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

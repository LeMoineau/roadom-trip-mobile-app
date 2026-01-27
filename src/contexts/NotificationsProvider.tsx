import * as Notifications from "expo-notifications";
import * as TaskManager from "expo-task-manager";
import { ReactNode } from "react";
import useNotifications from "../hooks/common/use-notifications";
import { NotificationContext } from "./contexts";

Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldPlaySound: false,
    shouldSetBadge: false,
    shouldShowBanner: true,
    shouldShowList: true,
  }),
});

const BACKGROUND_NOTIFICATION_TASK = "BACKGROUND-NOTIFICATION-TASK";

export default function NotificationsProvider({
  children,
}: {
  children: ReactNode;
}) {
  const { expoPushToken, shortExpoPushToken, sendPushNotification } =
    useNotifications();
  // const { saveNewItemToArray } = useStorage();

  TaskManager.defineTask<Notifications.NotificationTaskPayload>(
    BACKGROUND_NOTIFICATION_TASK,
    async ({ data }) => {
      if (
        !("actionIdentifier" in data) && //n'est pas une notification de réponse
        data.data.body &&
        typeof data.data.body === "string"
      ) {
        // saveNewItemToArray(
        //   STORAGE_KEYS.messages,
        //   JSON.parse(data.data.body).message
        // );
      }
    },
  );

  Notifications.registerTaskAsync(BACKGROUND_NOTIFICATION_TASK);

  return (
    <NotificationContext.Provider
      value={{
        shortExpoPushToken,
        expoPushToken,
        sendPushNotification,
      }}
    >
      {children}
    </NotificationContext.Provider>
  );
}

import { createContext } from "react";
import { JSONObject } from "../shared/types/primitives/JsonObject";
import { ToastMessage } from "../types/ToastMessage";

export const ToastContext = createContext({
  currentToast: {} as ToastMessage,
  showToast: (t: ToastMessage) => {},
});

export const NotificationContext = createContext({
  expoPushToken: "",
  shortExpoPushToken: "",
  sendPushNotification: (notif: {
    title: string;
    body: string;
    to: string;
    data?: JSONObject;
  }): Promise<void> => {
    return {} as Promise<void>;
  },
});

import { useEffect, useState } from "react";
import { Text, View } from "react-native";
import { colors } from "../../../constants/style/colors";
import { Step } from "../../../models/features/step.model";
import { ProximityNotificationDto } from "../../../shared/types/dto/notifications/ProximityNotification.dto";
import ExpoIcon from "../icons/ExpoIcon";

export default function ProximityNotificationItem({
  currentProximityNotif,
}: {
  currentProximityNotif?: Step;
}) {
  const [range, setRange] = useState<number | undefined>(400);
  const notificationStatus = !!range ? "on" : "off";

  useEffect(() => {
    if (!!!currentProximityNotif) {
      setRange(undefined);
    } else {
      setRange(
        (currentProximityNotif.toDto() as ProximityNotificationDto).range,
      );
    }
  });

  return (
    <View
      style={{
        display: "flex",
        flexDirection: "row",
        gap: 10,
        width: "100%",
        overflow: "hidden",
      }}
    >
      <ExpoIcon
        name={
          notificationStatus === "on" ? "notifications-on" : "notifications-off"
        }
        size={20}
        style={{ color: colors.gray[800] }}
      ></ExpoIcon>
      <Text
        style={{
          color: colors.gray[600],
          flex: 1,
        }}
      >
        {notificationStatus === "on"
          ? `Notification de proximité à ${range}km de la destination`
          : "Pas encore de notification de proximité"}
      </Text>
    </View>
  );
}

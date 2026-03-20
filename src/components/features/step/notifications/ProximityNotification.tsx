import { Text, View } from "react-native";
import { ProximityNotificationDto } from "../../../../shared/types/dto/notifications/ProximityNotification.dto";

export default function ProximityNotification({
  step,
}: {
  step: ProximityNotificationDto;
}) {
  return (
    <View style={{ gap: 10 }}>
      <Text style={{}}>
        Une notification se déclenchera à chaque fois que vous entrerez ou
        sortirez d'une zone de {step.range}km autour de la destination.
      </Text>
    </View>
  );
}

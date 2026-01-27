import { Text, View } from "react-native";
import { Trip } from "../../../shared/models/Trip.model";

export default function HomeTripItem({ trip }: { trip: Trip }) {
  return (
    <View>
      <Text>{JSON.stringify(trip.toDto())}</Text>
    </View>
  );
}

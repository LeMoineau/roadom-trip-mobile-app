import { View } from "react-native";
import NoTripYetItem from "../../components/common/items/NoTripYetItem";
import useStoredTrip from "../../hooks/features/trip/useStoredTrip";

export default function TripPage() {
  const { trip } = useStoredTrip();

  if (!trip) {
    return <NoTripYetItem></NoTripYetItem>;
  }

  return <View style={{ flex: 1 }}></View>;
}

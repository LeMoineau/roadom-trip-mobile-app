import { router } from "expo-router";
import { ScrollView, View } from "react-native";
import NoArchivedTripsYetItem from "../components/common/items/NoArchivedTripsYetItem";
import TripPreviewItem from "../components/common/items/TripPreviewItem";
import useArchivedTrips from "../hooks/features/trip/useArchivedTrips";

export default function newTripPage() {
  const { archivedTrips } = useArchivedTrips();

  return (
    <View
      style={{
        flex: 1,
        paddingHorizontal: 20,
        paddingTop: 20,
        paddingBottom: 50,
      }}
    >
      {archivedTrips ? (
        archivedTrips.map((t, index) => (
          <TripPreviewItem
            key={index}
            trip={t}
            onPress={() => {
              router.push({ pathname: "/trips/[id]", params: { id: t.id } });
            }}
          ></TripPreviewItem>
        ))
      ) : (
        <NoArchivedTripsYetItem></NoArchivedTripsYetItem>
      )}
      <ScrollView></ScrollView>
    </View>
  );
}

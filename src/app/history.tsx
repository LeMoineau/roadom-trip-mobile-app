import { router, usePathname } from "expo-router";
import { useEffect } from "react";
import { ScrollView, View } from "react-native";
import NoArchivedTripsYetItem from "../components/common/items/NoArchivedTripsYetItem";
import TripPreviewItem from "../components/features/index/TripPreviewItem";
import useArchivedTrips from "../hooks/features/trip/useArchivedTrips";

export default function HistoryPage() {
  const { archivedTrips, loadArchivedTrips } = useArchivedTrips();
  const pathname = usePathname();

  useEffect(() => {
    loadArchivedTrips();
  }, [pathname]);

  return (
    <View
      style={{
        flex: 1,
      }}
    >
      <ScrollView
        style={{
          flex: 1,
          paddingHorizontal: 20,
          paddingTop: 20,
          paddingBottom: 150,
        }}
      >
        {archivedTrips ? (
          archivedTrips.map((t, index) => (
            <View key={index}>
              <TripPreviewItem
                trip={t}
                onPress={() => {
                  router.push({
                    pathname: "/trips/[id]",
                    params: { id: t.id },
                  });
                }}
              ></TripPreviewItem>
              <View style={{ height: 20 }}></View>
            </View>
          ))
        ) : (
          <NoArchivedTripsYetItem></NoArchivedTripsYetItem>
        )}
      </ScrollView>
    </View>
  );
}

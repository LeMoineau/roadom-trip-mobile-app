import { router, useLocalSearchParams } from "expo-router";
import { useEffect } from "react";
import { Text, View } from "react-native";
import FloatingButton from "../components/common/buttons/FloatingButton";
import OutlineButton from "../components/common/buttons/OutlineButton";
import ExpoIcon from "../components/common/icons/ExpoIcon";
import NoTripYetItem from "../components/common/items/NoTripYetItem";
import TripPreviewItem from "../components/common/items/TripPreviewItem";
import { colors } from "../constants/style/colors";
import useStoredTrip from "../hooks/features/trip/useStoredTrip";

export default function Index() {
  const { newTripCreated } = useLocalSearchParams<{
    newTripCreated?: string;
  }>();
  const { trip, loadCurrentTrip } = useStoredTrip();

  useEffect(() => {
    console.log(newTripCreated);
    loadCurrentTrip();
  }, [newTripCreated]);

  return (
    <View
      style={{
        flex: 1,
        paddingHorizontal: 20,
        paddingTop: 20,
        justifyContent: "flex-start",
        alignItems: "flex-start",
        gap: 20,
      }}
    >
      <Text style={{ fontSize: 25, fontWeight: 500 }}>Vos Voyages</Text>
      {trip ? (
        <TripPreviewItem
          trip={trip}
          onPress={() => {
            router.push({ pathname: "/trip/[id]", params: { id: trip.id } });
          }}
        ></TripPreviewItem>
      ) : (
        <NoTripYetItem></NoTripYetItem>
      )}
      <OutlineButton
        content="Historiques des voyages"
        appendIcon={<ExpoIcon name="chevron-forward" size={20}></ExpoIcon>}
        onPress={() => {
          router.push("/trip-history");
        }}
        style={{ width: "100%" }}
      ></OutlineButton>
      <FloatingButton
        content="Nouveau Voyage"
        appendIcon={
          <ExpoIcon
            name="add"
            size={20}
            style={{ color: colors.white }}
          ></ExpoIcon>
        }
        onPress={() => {
          router.push("/new-trip");
        }}
      ></FloatingButton>
    </View>
  );
}

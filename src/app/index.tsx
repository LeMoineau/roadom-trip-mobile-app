import { router } from "expo-router";
import { useState } from "react";
import { RefreshControl, ScrollView, View } from "react-native";
import FloatingButton from "../components/common/buttons/FloatingButton";
import OutlineButton from "../components/common/buttons/OutlineButton";
import ExpoIcon from "../components/common/icons/ExpoIcon";
import NoTripYetItem from "../components/common/items/NoTripYetItem";
import TripPreviewItem from "../components/features/index/TripPreviewItem";
import { colors } from "../constants/style/colors";
import useNotifications from "../hooks/common/use-notifications";
import { useTripStore } from "../stores/features/trip/trip.store";

//TODO: retirer bouton Test

export default function Index() {
  const [refreshing, setRefreshing] = useState(false);
  const trip = useTripStore((state) => state.trip);
  const { schedulePushNotification, sendPushNotification, expoPushToken } =
    useNotifications();

  const handlePageRefresh = () => {
    setRefreshing(true);
    setTimeout(() => {
      setRefreshing(false);
    }, 1000);
  };

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
      <ScrollView
        style={{
          flex: 1,
          width: "100%",
          gap: 20,
        }}
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={handlePageRefresh}
          ></RefreshControl>
        }
      >
        {/* <Text style={{ fontSize: 25, fontWeight: 500 }}>Vos Voyages</Text> */}
        {trip ? (
          <TripPreviewItem
            trip={trip}
            onPress={() => {
              router.push({ pathname: "/trips/[id]", params: { id: trip.id } });
            }}
          ></TripPreviewItem>
        ) : (
          <NoTripYetItem></NoTripYetItem>
        )}
        <View style={{ height: 20 }}></View>
        <OutlineButton
          content="Historiques des voyages"
          appendIcon={<ExpoIcon name="chevron-forward" size={20}></ExpoIcon>}
          onPress={() => {
            router.push("/history");
          }}
          style={{ width: "100%" }}
        ></OutlineButton>
        <OutlineButton
          content="Test"
          appendIcon={<ExpoIcon name="chevron-forward" size={20}></ExpoIcon>}
          onPress={() => {
            schedulePushNotification();
            sendPushNotification({
              title: "coucou",
              body: "salut",
              to: expoPushToken,
            });
          }}
          style={{ width: "100%" }}
        ></OutlineButton>
      </ScrollView>
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

import { router } from "expo-router";
import { useContext } from "react";
import { ScrollView, View } from "react-native";
import OutlineButton from "../../../../components/common/buttons/OutlineButton";
import ExpoIcon from "../../../../components/common/icons/ExpoIcon";
import NoTripYetItem from "../../../../components/common/items/NoTripYetItem";
import { colors } from "../../../../constants/style/colors";
import { ToastContext } from "../../../../contexts/contexts";
import useArchivedTrips from "../../../../hooks/features/trip/useArchivedTrips";
import { useTripStore } from "../../../../stores/features/trip/trip.store";

export default function TripSettingTab() {
  const trip = useTripStore((state) => state.trip);
  const { archiveTrip } = useArchivedTrips();
  const { showToast } = useContext(ToastContext);

  if (!!!trip) {
    return (
      <View style={{ padding: 20, paddingTop: 0 }}>
        <NoTripYetItem></NoTripYetItem>
      </View>
    );
  }

  const handleTerminateTrip = () => {
    if (confirm("Etes-vous sûr de vouloir terminer ce road-trip ?")) {
      archiveTrip(trip);
      showToast({
        message: "Road-trip terminé et archivé !",
        bgColor: colors.green[500],
        duration: 3000,
      });
      router.dismissTo({
        pathname: "/",
      });
    }
  };

  return (
    <View style={{ flex: 1 }}>
      <ScrollView>
        <View style={{ flex: 1, padding: 20, gap: 20 }}>
          <OutlineButton
            content="Forcer le prochain indice"
            prependIcon={<ExpoIcon name="play-forward" size={20}></ExpoIcon>}
          ></OutlineButton>
          <OutlineButton
            content="Donner sa langue au chat"
            prependIcon={<ExpoIcon name="location-on" size={20}></ExpoIcon>}
          ></OutlineButton>
          <OutlineButton
            content="Terminer le Road-Trip"
            style={{
              backgroundColor: colors.red[100],
              borderColor: colors.red[200],
            }}
            onPress={handleTerminateTrip}
            textStyle={{ color: colors.red[500] }}
            prependIcon={
              <ExpoIcon
                name="close"
                size={20}
                style={{ color: colors.red[500] }}
              ></ExpoIcon>
            }
          ></OutlineButton>
          <View style={{ height: 150 }}></View>
        </View>
      </ScrollView>
    </View>
  );
}

import { router, useLocalSearchParams } from "expo-router";
import { useContext } from "react";
import { Alert, ScrollView, View } from "react-native";
import OutlineButton from "../../../../components/common/buttons/OutlineButton";
import ExpoIcon from "../../../../components/common/icons/ExpoIcon";
import NoTripYetItem from "../../../../components/common/items/NoTripYetItem";
import { colors } from "../../../../constants/style/colors";
import { ToastContext } from "../../../../contexts/contexts";
import useArchivedTrips from "../../../../hooks/features/trip/useArchivedTrips";
import useTripRepository from "../../../../hooks/features/trip/useTripRepository";

export default function TripSettingTab() {
  const { archiveTrip } = useArchivedTrips();
  const { showToast } = useContext(ToastContext);

  const { id } = useLocalSearchParams<{ id: string }>();
  const { trip, updateTrip } = useTripRepository({ id });

  if (!!!trip) {
    return (
      <View style={{ padding: 20, paddingTop: 0 }}>
        <NoTripYetItem></NoTripYetItem>
      </View>
    );
  }

  const handleForceNextStep = () => {
    Alert.alert(
      "Forcer le prochain indice",
      "Etes-vous sûr de vouloir forcer le prochain indice de votre road-trip ?",
      [
        {
          text: "Non",
          style: "cancel",
        },
        {
          text: "Oui",
          onPress: () => {
            const nextStep = trip.getNextStep();
            if (!!nextStep) {
              nextStep.dto.reach = true;
              updateTrip(trip);
              router.push({ pathname: "/trips/[id]", params: { id: trip.id } });
              showToast({
                message: `Un nouvel indice a été révélé !`,
                bgColor: colors.green[500],
                duration: 3000,
              });
            }
          },
        },
      ],
    );
  };

  const handleAbandonTrip = () => {
    Alert.alert(
      "Donner votre langue au chat",
      "Etes-vous sûr de vouloir donner votre langue au chat ?",
      [
        {
          text: "Non",
          style: "cancel",
        },
        {
          text: "Oui",
          onPress: () => {
            trip.abandon();
            archiveTrip(trip);
            showToast({
              message: "Road-trip terminé et archivé !",
              bgColor: colors.green[500],
              duration: 3000,
            });
            router.dismissTo({
              pathname: "/",
            });
            router.push({
              pathname: "/trips/[id]/recap",
              params: { id: trip.id },
            });
          },
        },
      ],
    );
  };

  const handleTerminateTrip = () => {
    Alert.alert(
      "Terminer le road-trip",
      "Etes-vous sûr de vouloir terminer ce road-trip ?",
      [
        {
          text: "Non",
          style: "cancel",
        },
        {
          text: "Oui",
          onPress: () => {
            trip.finish();
            archiveTrip(trip);
            showToast({
              message: "Road-trip terminé et archivé !",
              bgColor: colors.green[500],
              duration: 3000,
            });
            router.dismissTo({
              pathname: "/",
            });
          },
        },
      ],
    );
  };

  const handleOpenRecap = () => {
    router.push({
      pathname: "/trips/[id]/recap",
      params: { id: trip.id },
    });
  };

  return (
    <View style={{ flex: 1 }}>
      <ScrollView>
        <View style={{ flex: 1, padding: 20, gap: 20 }}>
          {!!trip.getNextStep() && (
            <OutlineButton
              content="Forcer le prochain indice"
              prependIcon={<ExpoIcon name="play-forward" size={20}></ExpoIcon>}
              onPress={handleForceNextStep}
            ></OutlineButton>
          )}
          {!["finish", "abandoned"].includes(trip.status) && (
            <OutlineButton
              content="Donner sa langue au chat"
              prependIcon={<ExpoIcon name="location-on" size={20}></ExpoIcon>}
              onPress={handleAbandonTrip}
            ></OutlineButton>
          )}
          {!["finish", "abandoned"].includes(trip.status) && (
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
          )}
          {["finish", "abandoned"].includes(trip.status) && (
            <OutlineButton
              content="Ouvrir le récapitulatif"
              style={{
                backgroundColor: colors.blue[50],
                borderColor: colors.blue[200],
              }}
              prependIcon={<ExpoIcon name="open-outline" size={20}></ExpoIcon>}
              onPress={handleOpenRecap}
            ></OutlineButton>
          )}
          <View style={{ height: 150 }}></View>
        </View>
      </ScrollView>
    </View>
  );
}

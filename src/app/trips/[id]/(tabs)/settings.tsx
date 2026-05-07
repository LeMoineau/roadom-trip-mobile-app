import { router, useLocalSearchParams } from "expo-router";
import { useContext } from "react";
import { ActivityIndicator, Alert, ScrollView, View } from "react-native";
import OutlineButton from "../../../../components/common/buttons/OutlineButton";
import ExpoIcon from "../../../../components/common/icons/ExpoIcon";
import LoadingPage from "../../../../components/common/misc/LoadingPage";
import { colors } from "../../../../constants/style/colors";
import { ToastContext } from "../../../../contexts/contexts";
import useUserLocation from "../../../../hooks/common/use-user-location";
import useArchivedTrips from "../../../../hooks/features/trip/useArchivedTrips";
import useTripRepository from "../../../../hooks/features/trip/useTripRepository";
import { GeoPoint } from "../../../../shared/models/GeoPoint.model";
import { DateUtils } from "../../../../shared/utils/date.utils";

export default function TripSettingTab() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const { trip, updateTrip } = useTripRepository({ id });

  const { archiveTrip } = useArchivedTrips();
  const { showToast } = useContext(ToastContext);
  const { userLocationLoading, getLocation } = useUserLocation();

  if (!!!trip) {
    return <LoadingPage></LoadingPage>;
  }

  const _addingCurrentPosInTrip = () => {
    getLocation().then((res) => {
      if (!!res) {
        trip.addPointInTraveledRoute(
          new GeoPoint({
            lat: res.coords.latitude,
            lon: res.coords.longitude,
            label: DateUtils.toHHmmDDMMYY(new Date()),
          }),
        );
        updateTrip(trip);
      }
    });
  };

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
                message: `${nextStep.newStepTypeLabel} a été révélé !`,
                bgColor: colors.green[500],
                duration: 3000,
              });
            }
          },
        },
      ],
    );
  };

  const handleRemovePersonAsking = () => {
    Alert.alert(
      "Retirer 1 Aide",
      "Avez-vous bien demander de l'aide à une personne ?",
      [
        {
          text: "Non",
          style: "cancel",
        },
        {
          text: "Oui",
          onPress: () => {
            trip.addPersonAsked(1);
            trip.removePersonAvailable(1);
            updateTrip(trip);
            showToast({
              message: "Une Aide vous a bien été retirée",
              bgColor: colors.yellow[50],
              textColor: colors.yellow[500],
              duration: 3000,
            });
          },
        },
      ],
    );
  };

  const handleAddingCurrentPosition = () => {
    if (!!userLocationLoading) return;
    _addingCurrentPosInTrip();
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
            _addingCurrentPosInTrip();
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
            _addingCurrentPosInTrip();
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

  //TODO: ajouter toast quand ajoute position actuelle
  //TODO: verif notif proximite -> si dans rayon envoie une notification
  //TODO: ajouter une methode dans trip "priximityNotificationEnabled" qui verifie si les notifications de proximite sont activée
  //TODO: ajouter une methode dans trip qui renvoie la range de la notification de proximite current

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
          {!!trip.personAskingAvailable && trip.personAskingAvailable > 0 && (
            <OutlineButton
              content="Retirer 1 Aide"
              prependIcon={
                <ExpoIcon name="person-remove-alt-1" size={20}></ExpoIcon>
              }
              onPress={handleRemovePersonAsking}
            ></OutlineButton>
          )}
          {!trip.ended && (
            <OutlineButton
              content="Ajouter votre position actuelle"
              style={{ opacity: userLocationLoading ? 0.5 : 1 }}
              prependIcon={
                userLocationLoading ? (
                  <ActivityIndicator></ActivityIndicator>
                ) : (
                  <ExpoIcon name="my-location" size={20}></ExpoIcon>
                )
              }
              onPress={handleAddingCurrentPosition}
            ></OutlineButton>
          )}
          {!trip.ended && (
            <OutlineButton
              content="Vérifier Notification Proximité"
              style={{ opacity: userLocationLoading ? 0.5 : 1 }}
              prependIcon={
                userLocationLoading ? (
                  <ActivityIndicator></ActivityIndicator>
                ) : (
                  <ExpoIcon name="notifications-active" size={20}></ExpoIcon>
                )
              }
              onPress={handleAddingCurrentPosition}
            ></OutlineButton>
          )}
          {!trip.ended && (
            <OutlineButton
              content="Donner sa langue au chat"
              prependIcon={<ExpoIcon name="location-on" size={20}></ExpoIcon>}
              onPress={handleAbandonTrip}
            ></OutlineButton>
          )}
          {!trip.ended && (
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
          {trip.ended && (
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

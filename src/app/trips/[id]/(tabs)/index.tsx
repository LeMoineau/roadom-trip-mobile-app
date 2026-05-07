import { router, useLocalSearchParams } from "expo-router";
import { ScrollView, Text, View } from "react-native";
import { AllIconNames } from "../../../../components/common/icons/ExpoIcon";
import NoMoreStepItem from "../../../../components/common/items/NoMoreStepItem";
import ProximityNotificationItem from "../../../../components/common/items/ProximityNotificationItem";
import DescriptionSection from "../../../../components/common/misc/DescriptionSection";
import Divider from "../../../../components/common/misc/Divider";
import LoadingPage from "../../../../components/common/misc/LoadingPage";
import MapTimeline from "../../../../components/common/misc/MapTimeline";
import NextStepItem from "../../../../components/features/trip/NextStepItem";
import StartingStepItem from "../../../../components/features/trip/StartingStepItem";
import StepItem from "../../../../components/features/trip/StepItem";
import { colors } from "../../../../constants/style/colors";
import useUserLocation from "../../../../hooks/common/use-user-location";
import useTripRepository from "../../../../hooks/features/trip/useTripRepository";
import { GeoPoint } from "../../../../shared/models/GeoPoint.model";
import { ArrayUtils } from "../../../../shared/utils/array.utils";
import { DateUtils } from "../../../../shared/utils/date.utils";

export default function TripPage() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const { trip, updateTrip } = useTripRepository({ id });

  const { getLocation } = useUserLocation();

  if (!!!trip) {
    return <LoadingPage></LoadingPage>;
  }

  return (
    <View style={{ flex: 1 }}>
      <ScrollView>
        <View style={{ flex: 1, padding: 20, gap: 20 }}>
          <DescriptionSection
            items={[
              ...[trip.getStatusStyle()].map(({ label, icon, color }) => ({
                label: "Statut",
                value: label,
                icon,
                color,
              })),
              ...ArrayUtils.itemOrVoid(
                (!!!trip.startingAt || trip.ended) && {
                  label: "Création",
                  value: DateUtils.toHHmmDDMMYY(new Date(trip.createdAt)),
                },
              ),
              ...ArrayUtils.itemOrVoid(
                !!trip.startingAt && {
                  label: "Début",
                  value: DateUtils.toHHmmDDMMYY(new Date(trip.startingAt)),
                },
              ),
              ...ArrayUtils.itemOrVoid(
                !!trip.endingAt && {
                  label: "Fin",
                  value: DateUtils.toHHmmDDMMYY(new Date(trip.endingAt)),
                },
              ),
              ...ArrayUtils.itemOrVoid(
                !!trip.personAskingAvailable && {
                  label: "Aide disponible",
                  value: trip.personAskingAvailable! + "",
                  icon: "person-2" as AllIconNames,
                  color: "yellow",
                },
              ),
            ]}
          ></DescriptionSection>
          <Divider style={{ marginTop: 5 }}></Divider>
          <ProximityNotificationItem
            currentProximityNotif={trip.getActualProximityNotification()}
          ></ProximityNotificationItem>
          <Divider style={{ marginBottom: 10 }}></Divider>
          <MapTimeline
            spaceBetweenEachDots={30}
            dots={[
              {
                desc: (
                  <View style={{ marginTop: -5 }}>
                    <Text
                      style={{
                        fontSize: 15,
                        fontWeight: 600,
                        color: colors.gray[800],
                      }}
                    >
                      {trip.startingPos.label}
                    </Text>
                    <Text style={{ color: colors.gray[600], fontSize: 12 }}>
                      {trip.startingPos.lat.toFixed(3)},{" "}
                      {trip.startingPos.lon.toFixed(3)}
                    </Text>
                  </View>
                ),
              },
              {
                desc: (
                  <StartingStepItem
                    started={trip.started}
                    startingDate={new Date(trip.startingAt)}
                    onPress={() => {
                      if (trip.started) return;
                      trip.start();
                      getLocation().then((res) => {
                        if (!!res) {
                          trip.addPointInTraveledRoute(
                            new GeoPoint({
                              lat: res.coords.latitude,
                              lon: res.coords.longitude,
                            }),
                          );
                          updateTrip(trip);
                        }
                      });
                      updateTrip(trip);
                    }}
                  ></StartingStepItem>
                ),
              },
              ...trip.steps
                .filter((s) => !!s.reach)
                .map((s, index) => ({
                  desc: (
                    <StepItem
                      step={s}
                      onPress={() => {
                        router.push({
                          pathname: "/trips/[id]/steps/[index]",
                          params: { id: trip.id, index },
                        });
                      }}
                    ></StepItem>
                  ),
                })),
              ...ArrayUtils.itemOrVoid(
                !!trip.getNextStep() &&
                  trip.started && {
                    desc: (
                      <NextStepItem
                        step={trip.getNextStep()!}
                        onOpenNextStep={(step) => {
                          step.reached();
                          updateTrip(trip);
                        }}
                      ></NextStepItem>
                    ),
                  },
              ),
            ]}
          ></MapTimeline>
          {!!!trip.getNextStep() && <NoMoreStepItem></NoMoreStepItem>}
          <View style={{ height: 150 }}></View>
        </View>
      </ScrollView>
    </View>
  );
}

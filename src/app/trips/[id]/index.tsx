import { router } from "expo-router";
import { ScrollView, Text, View } from "react-native";
import OutlineButton from "../../../components/common/buttons/OutlineButton";
import ExpoIcon, {
  AllIconNames,
} from "../../../components/common/icons/ExpoIcon";
import NoMoreStepItem from "../../../components/common/items/NoMoreStepItem";
import NoTripYetItem from "../../../components/common/items/NoTripYetItem";
import ProximityNotificationItem from "../../../components/common/items/ProximityNotificationItem";
import DescriptionSection from "../../../components/common/misc/DescriptionSection";
import Divider from "../../../components/common/misc/Divider";
import MapTimeline from "../../../components/common/misc/MapTimeline";
import NextStepItem from "../../../components/features/trip/NextStepItem";
import StepItem from "../../../components/features/trip/StepItem";
import { colors } from "../../../constants/style/colors";
import { ArrayUtils } from "../../../shared/utils/array.utils";
import { DateUtils } from "../../../shared/utils/date.utils";
import { useTripStore } from "../../../stores/features/trip/trip.store";

export default function TripPage() {
  const trip = useTripStore((state) => state.trip);
  const updateTrip = useTripStore((state) => state.updateTrip);

  if (!!!trip) {
    return (
      <View style={{ padding: 20, paddingTop: 0 }}>
        <NoTripYetItem></NoTripYetItem>
      </View>
    );
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
              {
                label: "Date de début",
                value: DateUtils.toHHmmDDMMYY(new Date(trip.createdAt)),
              },
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
                !!trip.getNextStep() && {
                  desc: (
                    <NextStepItem
                      step={trip.getNextStep()!}
                      onOpenNextStep={(step) => {
                        step.dto.reach = true;
                        updateTrip(trip);
                      }}
                    ></NextStepItem>
                  ),
                },
              ),
            ]}
          ></MapTimeline>
          {!!!trip.getNextStep() && <NoMoreStepItem></NoMoreStepItem>}
          <Divider style={{ marginTop: 20 }}></Divider>
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

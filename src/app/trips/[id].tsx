import { ScrollView, Text, View } from "react-native";
import NoMoreStepItem from "../../components/common/items/NoMoreStepItem";
import NoTripYetItem from "../../components/common/items/NoTripYetItem";
import ProximityNotificationItem from "../../components/common/items/ProximityNotificationItem";
import TagItem from "../../components/common/items/TagItem";
import Divider from "../../components/common/misc/Divider";
import MapTimeline from "../../components/common/misc/MapTimeline";
import NextStepItem from "../../components/features/trip/NextStepItem";
import StepItem from "../../components/features/trip/StepItem";
import { colors } from "../../constants/style/colors";
import { DateUtils } from "../../shared/utils/date.utils";
import { useTripStore } from "../../stores/features/trip/trip.store";

export default function TripPage() {
  const trip = useTripStore((state) => state.trip);
  const updateTrip = useTripStore((state) => state.updateTrip);

  if (!!!trip) {
    return <NoTripYetItem></NoTripYetItem>;
  }

  return (
    <View style={{ flex: 1 }}>
      <ScrollView>
        <View style={{ flex: 1, padding: 20, gap: 20 }}>
          <View
            style={{
              display: "flex",
              flexDirection: "column",
              gap: 10,
            }}
          >
            <View
              style={{
                display: "flex",
                flexDirection: "row",
                alignItems: "center",
                gap: 10,
              }}
            >
              <Text>Statut</Text>
              <TagItem
                text="En cours"
                bgColor={colors.green[100]}
                textColor={colors.green[500]}
                iconName="clock-o"
              ></TagItem>
            </View>
            <View
              style={{
                display: "flex",
                flexDirection: "row",
                alignItems: "center",
                gap: 10,
              }}
            >
              <Text>Date de début</Text>
              <TagItem
                text={DateUtils.toHHmmDDMMYY(new Date(trip.createdAt))}
                bgColor={colors.yellow[100]}
                textColor={colors.yellow[500]}
              ></TagItem>
            </View>
          </View>
          <Divider style={{ marginTop: 5 }}></Divider>
          <ProximityNotificationItem trip={trip}></ProximityNotificationItem>
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
                .filter((s) => s.type !== "proximity-notification" && !!s.reach)
                .map((s) => ({
                  desc: <StepItem step={s}></StepItem>,
                })),
              ...(!!trip.getNextStep()
                ? [
                    {
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
                  ]
                : []),
            ]}
          ></MapTimeline>
          {!!!trip.getNextStep() && <NoMoreStepItem></NoMoreStepItem>}
          <Divider style={{ marginTop: 20 }}></Divider>
          <View style={{ height: 150 }}></View>
        </View>
      </ScrollView>
    </View>
  );
}

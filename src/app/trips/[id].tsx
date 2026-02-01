import { Text, View } from "react-native";
import ExpoIcon from "../../components/common/icons/ExpoIcon";
import NoTripYetItem from "../../components/common/items/NoTripYetItem";
import TagItem from "../../components/common/items/TagItem";
import Divider from "../../components/common/misc/Divider";
import MapTimeline from "../../components/common/misc/MapTimeline";
import { colors } from "../../constants/style/colors";
import useStoredTrip from "../../hooks/features/trip/useStoredTrip";

export default function TripPage() {
  const { trip } = useStoredTrip();

  if (!trip) {
    return <NoTripYetItem></NoTripYetItem>;
  }

  return (
    <View style={{ flex: 1, padding: 20, gap: 20 }}>
      <View style={{ display: "flex", flexDirection: "column", gap: 10 }}>
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
            text={trip.createdAt.toLocaleString()}
            bgColor={colors.gray[100]}
            textColor={colors.gray[700]}
            iconName="clock-o"
          ></TagItem>
        </View>
      </View>
      <Divider style={{ marginTop: 5 }}></Divider>
      <View style={{ display: "flex", flexDirection: "row", gap: 10 }}>
        <ExpoIcon
          name="notifications-on"
          size={20}
          style={{ color: colors.gray[800] }}
        ></ExpoIcon>
        <Text style={{ color: colors.gray[600] }}>
          Notification de proximité à 400km du point d&apos;arrivée
        </Text>
      </View>
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
                  {trip.startingPos.lat}, {trip.startingPos.lon}
                </Text>
              </View>
            ),
          },
          {
            desc: (
              <View
                style={{
                  padding: 10,
                  borderRadius: 10,
                  backgroundColor: colors.gray[50],
                  borderWidth: 1,
                  borderColor: colors.gray[200],
                  display: "flex",
                  flexDirection: "row",
                  alignItems: "center",
                  gap: 10,
                  paddingRight: 15,
                  flex: 1,
                }}
              >
                <View
                  style={{
                    flex: 1,
                    display: "flex",
                    flexDirection: "row",
                    alignItems: "flex-start",
                    gap: 10,
                  }}
                >
                  <ExpoIcon
                    name="check"
                    size={15}
                    style={{ color: colors.gray[800] }}
                  ></ExpoIcon>
                  <Text style={{ fontSize: 12, color: colors.gray[800] }}>
                    Le blason de la commune
                  </Text>
                </View>
                <ExpoIcon name="chevron-forward" size={20}></ExpoIcon>
              </View>
            ),
          },
          {
            desc: (
              <View
                style={{
                  padding: 10,
                  borderRadius: 10,
                  backgroundColor: colors.yellow[100],
                  borderWidth: 1,
                  borderColor: colors.yellow[300],
                  display: "flex",
                  flexDirection: "row",
                  alignItems: "center",
                  gap: 7,
                  paddingRight: 15,
                }}
              >
                <ExpoIcon
                  name="info-outline"
                  size={15}
                  style={{ color: colors.yellow[800] }}
                ></ExpoIcon>
                <Text style={{ fontSize: 12, color: colors.yellow[800] }}>
                  Prochain indice dans 2min
                </Text>
              </View>
            ),
          },
        ]}
      ></MapTimeline>
      <Divider style={{ marginTop: 5 }}></Divider>
    </View>
  );
}

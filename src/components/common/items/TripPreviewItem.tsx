import { Text, TouchableOpacity, View } from "react-native";
import { colors } from "../../../constants/style/colors";
import { Trip } from "../../../shared/models/Trip.model";
import TagItem from "../../common/items/TagItem";
import ExpoIcon from "../icons/ExpoIcon";
import Divider from "../misc/Divider";
import MapTimeline from "../misc/MapTimeline";

export default function TripPreviewItem({
  trip,
  onPress,
}: {
  trip: Trip;
  onPress?: () => void;
}) {
  return (
    <TouchableOpacity
      style={{
        borderWidth: 1,
        borderColor: colors.gray[200],
        borderRadius: 20,
        padding: 20,
        width: "100%",
        display: "flex",
        flexDirection: "column",
        gap: 20,
      }}
      activeOpacity={0.8}
      onPress={onPress}
    >
      <View
        style={{
          flex: 1,
          display: "flex",
          flexDirection: "row",
          overflow: "hidden",
          alignItems: "center",
          gap: 10,
        }}
      >
        <Text
          numberOfLines={1}
          style={{
            maxWidth: "50%",
            overflow: "hidden",
            textOverflow: "clip",
            fontSize: 17,
            fontWeight: 600,
            color: colors.black,
          }}
        >
          Voyage actuel
        </Text>
        <TagItem
          text="En cours"
          bgColor={colors.green[100]}
          textColor={colors.green[500]}
          iconName="clock-o"
        ></TagItem>
      </View>

      <Divider style={{ marginTop: -5, marginBottom: 5 }}></Divider>

      <MapTimeline
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
      <Divider></Divider>
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
    </TouchableOpacity>
  );
}

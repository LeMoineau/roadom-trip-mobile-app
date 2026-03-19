import { Text, TouchableOpacity, View } from "react-native";
import { colors } from "../../../constants/style/colors";
import { TripDto } from "../../../shared/types/dto/trip/Trip.dto";
import Divider from "../misc/Divider";
import MapTimeline from "../misc/MapTimeline";
import NextStepDelayItem from "./NextStepDelayItem";

export default function TripPreviewItem({
  trip,
  onPress,
}: {
  trip: TripDto;
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
          display: "flex",
          flexDirection: "row",
          alignItems: "center",
          gap: 10,
          width: "100%",
        }}
      >
        <Text
          numberOfLines={1}
          style={{
            overflow: "hidden",
            textOverflow: "clip",
            fontSize: 17,
            fontWeight: 600,
            color: colors.black,
          }}
        >
          Voyage actuel
        </Text>
        {/* <TagItem
          text="En cours"
          bgColor={colors.green[100]}
          textColor={colors.green[500]}
          iconName="clock-o"
        ></TagItem> */}
      </View>

      <Divider style={{ marginTop: -5, marginBottom: 5 }}></Divider>

      <MapTimeline
        spaceBetweenEachDots={20}
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
              <View style={{ marginTop: 0 }}>
                <Text
                  style={{
                    fontSize: 15,
                    fontWeight: 600,
                    color: colors.gray[800],
                  }}
                >
                  {trip.endingPos.label}
                </Text>
                <Text style={{ color: colors.gray[600], fontSize: 12 }}>
                  ???, ???
                </Text>
              </View>
              // <View
              //   style={{
              //     padding: 10,
              //     borderRadius: 10,
              //     backgroundColor: colors.yellow[100],
              //     borderWidth: 1,
              //     borderColor: colors.yellow[300],
              //     display: "flex",
              //     flexDirection: "row",
              //     alignItems: "center",
              //     gap: 7,
              //     paddingRight: 15,
              //   }}
              // >
              //   <ExpoIcon
              //     name="info-outline"
              //     size={15}
              //     style={{ color: colors.yellow[800] }}
              //   ></ExpoIcon>
              //   <Text style={{ fontSize: 12, color: colors.yellow[800] }}>
              //     Prochain indice dans 2min
              //   </Text>
              // </View>
            ),
          },
        ]}
      ></MapTimeline>
      {/* <Divider></Divider> */}
      {/* <View
        style={{
          display: "flex",
          flexDirection: "row",
          gap: 10,
        }}
      >
        <ExpoIcon
          name="notifications-on"
          size={20}
          style={{ color: colors.gray[800] }}
        ></ExpoIcon>
        <Text style={{ flex: 1, width: "100%", color: colors.gray[600] }}>
          Notification de proximité à 400km du point d&apos;arrivée
        </Text>
      </View> */}
      <NextStepDelayItem trip={trip}></NextStepDelayItem>
    </TouchableOpacity>
  );
}

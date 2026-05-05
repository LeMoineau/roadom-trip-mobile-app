import { useLocalSearchParams } from "expo-router";
import { ScrollView, Text, View } from "react-native";
import NoTripYetItem from "../../../../../components/common/items/NoTripYetItem";
import StatItem from "../../../../../components/features/recap/StatItem";
import { colors } from "../../../../../constants/style/colors";
import useTripRepository from "../../../../../hooks/features/trip/useTripRepository";
import { DateUtils } from "../../../../../shared/utils/date.utils";

export default function TripStatsRecapPage() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const { trip } = useTripRepository({ id });

  if (!!!trip) {
    return <NoTripYetItem></NoTripYetItem>;
  }

  //TODO: ne colorer que les plus gros nombres

  return (
    <View style={{ flex: 1 }}>
      <ScrollView style={{ flex: 1, paddingHorizontal: 20, paddingTop: 20 }}>
        <Text style={{ fontSize: 35, fontWeight: 600 }}>Statistiques</Text>
        <View style={{ height: 30 }}></View>
        <View style={{ display: "flex", flexDirection: "row", gap: 10 }}>
          <StatItem
            label="Km Parcourus"
            value="530"
            color={colors.blue}
          ></StatItem>
          <StatItem
            label="Aides demandées"
            value="3"
            valueIcon="person"
            color={colors.amber}
          ></StatItem>
        </View>
        <View style={{ height: 10 }}></View>
        {trip.endingAt && (
          <StatItem
            label="Durée du Road-Trip"
            value={DateUtils.diffHumanlyReadable(
              new Date(trip.createdAt),
              new Date(trip.endingAt),
            )}
            color={colors.gray}
          ></StatItem>
        )}
        <View style={{ height: 10 }}></View>
        <View style={{ display: "flex", flexDirection: "row", gap: 10 }}>
          <StatItem
            label="Nombre d'étapes ouvertes"
            value={trip.steps.filter((s) => s.reach).length + ""}
            valueIcon="location"
            color={colors.gray}
          ></StatItem>
          <StatItem
            label="Challenges remportés"
            value={
              trip.steps.filter((s) => s.reach && s.stepType === "Challenge")
                .length + ""
            }
            color={colors.green}
          ></StatItem>
        </View>
      </ScrollView>
    </View>
  );
}

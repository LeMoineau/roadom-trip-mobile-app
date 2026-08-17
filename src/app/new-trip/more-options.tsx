import { router, useLocalSearchParams } from "expo-router";
import { useEffect } from "react";
import { ScrollView, View } from "react-native";
import FloatingButton from "../../components/common/buttons/FloatingButton";
import OutlineButton from "../../components/common/buttons/OutlineButton";
import ExpoIcon from "../../components/common/icons/ExpoIcon";
import { colors } from "../../constants/style/colors";
import { useNewTripConfigStore } from "../../stores/features/new-trip/new-trip-config.store";

export default function MoreOptionsPage() {
  const { distanceMin: paramDistanceMin } = useLocalSearchParams<{
    distanceMin?: string;
  }>();

  const { distanceMin, updateDistance } = useNewTripConfigStore();

  useEffect(() => {
    if (!!paramDistanceMin) {
      updateDistance(
        "min",
        paramDistanceMin !== "null" ? parseInt(paramDistanceMin) : undefined,
      );
    }
  }, [paramDistanceMin]);

  const handlePressingDistanceMinBtn = () => {
    router.push({
      pathname: "/new-trip/distance-selector",
      params: {
        defaultValue: distanceMin,
        callbackUrl: "/new-trip/more-options",
        valueKey: "distanceMin",
        displayTitle: "Combien de km voulez-vous au moins parcourir ?",
      },
    });
  };

  const handleSubmit = () => {
    router.dismissTo({
      pathname: "/new-trip",
      params: {},
    });
  };

  return (
    <View
      style={{
        flex: 1,
        paddingHorizontal: 20,
        paddingTop: 20,
        justifyContent: "flex-start",
        alignItems: "flex-start",
        gap: 20,
      }}
    >
      <ScrollView
        style={{
          flex: 1,
          width: "100%",
          gap: 20,
        }}
      >
        <OutlineButton
          content={distanceMin ? `${distanceMin} km` : "Distance min"}
          prependIcon={
            <ExpoIcon
              name="remove-road"
              size={20}
              style={{
                color: distanceMin ? colors.black : colors.gray[500],
              }}
            ></ExpoIcon>
          }
          appendIcon={<ExpoIcon name="chevron-forward" size={20}></ExpoIcon>}
          textStyle={{
            color: distanceMin ? colors.black : colors.gray[500],
          }}
          onPress={handlePressingDistanceMinBtn}
        ></OutlineButton>
        <View style={{ height: 150 }}></View>
      </ScrollView>
      <FloatingButton
        content="Valider"
        appendIcon={
          <ExpoIcon
            name="arrow-forward"
            size={20}
            style={{ color: colors.white }}
          ></ExpoIcon>
        }
        onPress={handleSubmit}
      ></FloatingButton>
    </View>
  );
}

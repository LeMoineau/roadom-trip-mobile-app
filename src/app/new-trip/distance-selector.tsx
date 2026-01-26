import {
  router,
  useGlobalSearchParams,
  useLocalSearchParams,
} from "expo-router";
import { useState } from "react";
import { Text, TextInput, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import FloatingButton from "../../components/common/buttons/FloatingButton";
import IconButton from "../../components/common/buttons/IconButton";
import ExpoIcon from "../../components/common/icons/ExpoIcon";
import { colors } from "../../constants/style/colors";

const DEFAULT_DISTANCE = 50;

export default function DistanceSelector() {
  const [distance, setDistance] = useState(`${DEFAULT_DISTANCE}`);
  const params = useLocalSearchParams();
  const glob = useGlobalSearchParams();

  const changeDistance = (direction: "remove" | "add", val: number = 50) => {
    let currentDistance = parseInt(distance);
    if (direction === "remove") {
      currentDistance -= val;
      if (currentDistance < 0) currentDistance = 0;
    } else {
      currentDistance += val;
    }
    setDistance(`${currentDistance}`);
  };

  return (
    <SafeAreaView
      style={{ flex: 1, paddingHorizontal: 20, paddingTop: 20, gap: 20 }}
    >
      <Text style={{ fontSize: 25 }}>
        Combien de km êtes-vous prêt à parcourir pour cette aventure ?
      </Text>
      <View
        style={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <IconButton
          iconName="remove"
          onPress={() => changeDistance("remove")}
        ></IconButton>
        <View
          style={{
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
            gap: 10,
          }}
        >
          <TextInput
            style={{
              backgroundColor: colors.white,
              borderWidth: 1,
              borderColor: colors.gray[200],
              padding: 20,
              borderRadius: 20,
              fontSize: 20,
            }}
            value={distance}
            onChangeText={(text) => {
              try {
                setDistance(`${parseInt(text)}`);
              } catch (err) {
                console.error(`distance input ${text} is not a number`);
              }
            }}
            placeholder="50"
          ></TextInput>
          <Text style={{ fontSize: 20 }}>km</Text>
        </View>
        <IconButton
          iconName="add"
          onPress={() => changeDistance("add")}
        ></IconButton>
      </View>
      <FloatingButton
        content="Valider"
        appendIcon={
          <ExpoIcon
            name="arrow-forward"
            size={20}
            style={{ color: colors.white }}
          ></ExpoIcon>
        }
        onPress={() => {
          console.log(params, glob);
          router.back();
          router.setParams({
            distanceTrip: parseInt(distance),
          });
          router.dismissTo({
            pathname: "/new-trip",
            params: {
              distanceTrip: parseInt(distance),
            },
          });
        }}
      ></FloatingButton>
    </SafeAreaView>
  );
}

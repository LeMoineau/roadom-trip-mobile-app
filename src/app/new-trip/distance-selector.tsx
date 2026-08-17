import { RelativePathString, router, useLocalSearchParams } from "expo-router";
import { useState } from "react";
import { Text, TextInput, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import FloatingButton from "../../components/common/buttons/FloatingButton";
import IconButton from "../../components/common/buttons/IconButton";
import ExpoIcon from "../../components/common/icons/ExpoIcon";
import { colors } from "../../constants/style/colors";

const DEFAULT_DISTANCE = 50;

/**
 * Take severals query param to return a distance from the user
 * @param defaultValue default distance
 * @param posValueKey key of the wanted returned query param which will contain the user selected distance
 * @param callbackUrl callback url where send result query param
 * @param displayTitle title to display above user distance selector
 * @param required if not define, the user can remove his selection. If removed, it will return the string "null"
 */
export default function DistanceSelector() {
  const { defaultValue, callbackUrl, valueKey, displayTitle, required } =
    useLocalSearchParams<{
      defaultValue?: string;
      callbackUrl: string;
      valueKey: string;
      displayTitle?: string;
      required?: string;
    }>();
  const [distance, setDistance] = useState(
    `${defaultValue && defaultValue.length > 0 ? defaultValue : DEFAULT_DISTANCE}`,
  );

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

  const handleCancel = () => {
    router.dismissTo({
      pathname: callbackUrl as RelativePathString,
      params: { [valueKey]: "null" },
    });
  };

  const handleSubmit = () => {
    const newDistance = parseInt(distance);
    if (!isNaN(newDistance)) {
      router.dismissTo({
        pathname: callbackUrl as RelativePathString,
        params: { [valueKey]: newDistance },
      });
    }
  };

  return (
    <SafeAreaView
      style={{ flex: 1, paddingHorizontal: 20, paddingTop: 0, gap: 20 }}
    >
      <Text style={{ fontSize: 25 }}>{displayTitle?.trim()}</Text>
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
            justifyContent: "center",
            gap: 10,
            paddingHorizontal: 20,
            flex: 1,
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
              maxWidth: "70%",
              textAlign: "center",
            }}
            value={distance}
            onChangeText={(text) => {
              try {
                const newDistance = parseInt(text);
                setDistance(`${isNaN(newDistance) ? "" : newDistance}`);
              } catch (err) {
                console.error(`distance input ${text} is not a number`);
              }
            }}
            placeholder={defaultValue}
          ></TextInput>
          <Text style={{ fontSize: 20 }}>km</Text>
        </View>
        <IconButton
          iconName="add"
          onPress={() => changeDistance("add")}
        ></IconButton>
      </View>
      {!!!required && (
        <FloatingButton
          content="Effacer"
          bgColor={colors.gray[400]}
          style={{ right: 170 }}
          appendIcon={
            <ExpoIcon
              name="close"
              size={20}
              style={{ color: colors.white }}
            ></ExpoIcon>
          }
          onPress={handleCancel}
        ></FloatingButton>
      )}
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
    </SafeAreaView>
  );
}

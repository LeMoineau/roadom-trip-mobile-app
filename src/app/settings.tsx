import { useState } from "react";
import { Button, View } from "react-native";
import { colors } from "../constants/style/colors";

export default function newTripPage() {
  const [_, setTheme] = useState("light");

  return (
    <>
      <View
        style={{
          flex: 1,
          justifyContent: "flex-start",
          alignItems: "center",
        }}
      >
        <Button
          title={"Coucou"}
          color={colors.primary}
          onPress={() => {
            // const scheme = Colors.getScheme();
            // console.log(scheme);
            // if (scheme === "light") {
            //   Colors.setScheme("dark");
            // } else {
            //   Colors.setScheme("light");
            // }
            // setTheme(Colors.getScheme());
          }}
        ></Button>
      </View>
    </>
  );
}

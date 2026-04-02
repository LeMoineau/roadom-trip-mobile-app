import { ScrollView, View } from "react-native";
import OutlineButton from "../../../../components/common/buttons/OutlineButton";
import ExpoIcon from "../../../../components/common/icons/ExpoIcon";
import { colors } from "../../../../constants/style/colors";

export default function TripMapTab() {
  return (
    <View style={{ flex: 1 }}>
      <ScrollView>
        <View style={{ flex: 1, padding: 20, gap: 20 }}>
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

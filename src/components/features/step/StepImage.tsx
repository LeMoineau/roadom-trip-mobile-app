import { Image } from "expo-image";
import { useState } from "react";
import { TouchableOpacity } from "react-native";
import ImageView from "react-native-image-viewing";
import { colors } from "../../../constants/style/colors";
import IconButton from "../../common/buttons/IconButton";
export default function StepImage({
  uri,
  onPressDelete,
}: {
  uri: string;
  onPressDelete?: (uri: string) => void;
}) {
  const [visible, setIsVisible] = useState(false);

  return (
    <TouchableOpacity
      activeOpacity={0.8}
      onPress={() => {
        setIsVisible(true);
      }}
    >
      <Image source={{ uri }} style={{ height: 200, borderRadius: 10 }} />
      <IconButton
        iconName="close"
        color={colors.gray[400]}
        style={{
          position: "absolute",
          backgroundColor: colors.gray[200],
          borderColor: colors.gray[300],
          padding: 5,
          top: -5,
          right: -5,
        }}
        iconSize={20}
        onPress={() => {
          onPressDelete && onPressDelete(uri);
        }}
      ></IconButton>
      <ImageView
        images={[{ uri }]}
        imageIndex={0}
        visible={visible}
        onRequestClose={() => setIsVisible(false)}
        swipeToCloseEnabled={true} // Fermer en glissant vers le bas
        doubleTapToZoomEnabled={true} // Zoom au double clic
      />
    </TouchableOpacity>
  );
}

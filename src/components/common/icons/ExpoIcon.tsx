import { FontAwesome, Ionicons, MaterialIcons } from "@expo/vector-icons";
import { StyleProp, TextStyle } from "react-native";

type IoniconsNames = keyof typeof Ionicons.glyphMap;
type MaterialIconsNames = keyof typeof MaterialIcons.glyphMap;
type FontAwesomeNames = keyof typeof FontAwesome.glyphMap;

export type AllIconNames =
  | MaterialIconsNames
  | FontAwesomeNames
  | IoniconsNames;

export default function ExpoIcon({
  name,
  size,
  style,
}: {
  name: AllIconNames;
  size?: number;
  style?: StyleProp<TextStyle>;
}) {
  return (
    <>
      {name in Ionicons.glyphMap ? (
        <Ionicons
          size={size}
          name={name as IoniconsNames}
          style={style}
        ></Ionicons>
      ) : name in MaterialIcons.glyphMap ? (
        <MaterialIcons
          name={name as MaterialIconsNames}
          size={size}
          style={style}
        ></MaterialIcons>
      ) : (
        <FontAwesome
          name={name as FontAwesomeNames}
          size={size}
          style={style}
        ></FontAwesome>
      )}
    </>
  );
}

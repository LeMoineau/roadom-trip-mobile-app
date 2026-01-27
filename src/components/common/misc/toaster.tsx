import Color from "color";
import { useEffect } from "react";
import { Pressable, Text } from "react-native";
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from "react-native-reanimated";
import { colors } from "../../../constants/style/colors";

const DEFAULT_TRANSLATE_Y = -20;
const HIDDEN_OPACITY = 0;
const SHOWED_OPACITY = 1;

export default function Toaster({
  message,
  show,
  duration = 1000,
  topOffset = 0,
  bg = colors.red[400],
  textColor = colors.white,
  onHiding,
}: {
  message: string;
  show: boolean;
  duration?: number;
  topOffset?: number;
  bg?: string;
  textColor?: string;
  onHiding?: () => void;
}) {
  const offset = useSharedValue<number>(topOffset + DEFAULT_TRANSLATE_Y);
  const opacity = useSharedValue<number>(HIDDEN_OPACITY);

  const style = useAnimatedStyle(() => ({
    opacity: opacity.value,
    transform: [{ translateY: offset.value }],
    pointerEvents: show ? "auto" : "none",
  }));

  const isHidden = () => {
    return opacity.value === HIDDEN_OPACITY;
  };

  const hide = () => {
    if (!isHidden()) {
      onHiding && onHiding();
      offset.value = withTiming(topOffset + DEFAULT_TRANSLATE_Y, {
        duration: 700,
      });
      opacity.value = withTiming(HIDDEN_OPACITY, { duration: 700 });
    }
  };

  useEffect(() => {
    if (show) {
      offset.value = withTiming(topOffset, { duration: 300 });
      opacity.value = withTiming(SHOWED_OPACITY, { duration: 300 });
      setTimeout(() => {
        hide();
      }, duration);
    }
  }, [show]);

  return (
    <Animated.View
      style={[
        style,
        { position: "absolute", top: 0, left: 0, padding: 10, width: "100%" },
      ]}
    >
      <Pressable
        onPress={() => {
          hide();
        }}
        style={{ borderRadius: 10, backgroundColor: bg, padding: 20 }}
      >
        <Text
          style={{
            color:
              textColor ??
              (Color(bg).isDark() ? "white" : Color(bg).darken(0.71).string()),
            textAlign: "left",
          }}
        >
          {message}
        </Text>
      </Pressable>
    </Animated.View>
  );
}

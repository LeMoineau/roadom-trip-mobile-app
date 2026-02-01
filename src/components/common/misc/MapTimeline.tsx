import { ColorValue, View } from "react-native";
import { colors } from "../../../constants/style/colors";

interface MapTimelineDotProps {
  color?: ColorValue;
  desc?: React.ReactNode;
  last?: boolean;
  gapBetweenItemsAndDesc?: number;
}

interface MapTimelineSeparatorProps {
  color?: ColorValue;
  desc?: React.ReactNode;
  height?: number;
  gapBetweenItemsAndDesc?: number;
}

/**
 * Dot component of MapTimeline
 * @returns
 */
function MapTimelineDot({
  color = colors.gray[800],
  desc,
  last,
  gapBetweenItemsAndDesc = 10,
}: MapTimelineDotProps) {
  return (
    <View
      style={{
        display: "flex",
        flexDirection: "row",
        width: "100%",
        gap: gapBetweenItemsAndDesc,
      }}
    >
      <View
        style={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "flex-start",
          alignItems: "center",
        }}
      >
        <View
          style={{
            backgroundColor: colors.white,
            borderRadius: 20,
            width: 15,
            height: 15,
            borderWidth: 3,
            borderColor: color,
          }}
        ></View>
        {!last && (
          <View
            style={{
              flex: 1,
              width: 3,
              backgroundColor: color,
            }}
          ></View>
        )}
      </View>
      {desc}
    </View>
  );
}

/**
 * Line separator between dots of MapTimeline
 * @returns
 */
function MapTimelineSeparator({
  color,
  desc,
  height = 10,
  gapBetweenItemsAndDesc = 10,
}: MapTimelineSeparatorProps) {
  return (
    <View
      style={{
        display: "flex",
        flexDirection: "row",
        width: "100%",
        gap: gapBetweenItemsAndDesc,
      }}
    >
      <View
        style={{
          display: "flex",
          width: 15,
          flexDirection: "row",
          justifyContent: "center",
        }}
      >
        <View
          style={{
            height,
            width: 3,
            backgroundColor: color,
          }}
        ></View>
      </View>
      {desc}
    </View>
  );
}

/**
 * Main component of the MapTimeline, which organise dots and separators.
 * @returns
 */
export default function MapTimeline({
  dots,
  spaceBetweenEachDots = 10,
  separators = [],
  color = colors.gray[800],
  gapBetweenItemsAndDesc = 10,
}: {
  dots: MapTimelineDotProps[];
  spaceBetweenEachDots?: number;
  separators?: MapTimelineSeparatorProps[];
  color?: ColorValue;
  gapBetweenItemsAndDesc?: number;
}) {
  return (
    <View
      style={{
        display: "flex",
        flexDirection: "row",
        boxSizing: "border-box",
      }}
    >
      <View
        style={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          boxSizing: "border-box",
          flex: 1,
        }}
      >
        {dots.map((props, index) => {
          const last = props.last ?? index === dots.length - 1;
          return (
            <>
              <MapTimelineDot
                key={`dots-${index}`}
                color={color}
                gapBetweenItemsAndDesc={gapBetweenItemsAndDesc}
                last={last}
                {...props}
              ></MapTimelineDot>
              {!last && spaceBetweenEachDots > 0 && (
                <MapTimelineSeparator
                  key={`separator-${index}`}
                  height={spaceBetweenEachDots}
                  color={color}
                  gapBetweenItemsAndDesc={gapBetweenItemsAndDesc}
                  {...(separators.length > index ? separators[index] : {})}
                ></MapTimelineSeparator>
              )}
            </>
          );
        })}
      </View>
    </View>
  );
}

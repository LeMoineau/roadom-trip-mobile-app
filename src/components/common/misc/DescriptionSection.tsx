import { Text, View } from "react-native";
import { colors } from "../../../constants/style/colors";
import { AllIconNames } from "../icons/ExpoIcon";
import TagItem from "../items/TagItem";

export default function DescriptionSection({
  items,
}: {
  items: {
    label: string;
    value: string;
    icon?: AllIconNames;
    color?: string;
  }[];
}) {
  return (
    <View
      style={{
        display: "flex",
        flexDirection: "column",
        gap: 10,
      }}
    >
      {items.map((item, index) => (
        <View
          style={{
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
            gap: 10,
          }}
          key={index}
        >
          <Text>{item.label}</Text>
          <TagItem
            text={item.value}
            bgColor={(colors as any)[item.color ?? "gray"][100]}
            textColor={(colors as any)[item.color ?? "gray"][500]}
            iconName={item.icon}
          ></TagItem>
        </View>
      ))}
    </View>
  );
}

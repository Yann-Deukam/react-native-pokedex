import React from "react";
import { View, ViewProps, ViewStyle } from "react-native";

type Props = ViewProps & {
  gap?: number;
};

export default function Row({ style, gap, ...rest }: Props) {
  return (
    <View style={[rowStyle, style, gap ? { gap } : undefined]} {...rest} />
  );
}

const rowStyle: ViewStyle = {
  flex: 0,
  flexDirection: "row",
  alignItems: "center",
};

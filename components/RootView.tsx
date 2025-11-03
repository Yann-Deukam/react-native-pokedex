import { useThemeColors } from "@/hooks/useThemeColors";
import React from "react";
import { ViewProps, ViewStyle } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

type props = ViewProps;

export default function RootView({ style, ...rest }: props) {
  const colors = useThemeColors();
  return (
    <SafeAreaView
      style={[RootStyle, { backgroundColor: colors.tint }]}
      {...rest}
    />
  );
}

const RootStyle = {
  flex: 1,
  padding: 8,
} satisfies ViewStyle;

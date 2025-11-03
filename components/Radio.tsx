import { useThemeColors } from "@/hooks/useThemeColors";
import React from "react";
import { StyleSheet, View } from "react-native";

type Props = {
  checked?: boolean;
};

export default function Radio({ checked }: Props) {
  const colors = useThemeColors();
  return (
    <View style={[styles.radio, { borderColor: colors.tint }]}>
      {checked && (
        <View style={[styles.radioInner, { backgroundColor: colors.tint }]} />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  radio: {
    width: 16,
    height: 16,
    borderRadius: 14,
    borderStyle: "solid",
    borderWidth: 2,
    justifyContent: "center",
    alignItems: "center",
  },
  radioInner: {
    borderRadius: 8,
    width: 8,
    height: 8,
  },
});

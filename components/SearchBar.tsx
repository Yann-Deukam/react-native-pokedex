import { useThemeColors } from "@/hooks/useThemeColors";
import React from "react";
import { Image, StyleSheet, TextInput } from "react-native";
import Row from "./Row";

type Props = {
  value?: string;
  onChange?: (s: string) => void;
};

export default function SearchBar({ value, onChange }: Props) {
  const colors = useThemeColors();

  return (
    <Row
      gap={8}
      style={[
        styles.wrapper,
        {
          backgroundColor: colors.grayWhite, // light background
          paddingHorizontal: 12,
        },
      ]}
    >
      <Image
        source={require("@/assets/images/search.png")}
        style={{
          width: 16,
          height: 16,
          marginRight: 8,
          tintColor: colors.grayMedium,
        }}
        resizeMode="contain"
      />
      <TextInput
        style={[styles.input, { color: colors.grayWhite }]} // ✅ dark text color
        value={value}
        onChangeText={onChange}
        placeholder="Search Pokémon"
        placeholderTextColor={colors.grayMedium} // ✅ visible placeholder
      />
    </Row>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    borderRadius: 8,
    height: 40,
  },
  input: {
    flex: 1,
    fontSize: 12,
    height: 16,
    paddingVertical: 8,
  },
});

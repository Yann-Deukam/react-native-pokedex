import { useThemeColors } from "@/hooks/useThemeColors";
import React from "react";
import { Image, StyleSheet, View, ViewStyle } from "react-native";
import Card from "../card";
import ThemeText from "../themeText";

type Props = {
  style?: ViewStyle;
  id: number;
  name: string;
};

export default function PokemonCard({ style, id, name }: Props) {
  const colors = useThemeColors();

  return (
    <Card style={[style, styles.card]}>
      {/* Shadow background */}
      <View
        style={[styles.shadow, { backgroundColor: colors.grayBackground }]}
      />

      {/* ID in top-right */}
      <View style={styles.idContainer}>
        <ThemeText variant="caption" color="grayMedium">
          #{id.toString().padStart(3, "0")}
        </ThemeText>
      </View>

      {/* Pokémon image */}
      <Image
        source={{
          uri: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${id}.png`,
        }}
        style={styles.image}
        resizeMode="contain"
      />
      <ThemeText>{name}</ThemeText>
    </Card>
  );
}

const styles = StyleSheet.create({
  card: {
    position: "relative",
    alignItems: "center",
    padding: 4,
  },
  idContainer: {
    width: "100%",
    alignItems: "flex-end",
    zIndex: 3,
  },
  shadow: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    height: 44,
    borderRadius: 7,
  },
  image: {
    width: 72,
    height: 72,
    zIndex: 2,
  },
});

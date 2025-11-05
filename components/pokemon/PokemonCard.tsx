import { getPokemonArtworkUrl } from "@/functions/pokemon";
import { useThemeColors } from "@/hooks/useThemeColors";
import { Link } from "expo-router";
import React from "react";
import { Image, Pressable, StyleSheet, View, ViewStyle } from "react-native";
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
    <Link href={{ pathname: "/pokemon/[id]", params: { id: id } }} asChild>
      <Pressable
        android_ripple={{ color: colors.grayWhite, foreground: true }}
        style={style}
      >
        <Card style={[styles.card]}>
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
              uri: getPokemonArtworkUrl(id),
            }}
            style={styles.image}
            resizeMode="contain"
          />
          <ThemeText>{name}</ThemeText>
        </Card>
      </Pressable>
    </Link>
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

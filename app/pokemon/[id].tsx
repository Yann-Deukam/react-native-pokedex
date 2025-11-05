import Card from "@/components/card";
import PokemonType from "@/components/PokemonType";
import RootView from "@/components/RootView";
import Row from "@/components/Row";
import ThemeText from "@/components/themeText";
import { Colors } from "@/constants/Colors";
import { getPokemonArtworkUrl } from "@/functions/pokemon";
import { useFetchQuery } from "@/hooks/useFetchQuery";
import { useThemeColors } from "@/hooks/useThemeColors";
import { router, useLocalSearchParams } from "expo-router";
import React from "react";
import { Image, Pressable, StyleSheet, Text, View } from "react-native";

export default function Pokemon() {
  const colors = useThemeColors();
  const params = useLocalSearchParams() as { id: string };

  const { data: pokemon } = useFetchQuery<"/pokemon/{id}">("/pokemon/[id]", {
    id: params.id,
  });
  const mainType = pokemon?.types?.[0].type.name;
  const colorType = mainType ? Colors.type[mainType] : colors.tint;
  const types = pokemon?.types ?? [];

  return (
    <RootView style={{ backgroundColor: colorType }}>
      <View>
        <Image
          style={styles.pokeball}
          source={require("@/assets/images/pokeball-bg.png")}
          resizeMode="contain"
        />
        <Row style={styles.header}>
          <Pressable onPress={router.back}>
            <Row gap={8}>
              <Image
                source={require("@/assets/images/back.png")}
                resizeMode="contain"
                style={{ width: 16, height: 16 }}
              />
              <ThemeText
                color="grayWhite"
                variant="headline"
                style={{ textTransform: "capitalize" }}
              >
                {pokemon?.name}
              </ThemeText>
            </Row>
          </Pressable>
          <ThemeText color="grayWhite" variant="subtitle2">
            #{params.id.padStart(3, "0")}{" "}
          </ThemeText>
        </Row>
        <View style={styles.body}>
          <Image
            source={{
              uri: getPokemonArtworkUrl(params.id),
            }}
            style={styles.image}
            resizeMode="contain"
          />
          <Card style={styles.card}>
            <Row style={{ justifyContent: "center" }} gap={4}>
              {types.map((type) => (
                <PokemonType name={type.type.name} key={type.type.name} />
              ))}
            </Row>
            <ThemeText variant="subtitle1" style={{ color: colorType }}>
              About
            </ThemeText>
            <ThemeText variant="subtitle1" style={{ color: colorType }}>
              Base Stats
            </ThemeText>
          </Card>
        </View>
        <Text>Pokemon {params.id}</Text>
      </View>
    </RootView>
  );
}

const styles = StyleSheet.create({
  header: {
    margin: 20,
    justifyContent: "space-between",
  },
  pokeball: {
    width: 208,
    height: 208,
    opacity: 0.1,
    position: "absolute",
    right: 8,
    top: 8,
  },
  image: {
    width: 200,
    height: 200,
    alignSelf: "center",
    position: "absolute",
    top: -140,
    zIndex: 2,
  },
  body: {
    marginTop: 144,
  },
  card: {
    paddingHorizontal: 20,
    paddingTop: 60,
    alignItems: "center",
    gap: 14,
  },
});

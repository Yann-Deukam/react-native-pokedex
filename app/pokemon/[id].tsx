import RootView from "@/components/RootView";
import Row from "@/components/Row";
import ThemeText from "@/components/themeText";
import { useLocalSearchParams } from "expo-router";
import React from "react";
import { Image, StyleSheet, Text } from "react-native";

export default function Pokemon() {
  const params = useLocalSearchParams() as { id: string };

  return (
    <RootView>
      <Row>
        <Row>
          <Image
            source={require("@/assets/images/back.png")}
            resizeMode="contain"
            style={{ width: 24, height: 24 }}
          />
        </Row>
        <ThemeText color="grayWhite" variant="subtitle2">
          #{params.id.padStart(3, "0")}{" "}
        </ThemeText>
      </Row>
      <Text>Pokemon {params.id}</Text>
    </RootView>
  );
}

const styles = StyleSheet.create({
  header: {
    margin: 20,
    justifyContent: "center",
  },
});

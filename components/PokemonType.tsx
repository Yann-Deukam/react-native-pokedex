import React from "react";

import { Colors } from "@/constants/Colors";
import { View, ViewStyle } from "react-native";
import ThemeText from "./themeText";

type props = {
  name: keyof (typeof Colors)["type"];
};

export default function PokemonType({ name }: props) {
  return (
    <View style={[rootStyle, { backgroundColor: Colors.type[name] }]}>
      <ThemeText
        color="grayWhite"
        variant="subtitle1"
        style={{ textTransform: "capitalize" }}
      >
        {name}
      </ThemeText>
    </View>
  );
}

const rootStyle = {
  flex: 0,
  height: 24,
  paddingHorizontal: 10,
  borderRadius: 20,
  justifyContent: "center",
} satisfies ViewStyle;

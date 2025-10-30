import Card from "@/components/card";
import ThemeText from "@/components/themeText";
import { useThemeColors } from "@/hooks/useThemeColors";
import { Image, StyleSheet, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function Index() {
  const colors = useThemeColors()
  return (
    <SafeAreaView
      style={[styles.container, {backgroundColor: colors.tint}]}
    >
      <View style={styles.header}>
        <Image source={require("@/assets/images/pokeball.png")} style={{ width: 24, height: 24 }}
  resizeMode="contain" />
        <ThemeText variant="headline" color="grayWhite">Pokedex</ThemeText>
      </View>
      <Card style={styles.body}>

      </Card>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { 
    flex: 1, 
    padding: 8 
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 16,
    padding: 12
  },
  body: {
    flex: 1
  }
})

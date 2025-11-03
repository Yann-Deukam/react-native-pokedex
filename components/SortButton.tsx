import { Shadows } from "@/constants/Shadows";
import { useThemeColors } from "@/hooks/useThemeColors";
import React, { useRef, useState } from "react";
import {
  Dimensions,
  Image,
  Modal,
  Pressable,
  StyleSheet,
  View,
} from "react-native";
import Card from "./card";
import Radio from "./Radio";
import Row from "./Row";
import ThemeText from "./themeText";

type Props = {
  value: "id" | "name";
  onChange: (v: "id" | "name") => void;
};

const options = [
  { label: "ID", value: "id" },
  { label: "Name", value: "name" },
] as const;

export default function SortButton({ value, onChange }: Props) {
  const colors = useThemeColors();
  const buttonRef = useRef<View>(null);

  const [isModalVisible, setIsModalVisible] = useState(false);
  const [position, setPosition] = useState<null | {
    top: number;
    right: number;
  }>(null);
  const onButtonPress = () => {
    buttonRef.current?.measureInWindow((x, y, width, height) => {
      setIsModalVisible(true);
      setPosition({
        top: y + height,
        right: Dimensions.get("window").width - x - width,
      });
    });
  };
  const onClose = () => {
    setIsModalVisible(false);
  };

  return (
    <>
      <Pressable onPress={onButtonPress}>
        <View
          ref={buttonRef}
          style={[styles.button, { backgroundColor: colors.grayWhite }]}
        >
          <Image
            source={
              value === "id"
                ? require("@/assets/images/order.png")
                : require("@/assets/images/sort-az.png")
            }
            style={{ width: 20, height: 20 }} // ✅ size defined here
            resizeMode="contain"
          />
        </View>
      </Pressable>
      <Modal
        transparent
        animationType="fade"
        visible={isModalVisible}
        onRequestClose={onClose}
      >
        <Pressable style={styles.backdrop} onPress={onClose} />
        <View
          style={[styles.popup, { backgroundColor: colors.tint, ...position }]}
        >
          <ThemeText variant="subtitle2" color="grayWhite" style={styles.title}>
            Sort By
          </ThemeText>
          <Card style={styles.card}>
            {options.map((options) => (
              <Pressable onPress={() => onChange(options.value)}>
                <Row key={options.value} gap={8}>
                  <Radio checked={options.value === value} />
                  <ThemeText>{options.label} </ThemeText>
                </Row>
              </Pressable>
            ))}
          </Card>
        </View>
      </Modal>
    </>
  );
}

const styles = StyleSheet.create({
  button: {
    width: 40,
    height: 40,
    borderRadius: 8,
    justifyContent: "center",
    alignItems: "center",
  },
  backdrop: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  popup: {
    position: "absolute",
    width: 113,
    padding: 4,
    paddingTop: 8,
    borderRadius: 8,
    ...Shadows.dp2,
  },
  card: {
    paddingVertical: 16,
    paddingHorizontal: 20,
    gap: 12,
  },
  title: {
    padding: 8,
    paddingBottom: 12,
  },
});

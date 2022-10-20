import React from "react";
import { TouchableOpacity, Text, StyleSheet } from "react-native";
import { buttonSize } from "../utils/sizes";
import { colors } from "../utils/colors";

export const RoundedButton = ({
  style = {},
  textStyle = {},
  size = buttonSize.xxxl,
  title = "[No title]",
  onPress = () => {},
}) => {
  return (
    <TouchableOpacity style={[styles(size).radius, style]} onPress={onPress}>
      <Text style={[styles(size).text, textStyle]}>{title}</Text>
    </TouchableOpacity>
  );
};

const styles = (size) => ({
  radius: {
    borderRadius: size / 2,
    width: size,
    height: size,
    alignItems: "center",
    justifyContent: "center",
    borderColor: colors.whiteSmoke,
    borderWidth: 2,
  },
  text: { color: colors.whiteSmoke, fontSize: size / 3 },
});

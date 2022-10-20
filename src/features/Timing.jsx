import React from "react";
import { View, Text, StyleSheet } from "react-native";

//utils
import { buttonSize } from "../utils/sizes";

//components
import { RoundedButton } from "../components/RoundedButton";

const minutesOption = [5, 15, 25];

export function Timing({ onChangeTime }) {
  return (
    <>
      {minutesOption.map((minute, index) => {
        return (
          <View style={styles.timing} key={index}>
            <RoundedButton
              size={buttonSize.xl}
              onPress={() => onChangeTime(minute)}
              title={`${minute}`}
            />
          </View>
        );
      })}
    </>
  );
}

const styles = StyleSheet.create({
  timing: {
    flex: 1,
    alignItems: "center",
  },
});

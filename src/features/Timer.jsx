import { View, Text, StyleSheet } from "react-native";
import React from "react";

import { Countdown } from "../components/Countdown";

export function Timer({ focusSubject, onTimerEnd, clearSubject }) {
  return (
    <View style={styles.container}>
      <View style={styles.countdown}>
        <Countdown isPaused={true} onProgress={() => {}} onEnd={() => {}} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // backgroundColor: "green",
  },
  countdown: {
    flex: 0.5,
    alignItems: "center",
    // backgroundColor: "#fff",
  },
});

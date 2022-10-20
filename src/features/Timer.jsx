import React, { useState } from "react";
import { View, Text, StyleSheet, Vibration } from "react-native";
import { ProgressBar } from "react-native-paper";

//utils
import { fontSizes, spacing, buttonSize } from "../utils/sizes";
import { colors } from "../utils/colors";

//components
import { Countdown } from "../components/Countdown";
import { RoundedButton } from "../components/RoundedButton";

//features
import { Timing } from "../features/Timing";

const ONE_SECOND_IN_MS = 1000;

const PATTERN = [
  1 * ONE_SECOND_IN_MS,
  1 * ONE_SECOND_IN_MS,
  1 * ONE_SECOND_IN_MS,
  1 * ONE_SECOND_IN_MS,
  1 * ONE_SECOND_IN_MS,
  1 * ONE_SECOND_IN_MS,
];

export function Timer({ focusSubject, onTimerEnd, clearSubject }) {
  const [isStarted, setisStarted] = useState(false);
  const [progress, setprogress] = useState(1);
  const [minutes, setminutes] = useState(0.1);

  return (
    <View style={styles.container}>
      <View style={styles.countdown}>
        <Countdown
          minutes={minutes}
          isPaused={!isStarted}
          onProgress={setprogress}
          onEnd={() => {
            Vibration.vibrate(PATTERN);
            clearSubject();
          }}
        />
      </View>
      <View style={{ paddingTop: spacing.sm }}>
        <ProgressBar
          color={colors.whiteSmoke}
          style={{ height: spacing.sm }}
          progress={progress}
        />
      </View>
      <View style={{ paddingTop: spacing.sm }}>
        <Text style={styles.title}>Focusing On:</Text>
        <Text style={styles.task}>{focusSubject}</Text>
      </View>
      <View style={styles.timingWrapper}>
        <Timing onChangeTime={setminutes} />
      </View>
      <View style={styles.buttonWrapper}>
        {!isStarted && (
          <RoundedButton
            title="Start"
            size={buttonSize.xxxl}
            onPress={() => {
              setisStarted(true);
            }}
          />
        )}
        {isStarted && (
          <RoundedButton
            title="Pause"
            size={buttonSize.xxxl}
            onPress={() => {
              setisStarted(false);
            }}
          />
        )}
      </View>
      <View style={styles.clearSubjectWrapper}>
        <RoundedButton size={buttonSize.xl} title="-" onPress={clearSubject} />
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
    flex: 0.4,
    alignItems: "center",
    justifyContent: "center",
  },
  timingWrapper: {
    flex: 0.2,
    flexDirection: "row",
    padding: spacing.sm,
    alignItems: "center",
    justifyContent: "center",
    // backgroundColor: "red",
  },
  buttonWrapper: {
    flex: 0.2,
    flexDirection: "row",
    padding: spacing.sm,
    alignItems: "center",
    justifyContent: "center",
    // backgroundColor: "green",
  },
  clearSubjectWrapper: {
    flex: 0.2,
    flexDirection: "row",
    padding: spacing.sm,
    alignItems: "center",
    justifyContent: "center",
    // backgroundColor: "green",
  },
  title: {
    color: colors.whiteSmoke,
    fontWeight: "bold",
    textAlign: "center",
    fontSize: fontSizes.xl,
  },
  task: {
    color: colors.whiteSmoke,
    textAlign: "center",
    fontSize: fontSizes.lg,
  },
});

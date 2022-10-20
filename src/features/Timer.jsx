import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet, Vibration } from "react-native";
import { ProgressBar } from "react-native-paper";
import { useKeepAwake } from "expo-keep-awake";

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

//Vibrate Pattern:
// Android: "wait 1s, vibrate 1s, wait 1s, vibrate 1s, ..."
// IOS: "wait 1s, vibrate, wait 1s, vibrate, wait 1s, ..."

export function Timer({ focusSubject, onTimerEnds, clearSubject }) {
  const [isStarted, setisStarted] = useState(false);
  const [progress, setprogress] = useState(1);
  const [minutes, setminutes] = useState(0.1);

  useKeepAwake();

  // (1) comment this function:
  // function onEnd(reset) {
  //   Vibration.vibrate(PATTERN);
  //   setisStarted(false);
  //   setprogress(1);
  //   reset();
  // }

  //(2) Add useEffect to manage "onEnd" function:
  useEffect(() => {
    if (progress === 0) {
      console.log("Vibrate!: ", progress);
      Vibration.vibrate(PATTERN);
      setisStarted(false);
      setprogress(1);
      onTimerEnds(focusSubject);
    }
  }, [progress]);

  return (
    <View style={styles.container}>
      <View style={styles.countdown}>
        {/* (3) remove onEnd, because we manage reset automaticaly using useEffect */}
        <Countdown
          minutes={minutes}
          isPaused={!isStarted}
          onProgress={setprogress}
          // onEnd = {onEnd}
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

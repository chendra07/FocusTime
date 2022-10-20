import React, { useState, useEffect, useRef } from "react";
import { Text, View, StyleSheet } from "react-native";

import { fontSizes, spacing } from "../utils/sizes";
import { colors } from "../utils/colors";

function minutesToMillis(min) {
  return min * 1000 * 60;
}
function formatTime(time) {
  let result = time < 10 ? `0${time}` : time;
  return result;
}
export function Countdown({ minutes = 0.1, isPaused, onProgress, onEnd }) {
  const interval = useRef(null);

  const [millis, setMillis] = useState(6000);

  function reset() {
    console.log("running!");
    setMillis(minutesToMillis(minutes));
  }

  useEffect(() => {
    setMillis(minutesToMillis(minutes));
  }, [minutes]);

  useEffect(() => {
    onProgress(millis / minutesToMillis(minutes));

    //(4) using use Effect to manage time reset
    if (millis === 0) {
      reset();
    }
  }, [millis]);

  useEffect(() => {
    if (isPaused) {
      if (interval.current) clearInterval(interval.current);
      return;
    }

    interval.current = setInterval(countDown, 1000);

    return () => clearInterval(interval.current);
  }, [isPaused]);

  function countDown() {
    setMillis((prevTime) => {
      console.log("Prevtime: ", prevTime);
      if (prevTime === 0) {
        clearInterval(interval.current);
        // (5) comment onEnd
        // onEnd(reset);
        return prevTime;
      }
      const timeLeft = prevTime - 1000;
      return timeLeft;
    });
  }

  const minute = Math.floor(millis / 1000 / 60) % 60;
  const seconds = Math.floor(millis / 1000) % 60;
  return (
    <Text style={styles.text}>
      {formatTime(minute)}:{formatTime(seconds)}
    </Text>
  );
}

const styles = StyleSheet.create({
  text: {
    fontSize: fontSizes.xxxl,
    fontWeight: "bold",
    color: colors.whiteSmoke,
    padding: spacing.lg,
    backgroundColor: "rgba(94, 132, 226, 0.3)",
  },
});

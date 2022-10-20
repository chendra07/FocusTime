import React from "react";
import { View, Text, StyleSheet, FlatList } from "react-native";

//utils
import { colors } from "../utils/colors";
import { fontSizes, spacing } from "../utils/sizes";

export function FocusHistory({ history }) {
  if (!history || !history.length) {
    return (
      <View style={styles.container}>
        <Text style={styles.title}>We haven't focused on anything yet!</Text>
      </View>
    );
  }

  function renderItem({ item }) {
    return <Text style={styles.item}> - {item}</Text>;
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Things we've focused on: </Text>
      <FlatList data={history} renderItem={renderItem} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 7, padding: spacing.md },
  title: {
    color: colors.whiteSmoke,
    fontSize: fontSizes.lg,
    fontWeight: "bold",
    textAlign: "center",
    padding: spacing.md,
  },
  item: {
    fontSize: fontSizes.md,
    color: colors.whiteSmoke,
  },
});

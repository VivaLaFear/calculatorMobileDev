import { Stack } from "expo-router";
import React from "react";
import {
  Dimensions,
  SafeAreaView,
  StatusBar,
  StyleSheet,
  Text,
  View,
} from "react-native";

import { Chart } from "chart.js";
import fsp from "node:fs/promises";
import { Canvas } from "skia-canvas";

const { width, height } = Dimensions.get("window");

const COLORS = {
  bg: "#1C1C1C",
  number: "#505050",
  operator: "#757575",
  utility: "#AFAFAF",
  text: "#000000",
};

export default function GraphingScreen() {
  async function CreateReturnGraph() {
    const canvas = new Canvas(400, 300);
    const chart = new Chart(canvas as any, {
      type: "line",
      data: {
        labels: ["Red", "Blue", "Yellow", "Green", "Purple", "Orange"],
        datasets: [
          {
            label: "# of Votes",
            data: [12, 19, 3, 5, 2, 3],
            borderColor: "red",
          },
        ],
      },
    });
    const pngBuffer = await canvas.toBuffer("png", { matte: "white" });
    await fsp.writeFile("output.png", pngBuffer);
    chart.destroy();
  }

  return (
    <SafeAreaView style={styles.container}>
      <Stack.Screen options={{ headerShown: false }} />
      <StatusBar barStyle="light-content" />

      <View style={styles.displayContainer}>
        <View style={styles.textWrapper}>
          <Text
            style={styles.inputText}
            numberOfLines={1}
            adjustsFontSizeToFit={true}
          ></Text>
          <Text
            style={styles.resultText}
            numberOfLines={1}
            adjustsFontSizeToFit={true}
          ></Text>
        </View>
      </View>

      <View style={styles.grid}></View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: COLORS.bg },
  displayContainer: {
    height: height * 0.35,
    padding: 20,
    justifyContent: "flex-end",
    alignItems: "flex-end",
  },
  historyBtn: { position: "absolute", top: 20, right: 20, padding: 10 },
  textWrapper: { alignItems: "flex-end", width: "100%" },
  inputText: { color: "#FFFFFF", fontSize: 48, fontWeight: "300" },
  resultText: { color: COLORS.utility, fontSize: 24, marginTop: 10 },
  grid: { flex: 1, flexDirection: "row", flexWrap: "wrap", padding: 12 },
  buttonWrapper: { width: "25%", aspectRatio: 1, padding: 6 },
  button: {
    flex: 1,
    borderRadius: 12,
    justifyContent: "center",
    alignItems: "center",
  },
  buttonText: { fontSize: 22, fontWeight: "600", color: COLORS.text },
});

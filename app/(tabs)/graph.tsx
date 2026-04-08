import { router, Stack } from "expo-router";
import { Hourglass } from "lucide-react-native";
import {
    Dimensions,
    SafeAreaView,
    StatusBar,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from "react-native";

const { width, height } = Dimensions.get("window");

type ButtonType = "number" | "operator" | "utility";

interface ButtonData {
  label: string;
  type: ButtonType;
}

const COLORS = {
  bg: "#1C1C1C",
  number: "#505050",
  operator: "#757575",
  utility: "#AFAFAF",
  text: "#000000",
};

export default function GraphingScreen() {
  return (
    <SafeAreaView style={styles.container}>
      <Stack.Screen options={{ headerShown: false }} />
      <StatusBar barStyle="light-content" />

      <View style={styles.displayContainer}>
        <TouchableOpacity
          style={styles.historyBtn}
          onPress={() => {
            router.push("/history" as any);
          }}
        >
          <Hourglass size={24} color={COLORS.utility} />
        </TouchableOpacity>

        <View style={styles.textWrapper}>
          <Text
            style={styles.inputText}
            numberOfLines={1}
            adjustsFontSizeToFit={true}
          >
            {input || "0"}
          </Text>
          <Text
            style={styles.resultText}
            numberOfLines={1}
            adjustsFontSizeToFit={true}
          >
            {result ? `= ${result}` : ""}
          </Text>
        </View>
      </View>

      <View style={styles.grid}>
        {buttons.map((btn, index) => (
          <View key={index} style={styles.buttonWrapper}>
            <CalcButton
              label={btn.label}
              type={btn.type}
              onPress={handleButtonPress}
            />
          </View>
        ))}
      </View>
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

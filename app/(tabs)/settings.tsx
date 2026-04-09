import { Stack } from "expo-router";
import React from "react";
import { Alert, SafeAreaView, StatusBar, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { useHistory } from "../../context/CalculatorContext";

import { ChevronRight, Info, Palette, Trash2 } from "lucide-react-native";

const COLORS = {
  bg: "#1C1C1C",
  text: "#FFFFFF",
  secondary: "#AFAFAF",
  line: "#333333",
  danger: "#FF4D4D",
};

export default function SettingsScreen() {
  const { clearHistory } = useHistory();

  const handleClearHistory = () => {
    Alert.alert(
      "Clear History",
      "Are you sure you want to clear your calculation history?",
      [
        { text: "Cancel", style: "cancel" },
        { text: "Clear", style: "destructive", onPress: clearHistory }
      ]
    );
  };

  const SettingsRow = ({ icon: IconComponent, label, onPress, color = COLORS.text, value }) => (
    <TouchableOpacity style={styles.row} onPress={onPress}>
      <View style={styles.rowLeft}>
        <IconComponent size={20} color={color} />
        <Text style={[styles.rowLabel, { color }]}>{label}</Text>
      </View>
      <View style={styles.rowRight}>
        {value && <Text style={[styles.rowValue, { color }]}>{value}</Text>}
        <ChevronRight size={20} color={COLORS.line} />
      </View>
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={styles.container}>
      <Stack.Screen
        options={{
          title: "Settings",
          headerShown: true,
          headerStyle: { backgroundColor: COLORS.bg },
          headerTintColor: COLORS.text,
        }}
      />
      <StatusBar barStyle="light-content" />

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>General</Text>
        <SettingsRow icon={Palette} label="Appearance" onPress={() => Alert.alert("Appearance settings coming soon!")} />
        <SettingsRow icon={Trash2} label="Clear History" onPress={handleClearHistory} color={COLORS.danger} />
        <SettingsRow icon={Info} label="About" onPress={() => Alert.alert("Calculator App", "Version 1.0.0\nBuilt with Expo and React Native by Alex Dea and Logan Jones in April 2026")} />
      </View>
    </SafeAreaView>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.bg,
  },
  section: {
    marginTop: 20,
    paddingHorizontal: 20,
  },
  sectionTitle: {
    color: COLORS.secondary,
    fontSize: 14,
    marginBottom: 10,
    textTransform: "uppercase",
  },
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 15,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.line,
  },
  rowLeft: {
    flexDirection: "row",
    alignItems: "center",
  },
  rowLabel: {
    marginLeft: 15,
    fontSize: 16,
  },
  rowRight: {
    flexDirection: "row",
    alignItems: "center",
  },
  rowValue: {
    marginRight: 10,
    fontSize: 16,
    color: COLORS.secondary,
  },
});



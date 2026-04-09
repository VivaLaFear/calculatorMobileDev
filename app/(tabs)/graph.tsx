import React from 'react';
import { SafeAreaView, StyleSheet, Text, View } from 'react-native';

// This is just a placeholder to see that the footer is set up properly


export default function GraphScreen() {
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.center}>
        <Text style={styles.text}>Placeholder</Text>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#1C1C1C' },
  center: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  text: { color: '#FFFFFF', fontSize: 18 }
});
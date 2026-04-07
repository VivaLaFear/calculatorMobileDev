import React from 'react';
import { FlatList, SafeAreaView, StatusBar, StyleSheet, Text, View } from 'react-native';
// Note: Ensure this import path matches where you saved your context file!
import { Stack } from 'expo-router';
import { useHistory } from '../../context/CalculatorContext';

const COLORS = {
  bg: '#1C1C1C',
  text: '#FFFFFF',
  secondary: '#AFAFAF',
  line: '#333333',
};

export default function HistoryScreen() {
  const { history } = useHistory();

  return (
    <SafeAreaView style={styles.container}>
      <Stack.Screen
        options={{
          title: 'History',
          headerShown: true,
          headerStyle: { backgroundColor: COLORS.bg },
          headerTintColor: COLORS.text
        }}
      />
      <StatusBar barStyle="light-content" />

      {history.length === 0 ? (
        <View style={styles.emptyContainer}>
          <Text style={styles.emptyText}>No history yet</Text>
        </View>
      ) : (
        <FlatList
          data={history}
          keyExtractor={(item) => item.id}
          contentContainerStyle={styles.listPadding}
          renderItem={({ item }) => (
            <View style={styles.historyItem}>
              <View style={styles.row}>
                <Text style={styles.formulaText}>{item.expression}</Text>
                <Text style={styles.timestamp}>{item.timestamp}</Text>
              </View>
              <Text style={styles.resultText}>= {item.result}</Text>
            </View>
          )}
        />
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.bg,
  },
  listPadding: {
    padding: 20,
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  emptyText: {
    color: COLORS.secondary,
    fontSize: 18,
  },
  historyItem: {
    paddingVertical: 15,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.line,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  formulaText: {
    color: COLORS.secondary,
    fontSize: 18,
  },
  resultText: {
    color: COLORS.text,
    fontSize: 22,
    fontWeight: 'bold',
    marginTop: 5,
  },
  timestamp: {
    color: COLORS.secondary,
    fontSize: 12,
  },
});
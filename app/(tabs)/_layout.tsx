import { Tabs } from "expo-router";
import { Calculator, History, Settings, TrendingUp } from 'lucide-react-native';
import React from "react";

export default function TabsLayout() {
  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: '#FFFFFF',
        tabBarInactiveTintColor: '#757575',
        tabBarStyle: { backgroundColor: '#1C1C1C' },
        headerStyle: { backgroundColor: '#1C1C1C' },
        headerTintColor: '#FFFFFF',
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: "Calculator",
          tabBarIcon: ({ color }) => <Calculator color={color} />,
        }}
      />
      <Tabs.Screen
        name="history"
        options={{
          title: "History",
          tabBarIcon: ({ color }) => <History color={color} />,
        }}
      />
      <Tabs.Screen
        name="settings"
        options={{
          title: "Settings",
          tabBarIcon: ({ color }) => <Settings color={color} />,
        }}
      />
      <Tabs.Screen
        name="graph"
        options={{
          title: "Graph",
          tabBarIcon: ({ color }) => <TrendingUp color={color} />,
        }}
      />
    </Tabs>
  );
}


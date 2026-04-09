import {
  CategoryScale,
  Chart as ChartJS,
  Legend,
  LinearScale,
  LineElement,
  PointElement,
  Title,
  Tooltip,
} from "chart.js";
import faker from "faker";
import React, { useEffect, useState } from "react";
import { Line } from "react-chartjs-2";
import { SafeAreaView, StyleSheet, View } from "react-native";
// footer works!
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
);

export default function GraphScreen() {
  const [graphLength, setGraphLength] = useState(1);
  const [graphElement, setGraphElement] = useState();

  useEffect(() => {
    const options = {
      responsive: true,
      plugins: {
        legend: {
          position: "bottom" as const,
        },
      },
    };

    const labels = [1];

    for (let i = 2; i <= graphLength; i++) {
      labels.push(i);
    }

    const data = {
      labels,
      datasets: [
        {
          label: "Your Dataset!",
          data: labels.map(() => faker.datatype.number({ min: 0, max: 500 })),
          borderColor: "rgb(255, 99, 132)",
          backgroundColor: "rgba(255, 99, 132, 0.5)",
        },
      ],
    };

    setGraphElement(<Line options={options} data={data} />);
  }, [graphLength]);

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.center}>
        {graphElement}
        <View>
          <label style={styles.text}>
            <input
              type="range"
              min="1"
              max="30"
              value={graphLength}
              onChange={(e) => {
                setGraphLength(Number(e.target.value));
              }}
              style={styles.input}
            />
            Graph length: {graphLength}
          </label>
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#1C1C1C" },
  center: { flex: 1, justifyContent: "center", alignItems: "center" },
  text: { color: "#DDDDDD", fontSize: 18 },
  input: { color: "#DDDDDD", backgroundColor: "#505050", fontSize: 20 },
});

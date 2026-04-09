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
import { SafeAreaView, StyleSheet, Text, View } from "react-native";
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
        title: {
          display: false,
          text: "Chart.js Line Chart",
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
          label: "Dataset 1",
          data: labels.map(() => faker.datatype.number({ min: 0, max: 1000 })),
          borderColor: "rgb(255, 99, 132)",
          backgroundColor: "rgba(255, 99, 132, 0.5)",
        },
        // {
        //   label: "Dataset 2",
        //   data: labels.map(() => faker.datatype.number({ min: 0, max: 1000 })),
        //   borderColor: "rgb(53, 162, 235)",
        //   backgroundColor: "rgba(53, 162, 235, 0.5)",
        // },
      ],
    };

    setGraphElement(<Line options={options} data={data} />);
  }, [graphLength]);

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.center}>
        <Text style={styles.text}>Placeholder</Text>
        {graphElement}
        <View>
          <input
            type="number"
            value={graphLength}
            onChange={(e) => {
              setGraphLength(Number(e.target.value));
            }}
            style={styles.inputText}
          />
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#1C1C1C" },
  center: { flex: 1, justifyContent: "center", alignItems: "center" },
  text: { color: "#FFFFFF", fontSize: 18 },
  inputText: { color: "#DDDDDD", backgroundColor: "#505050", fontSize: 20 },
});

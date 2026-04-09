export default function DisplayGraph() {
  const { ChartJSNodeCanvas } = require("chartjs-node-canvas");

  const width = 400; //px
  const height = 400; //px
  const backgroundColour = "white";
  const chartJSNodeCanvas = new ChartJSNodeCanvas({
    width,
    height,
    backgroundColour,
  });

  (async () => {
    const configuration = {
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
    };

    const image = await chartJSNodeCanvas.renderToBuffer(configuration);
    const dataUrl = await chartJSNodeCanvas.renderToDataURL(configuration);
    const stream = chartJSNodeCanvas.renderToStream(configuration);

    return stream;
  })();
}

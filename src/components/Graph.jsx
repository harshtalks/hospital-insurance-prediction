import { data as Data } from "../data/insurance";
import Chart from "chart.js";
import { useEffect, useRef } from "react";

function shuffle(array) {
  let currentIndex = array.length,
    randomIndex;

  // While there remain elements to shuffle...
  while (currentIndex != 0) {
    // Pick a remaining element...
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex--;

    // And swap it with the current element.
    [array[currentIndex], array[randomIndex]] = [
      array[randomIndex],
      array[currentIndex]
    ];
  }

  return array;
}

const Graph = ({ data1, color, data2 }) => {
  const myChart = useRef(null);

  const dataObject = [];

  const dataFill = Data.map((El) => ({ x: El[data1], y: El.charges }));
  shuffle(dataFill);
  const dataShuffled = dataFill.slice(0, 200);

  const data = {
    datasets: [
      {
        label: `${data1} VS ${data2}`,
        data: dataShuffled,
        backgroundColor: color
      }
    ]
  };

  const config = {
    type: "scatter",
    data: data,
    options: {
      responsive: false,
      aspectRatio: 1,
      elements: {
        point: {
          radius: 5
        }
      },
      plugins: {
        legend: {
          position: "top"
        },
        title: {
          display: true,
          text: "Age VS Charges"
        }
      }
    }
  };

  useEffect(() => {
    if (dataObject) {
      const chartDiv = myChart.current.getContext("2d");
      const newChart = new Chart(chartDiv, config);
    }
  }, []);

  // const ageChart = new Chart(chartContext, config);

  return (
    <div className="mx-auto relative">
      <canvas ref={myChart}></canvas>
    </div>
  );
};

export default Graph;

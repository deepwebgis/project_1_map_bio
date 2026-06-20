import { useEffect, useState } from "react";

import Papa from "papaparse";
import ReactECharts from "echarts-for-react";

function buildData(rows) {
  const years = [];

  for (let year = 1985; year <= 2024; year++) {
    years.push(String(year));
  }

  const series = [];

  rows.forEach((row) => {
    // pega o último nível preenchido
    const name =
      row["Nível 4"] || row["Nível 3"] || row["Nível 2"] || row["Nível 1"];

    // opcional: remover categorias agregadas
    if (!row["Nível 2"]) return;

    series.push({
      name,

      type: "bar",

      stack: "total",

      emphasis: {
        focus: "series",
      },

      data: years.map((year) => row[year]),
    });
  });

  return { years, series };
}

export default function StackedChart({ csvPath = "/clase.csv", height = 500 }) {
  const [chartData, setChartData] = useState({
    years: [],
    series: [],
  });

  useEffect(() => {
    Papa.parse(csvPath, {
      download: true,

      header: true,

      dynamicTyping: true,

      complete: ({ data }) => {
        setChartData(buildData(data));
      },
    });
  }, [csvPath]);

  const option = {
    tooltip: {
      trigger: "axis",
    },

    legend: {
      type: "scroll",
    },

    xAxis: {
      type: "category",

      data: chartData.years,
    },

    yAxis: {
      type: "value",

      min: 100e6,

      name: "Hectares",

      axisLabel: {
        formatter: (value) => {
          if (value >= 1e9) return `${value / 1e9}B`;

          if (value >= 1e6) return `${value / 1e6}M`;

          return value;
        },
      },
    },

    series: chartData.series,
  };

  return (
    <ReactECharts
      option={option}
      style={{
        height,
        width: "100%",
      }}
    />
  );
}

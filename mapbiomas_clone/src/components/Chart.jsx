import { useEffect, useState } from "react";

import Papa from "papaparse";
import ReactECharts from "echarts-for-react";

function buildHierarchy(rows, valueColumn) {
  const root = [];

  rows.forEach((row) => {
    const levels = [
      row["Nível 1"],
      row["Nível 2"],
      row["Nível 3"],
      row["Nível 4"],
    ].filter(Boolean);

    let current = root;

    levels.forEach((level, index) => {
      let node = current.find((x) => x.name === level);

      if (!node) {
        node = {
          name: level,
          children: [],
        };

        current.push(node);
      }

      // Último nível
      if (index === levels.length - 1) {
        node.value = row[valueColumn];
      }

      current = node.children;
    });
  });

  return root;
}

export default function SunburstChart({
  csvPath = "/cobertura_classe.csv",
  valueColumn = "2024",
  height = 600,
}) {
  const [data, setData] = useState([]);

  useEffect(() => {
    Papa.parse(csvPath, {
      download: true,
      header: true,
      dynamicTyping: true,

      complete: ({ data }) => {
        setData(buildHierarchy(data, valueColumn));
      },
    });
  }, [csvPath, valueColumn]);

  const option = {
    series: [
      {
        type: "sunburst",

        radius: ["15%", "95%"],

        data,

        sort: null,

        label: {
          rotate: "radial",
        },

        itemStyle: {
          borderWidth: 2,
        },
      },
    ],
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

import { useEffect } from "react";
import { MapContainer, TileLayer, useMap } from "react-leaflet";

import L from "leaflet";
import "leaflet/dist/leaflet.css";

import parseGeoraster from "georaster";
import GeoRasterLayer from "georaster-layer-for-leaflet";

const position = [-14.235, -51.9253];

function RasterLayer() {
  const map = useMap();

  useEffect(() => {
    const url = "/cobertura_web.tif";

    fetch(url)
      .then((response) => response.arrayBuffer())
      .then((arrayBuffer) => parseGeoraster(arrayBuffer))
      .then((georaster) => {
        console.log(georaster);
        const layer = new GeoRasterLayer({
          georaster,
          opacity: 0.8,
          resolution: 64,

          pixelValuesToColorFn: (values) => {
            const value = values[0];

            // NoData
            if (value === 0 || value == null) {
              return null;
            }

            return colors[value] || "#000000";
          },
        });

        layer.addTo(map);

        map.fitBounds(layer.getBounds());

        // limpeza quando o componente desmontar
        return () => {
          map.removeLayer(layer);
        };
      })
      .catch((err) => console.error(err));
  }, [map]);

  return null;
}

const colors = {};

for (let i = 1; i <= 75; i++) {
  const hue = (i * 360) / 75;

  colors[i] = `hsl(${hue}, 70%, 50%)`;
}

const Mapa = () => {
  return (
    <div style={{ height: "100vh", width: "100%" }}>
      <MapContainer
        center={position}
        zoom={5}
        scrollWheelZoom={false}
        style={{ height: "100%", width: "100%" }}
      >
        <TileLayer
          attribution="&copy; OpenStreetMap contributors"
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />

        <RasterLayer />
      </MapContainer>
    </div>
  );
};

export default Mapa;

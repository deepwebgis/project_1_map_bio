import { useEffect, useState } from "react";
import { MapContainer, TileLayer, useMap, useMapEvents } from "react-leaflet";

import "leaflet/dist/leaflet.css";

import parseGeoraster from "georaster";
import GeoRasterLayer from "georaster-layer-for-leaflet";

// =====================
// posição inicial (Brasil)
// =====================
const position = [-14.235, -51.9253];

// =====================
// captura posição do mouse
// =====================
function MousePosition({ setActualPosition }) {
  useMapEvents({
    mousemove(e) {
      setActualPosition(e.latlng);
    },
  });

  return null;
}

// =====================
// raster layer
// =====================
function RasterLayer() {
  const map = useMap();

  useEffect(() => {
    let layer;

    const load = async () => {
      try {
        const response = await fetch("/cobertura_web.tif");
        const arrayBuffer = await response.arrayBuffer();
        const georaster = await parseGeoraster(arrayBuffer);

        layer = new GeoRasterLayer({
          georaster,
          opacity: 0.8,
          resolution: 64,

          pixelValuesToColorFn: (values) => {
            const value = values[0];

            // NoData
            if (value === 0 || value == null) return null;

            return colors[value] || "#000000";
          },
        });

        layer.addTo(map);
        map.fitBounds(layer.getBounds());
      } catch (err) {
        console.error("Erro ao carregar raster:", err);
      }
    };

    load();

    return () => {
      if (layer) map.removeLayer(layer);
    };
  }, [map]);

  return null;
}

// =====================
// cores das classes
// =====================
const colors = {};

for (let i = 1; i <= 75; i++) {
  const hue = (i * 360) / 75;
  colors[i] = `hsl(${hue}, 70%, 50%)`;
}

// =====================
// mapa principal
// =====================
export default function Mapa() {
  const [actualPosition, setActualPosition] = useState({
    lat: position[0],
    lng: position[1],
  });

  return (
    <div className="relative h-screen w-full">
      <MapContainer
        center={position}
        zoom={5}
        scrollWheelZoom={true}
        style={{ height: "100%", width: "100%" }}
      >
        <TileLayer
          attribution="&copy; OpenStreetMap contributors"
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />

        <RasterLayer />

        <MousePosition setActualPosition={setActualPosition} />
      </MapContainer>

      {/* HUD do mouse (fora do mapa) */}
      <div className="absolute bottom-15 right-4 z-[1000] bg-gray-800 text-white p-3 rounded-xl shadow">
        <p>
          Lat: {actualPosition.lat.toFixed(5)} Lon:{" "}
          {actualPosition.lng.toFixed(5)}
        </p>
        <p></p>
      </div>
    </div>
  );
}

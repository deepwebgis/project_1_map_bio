import { useState } from "react";

import "./App.css";
import Mapa from "./components/Map";
import Button from "./components/Button";
import SunburstChart from "./components/Chart";
import StackedChart from "./components/StackedAreaChart";

function App() {
  return (
    <div className="h-screen w-screen flex">
      {/* Sidebar esquerda */}
      <aside className="w-[20%] border-r bg-black/85">
        <Button
          name="Cobertura"
          borderColor="border-green-800"
          subItems={["Coberturas", "Transições"]}
        />

        <Button name="Desmatamento" borderColor="border-orange-700" />
      </aside>

      {/* Área principal (topbar + mapa + painel direito) */}
      <div className="w-[80%] flex flex-col">
        {/* Barra superior */}
        <header className="h-16 border-b bg-black/85 flex items-center px-4">
          Barra superior
        </header>

        {/* Conteúdo abaixo da barra */}
        <div className="flex flex-1">
          {/* Centro */}
          <main className="w-[75%] overflow-hidden">
            <Mapa />
          </main>

          {/* Painel direito */}
          <aside className="w-[25%] border-l bg-black/85">
            <div className="border border-gray-600 bg-black/80 ">
              <p className="text-gray-400 px-4 py-10">
                Cobertura • Cobertura por Classe • 2024
              </p>

              <div className="px-5">
                <button className="bg-gray-800 border rounded-xl px-5 py-3">
                  Visualizado no Mapa
                </button>
              </div>

              <SunburstChart />
            </div>
            <div>
              <StackedChart></StackedChart>
            </div>
          </aside>
        </div>
      </div>
    </div>
  );
}

export default App;

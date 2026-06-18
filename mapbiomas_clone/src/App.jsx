import { useState } from "react";

import "./App.css";
import Mapa from "./components/Map";
import Button from "./components/Button";

function App() {
  return (
    <div className="h-screen w-screen grid grid-cols-[320px_1fr_380px]">
      {/* Sidebar esquerda */}
      <aside className="border-r bg-black/85">
        <Button
          name="Cobertura"
          borderColor="border-green-800"
          subItems={["Coberturas", "Transições"]}
        ></Button>
        <Button name="Desmatamento" borderColor="border-orange-700"></Button>
      </aside>

      {/* Conteúdo principal */}
      <main className="overflow-hidden">
        <Mapa></Mapa>
      </main>

      {/* Sidebar direita */}
      <aside className="border-l bg-white">Painel direito</aside>
    </div>
  );
}

export default App;

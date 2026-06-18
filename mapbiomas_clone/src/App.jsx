import { useState } from "react";

import "./App.css";
import Mapa from "./components/Map";

function App() {
  return (
    <div className="h-screen w-screen grid grid-cols-[320px_1fr_380px]">
      {/* Sidebar esquerda */}
      <aside className="border-r bg-white">Painel esquerdo</aside>

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

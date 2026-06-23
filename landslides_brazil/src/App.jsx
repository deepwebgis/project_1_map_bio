import { useState } from "react";
import Mapa from "./components/mapa";

function App() {
  return (
    <>
      <div className="h-screen w-screen flex">
        {/* Sidebar esquerda */}
        <aside className="w-[20%] border-r bg-black/85">
          <p className="px-4 py-6 font-ubuntu text-4xl text-white">Datasets</p>
        </aside>

        {/* Área principal (topbar + mapa + painel direito) */}
        <div className="w-[80%] flex flex-col">
          {/* Barra superior */}

          {/* Conteúdo abaixo da barra */}
          {/* Centro */}
          <Mapa></Mapa>
        </div>
      </div>
    </>
  );
}

export default App;

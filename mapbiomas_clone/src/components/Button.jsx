import { useState } from "react";
import SubButton from "./SubButton";

const Button = (props) => {
  const [open, setOpen] = useState(false);
  const subItems = props.subItems || [];
  return (
    <div className="p-2">
      {/* Botão principal */}
      <div className={`overflow-hidden rounded-md border ${props.borderColor}`}>
        <div className="flex items-center">
          <button className="flex-1 py-4 px-1 text-left text-white">
            {props.name}
          </button>

          <button
            className="px-4 text-2xl text-white"
            onClick={() => setOpen(!open)}
          >
            {open ? "−" : "+"}
          </button>
        </div>

        {/* Extensão */}
        {open && (
          <div className="px-4">
            <label className="flex cursor-pointer items-center gap-3 rounded-md text-lg">
              <input
                type="radio"
                name="camada"
                className="h-4 w-4 accent-gray-500"
              />
              <span className="text-gray-300">Cobertura 30m (40 anos)</span>
            </label>
            <div className="ml-7 space-y-1 text-sm">
              <div>
                {subItems.map((item) => (
                  <SubButton key={item} item={item}></SubButton>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Button;

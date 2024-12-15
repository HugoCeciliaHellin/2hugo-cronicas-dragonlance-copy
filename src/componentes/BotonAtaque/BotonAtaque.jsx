import React from "react";
import "../../estilos/BotonAtaque.css";

const BotonAtaque = ({ realizarAtaque }) => {
  return (
    <button onClick={realizarAtaque} className="btn-ataque">
      Atacar
    </button>
  );
};

export default BotonAtaque;

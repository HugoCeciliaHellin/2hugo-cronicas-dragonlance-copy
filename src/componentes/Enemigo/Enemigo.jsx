import React from "react";
import "../../estilos/Enemigo.css";

const Enemigo = ({ enemigo }) => {
  return (
    <div className="enemigo">
      <img src={enemigo.imagen} alt={enemigo.nombre} className="imagen" />
      <div className="estadisticas">
        <p>{enemigo.nombre}</p>
        <p>Vida: {enemigo.vida}</p>
        <p>Ataque principal: {enemigo.ataque}</p>
        <p>Defensa: {enemigo.defensa}</p>
      </div>
    </div>
  );
};

export default Enemigo;

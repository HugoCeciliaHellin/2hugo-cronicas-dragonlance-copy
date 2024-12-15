import React from "react";
import "../../estilos/Recompensas.css";

const Recompensas = ({ recompensas }) => {
  return (
    <div className="recompensas">
      <h3>Recompensas</h3>
      <ul>
        {recompensas.map((rec, index) => (
          <li key={index}>
            <span className="recompensa-nombre">{rec.nombre}</span>
            <br />
            <span className="recompensa-descripcion">{rec.descripcion}</span>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Recompensas;

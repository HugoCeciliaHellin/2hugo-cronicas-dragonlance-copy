import React from "react";
import "../../estilos/Heroe.css";

const Heroe = ({ heroe }) => {
  return (
    <div className="heroe">
      <img src={heroe.imagen} alt={heroe.nombre} className="imagen" />
      <div className="estadisticas">
        <p>{heroe.nombre}</p>
        <p>Vida: {heroe.vida}</p>
        <p>Ataque principal: {heroe.ataquePrincipal}</p>
        <p>Ataque secundario: {heroe.ataqueSecundario}</p>
        <p>Defensa: {heroe.defensa}</p>
      </div>
    </div>
  );
};

export default Heroe;

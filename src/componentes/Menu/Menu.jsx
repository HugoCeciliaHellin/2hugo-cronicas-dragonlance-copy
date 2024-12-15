import React from "react";
import "../../estilos/Menu.css";

function Menu({ mensajeFinal, reiniciarJuego }) {
  return (
    <div className="menu">
      <h2>{mensajeFinal}</h2>
      <button className="boton-reiniciar" onClick={reiniciarJuego}>
        Reiniciar Juego
      </button>
    </div>
  );
}

export default Menu;

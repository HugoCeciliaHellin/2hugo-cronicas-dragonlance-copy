import "./App.css";
import { useState } from "react";
import Logo from "./componentes/Logo/Logo";
import Heroe from "./componentes/Heroe/Heroe";
import Enemigo from "./componentes/Enemigo/Enemigo";
import Recompensas from "./componentes/Recompensas/Recompensas";
import Texto from "./componentes/Texto/Texto";
import BotonAtaque from "./componentes/BotonAtaque/BotonAtaque";
import Menu from "./componentes/Menu/Menu";

function App() {
  const heroes = [
    {
      nombre: "Tanis",
      imagen: require("./imagenes/Tanis.jpg"),
      vida: 200,
      ataquePrincipal: 23,
      ataqueSecundario: 22,
      defensa: 8,
    },
    {
      nombre: "Flint",
      imagen: require("./imagenes/Flint.webp"),
      vida: 180,
      ataquePrincipal: 22,
      ataqueSecundario: 21,
      defensa: 9,
    },
    {
      nombre: "Tas",
      imagen: require("./imagenes/Tas.jpg"),
      vida: 150,
      ataquePrincipal: 24,
      ataqueSecundario: 22,
      defensa: 7,
    },
  ];

  const enemigos = [
    {
      nombre: "Orco",
      imagen: require("./imagenes/Orco.webp"),
      vida: 40,
      ataque: 21,
      defensa: 8,
    },
    {
      nombre: "Bruja",
      imagen: require("./imagenes/Bruja.jpg"),
      vida: 39,
      ataque: 15,
      defensa: 8,
    },
    {
      nombre: "Licántropo",
      imagen: require("./imagenes/Licantropo.webp"),
      vida: 43,
      ataque: 18,
      defensa: 8,
    },
    {
      nombre: "Vampiro",
      imagen: require("./imagenes/Vampiro.jpg"),
      vida: 50,
      ataque: 13,
      defensa: 8,
    },
  ];

  const posiblesRecompensas = [
    {
      nombre: "Anillo inmortal",
      descripcion: "Anillo perteneciente a un sabio anciano.",
    },
    {
      nombre: "Espada de Fuego",
      descripcion: "Espada forjada en el interior de un volcán.",
    },
    { nombre: "Escudo de oro", descripcion: "Escudo de un antiguo general." },
    { nombre: "Guantes audaces", descripcion: "Guantes rápidos." },
    { nombre: "Botas aladas", descripcion: "Botas sin daño de caída." },
  ];

  const [heroeActual, setHeroeActual] = useState(heroes[0]);
  const [enemigoActual, setEnemigoActual] = useState(enemigos[0]);
  const [recompensas, setRecompensas] = useState([]);
  const [recompensasRestantes, setRecompensasRestantes] =
    useState(posiblesRecompensas);
  const [textoCombate, setTextoCombate] = useState([]);
  const [turno, setTurno] = useState(1);
  const [mostrarMenu, setMostrarMenu] = useState(false);
  const [mensajeFinal, setMensajeFinal] = useState("");

  const manejarAtaque = () => {
    if (heroeActual.vida <= 0 || enemigoActual.vida <= 0) {
      return; // No hacer nada si ya está muerto
    }

    const ataqueHeroe =
      Math.random() > 0.5
        ? heroeActual.ataquePrincipal
        : heroeActual.ataqueSecundario;
    const nuevoTexto = [];

    // Ataque del héroe
    enemigoActual.vida -= Math.max(0, ataqueHeroe - enemigoActual.defensa);
    nuevoTexto.push(
      `${
        heroeActual.nombre
      } ataca con ${ataqueHeroe} y deja al enemigo con ${Math.max(
        0,
        enemigoActual.vida
      )} de vida.`
    );

    if (enemigoActual.vida <= 0) {
      agregarRecompensa();
      nuevoTexto.push(
        `${heroeActual.nombre} ha derrotado a ${enemigoActual.nombre}!`
      );
      if (enemigos.length === recompensas.length) {
        setMensajeFinal("¡Felicitaciones! Has completado el juego.");
        setMostrarMenu(true);
      }
    } else {
      // Ataque del enemigo
      heroeActual.vida -= Math.max(
        0,
        enemigoActual.ataque - heroeActual.defensa
      );
      nuevoTexto.push(
        `${enemigoActual.nombre} ataca con ${enemigoActual.ataque} y deja a ${
          heroeActual.nombre
        } con ${Math.max(0, heroeActual.vida)} de vida.`
      );
    }

    setTextoCombate((prev) => [
      ...prev.slice(-5), // Limitar a los últimos 5 mensajes
      ...nuevoTexto,
    ]);

    if (heroeActual.vida <= 0 || enemigoActual.vida <= 0) {
      manejarSiguienteCombate();
    } else {
      setTurno(turno + 1);
    }
  };

  const manejarSiguienteCombate = () => {
    const nuevoHeroe = heroes[Math.floor(Math.random() * heroes.length)];
    const nuevoEnemigo = enemigos[Math.floor(Math.random() * enemigos.length)];
    setHeroeActual({ ...nuevoHeroe });
    setEnemigoActual({ ...nuevoEnemigo });
    setTurno(1);
    setTextoCombate([]); // Limpiar el texto del combate
  };

  const agregarRecompensa = () => {
    if (recompensasRestantes.length === 0) return; // Si no hay más recompensas
    const recompensa =
      recompensasRestantes[
        Math.floor(Math.random() * recompensasRestantes.length)
      ];
    setRecompensas((prev) => [...prev, recompensa]);
    setRecompensasRestantes(
      recompensasRestantes.filter((rec) => rec.nombre !== recompensa.nombre)
    );
  };

  const reiniciarJuego = () => {
    setHeroeActual(heroes[0]);
    setEnemigoActual(enemigos[0]);
    setRecompensas([]);
    setRecompensasRestantes(posiblesRecompensas);
    setTextoCombate([]);
    setTurno(1);
    setMostrarMenu(false);
  };

  return (
    <div className="App">
      {mostrarMenu ? (
        <Menu mensajeFinal={mensajeFinal} reiniciarJuego={reiniciarJuego} />
      ) : (
        <>
          <Logo />
          <div className="fila-principal">
            <Heroe heroe={heroeActual} />
            <Texto texto={textoCombate} />
            <Enemigo enemigo={enemigoActual} />
          </div>
          <BotonAtaque realizarAtaque={manejarAtaque} />
          <Recompensas recompensas={recompensas} />
        </>
      )}
    </div>
  );
}

export default App;

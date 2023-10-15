import { useState, useRef } from "react";
import "./App.css";
import eye from "./assets/eye.png";
import eye_gif from "./assets/eye.gif";
import Game from "./components/Game";
import sound_boot from "./assets/boot.mp3";
import Footer from "./components/Footer";
import { easeIn, motion } from "framer-motion";

function App() {
  const startHint = useRef(null);
  const [started, setStarted] = useState(false);
  const [smallHeight, setSmallHeight] = useState(
    window.innerHeight <= 900 ? true : false
  );
  console.log("App rendered");

  function start() {
    if (started) return;
    new Audio(sound_boot).play();
    setStarted(true);
  }

  const variants = {
    active: {
      position: "absolute",
      left: "50%",
      top: "45%",
      transform: "translate(-50%, -50%)",
    },
    normal: {
      position: "absolute",
      left: "50%",
      top: smallHeight ? "3%" : "10%",
      transform: "translate(-50%, -0%)",
    },
  };

  const variants_overlay = {
    active: {
      height: "100vh",
    },
    normal: {
      height: "0vh",
    },
  };

  const variants_description = {
    active: {
      opacity: 1,
    },
    normal: {
      opacity: 0,
    },
  };

  return (
    <>
      <div className="container" onClick={start}>
        <motion.div
          className="overlay"
          variants={variants_overlay}
          initial="active"
          animate={started ? "normal" : "active"}
          transition={{ duration: 1.5, ease: "easeInOut", delay: 0 }}
        ></motion.div>

        <motion.div
          className="center"
          variants={variants}
          initial="active"
          animate={started ? "normal" : "active"}
          transition={{ duration: 1, ease: "easeInOut", delay: 0 }}
        >
          <h1>
            PERCEPTI<img className="eye" src={eye_gif}></img>N
          </h1>
          <motion.h2
            variants={variants_description}
            initial="active"
            animate={started ? "normal" : "active"}
            transition={{ duration: 1, ease: "easeInOut", delay: 0 }}
          >
            A challenging memory game.
          </motion.h2>
        </motion.div>
        <motion.h2
          className={`start-hint ${started ? "animation-stopped" : ""}`}
          ref={startHint}
          variants={variants_description}
          initial="active"
          animate={started ? "normal" : "active"}
          transition={{ duration: 0.2, ease: "easeInOut" }}
        >
          Click anywhere to begin
        </motion.h2>
        <Game />
        <Footer></Footer>
      </div>
    </>
  );
}

export default App;

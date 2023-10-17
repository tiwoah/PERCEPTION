import { useState, useRef } from "react";
import "./App.css";
import eye from "./assets/eye.png";
import eye_vid from "./assets/eye_120fps.mp4";
import eye_gif from "./assets/eye-icon-animation-interpolated-50bg.gif";
import Game from "./components/Game";
import sound_boot from "./assets/boot.mp3";
import Footer from "./components/Footer";
import { easeIn, motion } from "framer-motion";
import { Route, Routes } from "react-router-dom";
import Leaderboard from "./components/Leaderboard";

function App() {
  const startHint = useRef(null);
  const [started, setStarted] = useState(false);
  const [smallHeight, setSmallHeight] = useState(
    window.innerHeight <= 900 ? true : false
  );
  console.log("App rendered");

  const [isAnimationFinished, setIsAnimationFinished] = useState(false);

  function timeout(delay) {
    return new Promise((res) => setTimeout(res, delay));
  }

  async function start() {
    if (started) return;
    new Audio(sound_boot).play();
    setStarted(true);

    await timeout(1500);

    setIsAnimationFinished(true);
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
      top: smallHeight ? "3%" : "50px",
      transform: "translate(-50%, -0%)",
    },
  };

  const variants_overlay = {
    active: {
      height: "100vh",
      background:
        "radial-gradient(circle, rgba(74,104,65,1) 70%, rgb(71, 97, 62) 100%)",
    },
    normal: {
      height: "0vh",
      background: isAnimationFinished
        ? "radial-gradient(circle, rgba(74,104,65,1) 70%, rgb(71, 97, 62) 100%)"
        : "radial-gradient(circle, rgba(74,104,65,1) 50%, rgb(36, 51, 32) 90%)",
      transition: {
        height: { duration: 0.8, delay: 2.3, ease: "easeInOut" },
        background: { duration: 0.7, delay: 0.3, ease: "easeInOut" },
      },
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

  function easeInOutQuad(x) {
    return x < 0.5 ? 2 * x * x : 1 - Math.pow(-2 * x + 2, 2) / 2;
  }

  return (
    <>
      <div className="container" onClick={start}>
        <motion.div
          className="overlay"
          variants={variants_overlay}
          initial="active"
          animate={started ? "normal" : "active"}
          transition={{ duration: 0.8, ease: "easeInOut", delay: 0 }}
        ></motion.div>

        <motion.div
          className="center"
          variants={variants}
          initial="active"
          animate={started ? "normal" : "active"}
          transition={{ duration: 0.5, ease: "easeInOut", delay: 2.5 }}
        >
          <div className="word-mask">
            <motion.h1
              className="title"
              initial={{ transform: "rotateY(-0deg) translateY(100%)" }}
              animate={{ transform: "rotateY(0deg) translateY(0%)" }}
              transition={{ duration: 0.8, ease: "easeInOut" }}
            >
              {/* PERCEPTI<img className="eye" src={eye_gif}></img>N */}
              PERCEPTI
              <img className="eye" src={started ? eye_gif : eye}></img>
              {/* <video
                className="eye"
                autoPlay
                muted
                loop={started ? false : true}
              >
                <source src={eye_vid} type="video/mp4"></source>
                Your browser does not support the video tag.
              </video> */}
              N
            </motion.h1>
          </div>
          <motion.h2
            variants={variants_description}
            initial="active"
            animate={started ? "normal" : "active"}
            transition={{ duration: 0.5, ease: "easeInOut", delay: 0 }}
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
        {/* <Game /> */}
        <Routes>
          <Route path="/" element={<Game></Game>}></Route>
          <Route
            path="/leaderboard"
            element={<Leaderboard isCentered={true} />}
          ></Route>
        </Routes>
        <Footer></Footer>
      </div>
    </>
  );
}

export default App;

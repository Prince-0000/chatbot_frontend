import React, { useState, useEffect } from 'react';
import { Canvas } from "@react-three/fiber";
import { Leva } from "leva";
import { Experience } from "./components/Experience";

import Mic from './audio/mic';
import { AudioProvider } from "./audio/AudioContext";

function App() {
  const [selectedAvatar, setSelectedAvatar] = useState('Emma');
  const [resetCanvas, setResetCanvas] = useState(false);

  const handleCardSelection = (avatar) => {
    setSelectedAvatar(avatar);
  }

  const handleGoBack = () => {
    setSelectedAvatar(null);
    setResetCanvas(true);
  }

  useEffect(() => {
    if (resetCanvas) {
      setResetCanvas(false);
    }
  }, [resetCanvas]);

  return (
    <>
      <Mic />
      <Leva hidden />

      <Canvas key={resetCanvas} shadows camera={{ position: [0, 0, 1], fov: 30 }}>
        <Experience selectedAvatar={selectedAvatar} />
      </Canvas>
    </>
  );
}

export default App;

import React, { useState, useEffect } from 'react';
import { Canvas } from "@react-three/fiber";
import { Leva } from "leva";
import { Experience } from "./components/Experience";
import { Card } from './components/Card';
import { UI } from "./components/UI";
import Mic from './mic';

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
      <Leva  />
      
      

      {/* {selectedAvatar !== null && <UI onGoBack={handleGoBack} />} */}

      <Canvas key={resetCanvas} shadows camera={{ position: [0, 0, 1], fov: 30 }}>
        <Experience selectedAvatar={selectedAvatar} />
      </Canvas>
    </>
  );
}

export default App;

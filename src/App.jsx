import React, { useState, useEffect } from 'react';
import { Canvas } from "@react-three/fiber";
import { Leva } from "leva";
import { Experience } from "./components/Experience";
import { Card } from './components/Card';
import { UI } from "./components/UI";

function App() {
  const [selectedAvatar, setSelectedAvatar] = useState(null);
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
      <Leva  />
      {selectedAvatar === null ? (
        <div className='container'>
          <Card 
            imgsrc="/radhika.png" 
            name="Radhika" 
            title="Hi I'm Radhika, your virtual girlfriend." 
            onSelect={() => handleCardSelection('Emma')} 
          />
          <Card 
            imgsrc="/maxxa.png" 
            name="Maxxa" 
            title="Hi I'm Maxxa, your virtual buddy." 
            onSelect={() => handleCardSelection('Maxxa')}
          />
          <Card 
            imgsrc="/chacha.png" 
            name="Chacha" 
            title="Hi I'm Chacha, your virtual old advisor." 
            onSelect={() => handleCardSelection('Chacha')} 
          />
        </div>
      ) : null}

      {selectedAvatar !== null && <UI onGoBack={handleGoBack} />}

      <Canvas key={resetCanvas} shadows camera={{ position: [0, 0, 1], fov: 30 }}>
        <Experience selectedAvatar={selectedAvatar} />
      </Canvas>
    </>
  );
}

export default App;

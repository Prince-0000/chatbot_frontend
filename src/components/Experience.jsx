import {
  CameraControls,
  ContactShadows,
  Environment,
  Text,
} from "@react-three/drei";
import { Suspense, useEffect, useRef, useState } from "react";
import { useChat } from "../hooks/useChat";
import { Chacha } from "./Chacha";
import { Maxxa } from "./Maxxa";
import { Radhika } from "./Radhika";
import { Canvas, useThree } from "@react-three/fiber";

const Dots = (props) => {
  const { loading } = useChat();``
  const [loadingText, setLoadingText] = useState("");
  useEffect(() => {
    if (loading) {
      const interval = setInterval(() => {
        setLoadingText((loadingText) => {
          if (loadingText.length > 2) {
            return ".";
          }
          return loadingText + ".";
        });
      }, 800);
      return () => clearInterval(interval);
    } else {
      setLoadingText("");
    }
  }, [loading]);
  if (!loading) return null;
  return (
    <group {...props}>
      <Text fontSize={0.14} anchorX={"left"} anchorY={"bottom"}>
        {loadingText}
        <meshBasicMaterial attach="material" color="black" />
      </Text>
    </group>
  );
};

export const Experience = ({ selectedAvatar }) => {
  const cameraControls = useRef();
  const { cameraZoomed } = useChat();
  const { gl } = useThree(); // Get access to the WebGLRenderer

  // Function to handle context loss
  const handleContextLost = (event) => {
    // Handle context loss, clean up resources
    // For example, dispose of textures, geometries, and materials
    // Clear the WebGLRenderer context and release resources
    gl.dispose();
  };

  // Function to handle context restoration
  const handleContextRestored = (event) => {
    // Handle context restoration, recreate necessary resources
    // Reinitialize textures, geometries, materials, etc.
    // Your initialization code here
  };

  useEffect(() => {
    cameraControls.current.setLookAt(0, 2, 5, 0, 1.5, 0);

    // Add event listeners for context loss and restoration
    gl.domElement.addEventListener('webglcontextlost', handleContextLost, false);
    gl.domElement.addEventListener('webglcontextrestored', handleContextRestored, false);

    return () => {
      // Remove event listeners when the component is unmounted
      gl.domElement.removeEventListener('webglcontextlost', handleContextLost);
      gl.domElement.removeEventListener('webglcontextrestored', handleContextRestored);
    };
  }, [gl]);





  useEffect(() => {
    cameraControls.current.setLookAt(0, 2, 5, 0, 1.5, 0);
  }, []);

  useEffect(() => {
    if (cameraZoomed) {
      cameraControls.current.setLookAt(0, 1.5, 1.5, 0, 1.5, 0, true);
    } else {
      cameraControls.current.setLookAt(0, 2.2, 5, 0, 1.0, 0, true);
    }
  }, [cameraZoomed]);
  return (
    <>
      <CameraControls ref={cameraControls} />
      <Environment files="/venice_sunset_1k.hdr"/>
      {/* Wrapping Dots into Suspense to prevent Blink when Troika/Font is loaded */}
      <Suspense>
        <Dots position-y={1.75} position-x={-0.02} />
      </Suspense>
      {selectedAvatar === 'Emma' && <Radhika />}
      {selectedAvatar === 'Maxxa' && <Maxxa />}
      {selectedAvatar === 'Chacha' && <Chacha />}
      <ContactShadows opacity={0.7} />
    </>
  );
};

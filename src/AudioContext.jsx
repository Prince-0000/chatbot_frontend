// AudioContext.js
import { createContext, useContext, useState } from "react";

const AudioContext = createContext();

export const useAudioContext = () => {
  return useContext(AudioContext);
};

export const AudioProvider = ({ children }) => {
  const [isRecording, setIsRecording] = useState(false);
  const [audioURL, setAudioURL] = useState(null);
  const [message, setMessage] = useState(null);

  return (
    <AudioContext.Provider value={{ isRecording, setIsRecording, audioURL, setAudioURL, message, setMessage }}>
      {children}
    </AudioContext.Provider>
  );
};

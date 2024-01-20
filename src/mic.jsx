import React, { useState, useRef } from "react";
import { useEffect } from "react";
import { FaMicrophone, FaStop } from "react-icons/fa";

function Mic() {
  const [isRecording, setIsRecording] = useState(false);
  const [audioURL, setAudioURL] = useState(null);

  const mediaRecorder = useRef(null);
  const chunks = useRef([]);

  const startRecording = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      mediaRecorder.current = new MediaRecorder(stream);

      mediaRecorder.current.ondataavailable = (e) => {
        if (e.data.size > 0) {
          chunks.current.push(e.data);
        }
      };

      mediaRecorder.current.onstop = async () => {
        const blob = new Blob(chunks.current, { type: "audio/wav" });

        const audioFile = new File([blob], "userVoiceInput", {
          type: "audio/mpeg",
        });
        const formData = new FormData();
        formData.append("file", audioFile);

        const requestOptions = {
          method: "POST",
          body: formData,
        };

        try {
          const response = await fetch(
            "http://localhost:8000/voice-assistant/audio-message",
            requestOptions
          );

          if (response.ok) {
            const audioBlob = await response.blob();
            setAudioURL(URL.createObjectURL(audioBlob));
          } else {
            console.error("Failed to fetch audio:", response.status, response.statusText);
          }
        } catch (error) {
          console.error("Error handling user voice data:", error);
        }
      };

      mediaRecorder.current.start();
      setIsRecording(true);
    } catch (error) {
      console.error("Error accessing microphone:", error);
    }
  };

  const stopRecording = () => {
    if (mediaRecorder.current && mediaRecorder.current.state !== "inactive") {
      mediaRecorder.current.stop();
      setIsRecording(false);
      chunks.current = [];
    }
  };

  return (
    <div className="App">
      <h1>Voice Recorder</h1>
      <div>
        <button onClick={startRecording} disabled={isRecording}>
          <FaMicrophone />
        </button>
        <button onClick={stopRecording} disabled={!isRecording}>
          <FaStop />
        </button>
      </div>
      {audioURL && (
        <div>
          <h2>Recorded Audio:</h2>
          <audio controls src={audioURL} />
        </div>
      )}
    </div>
  );
}

export default Mic;

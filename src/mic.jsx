import React, { useState } from "react";
import { PiWaveformBold } from "react-icons/pi";
import { useAudioContext } from "./AudioContext";
import { AudioRecorder, useAudioRecorder } from "react-audio-voice-recorder";

function Mic() {
  const { audioURL, setAudioURL, setMessage } = useAudioContext();
  const recorderControls = useAudioRecorder();
  const [loading, setLoading] = useState(false);

  const onAudioRecordingComplete = async (blob) => {
    setLoading(true);

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
        console.log(response.status);
        setMessage(response.status);
        const audioBlob = await response.blob();
        setAudioURL(URL.createObjectURL(audioBlob));
      } else {
        console.error(
          "Failed to fetch audio:",
          response.status,
          response.statusText
        );
      }
    } catch (error) {
      console.error("Error handling user voice data:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed bottom-12 right-1/2 z-50">
      <div className="fixed bottom-12 right-1/2">
        <AudioRecorder
          className=''
          onRecordingComplete={onAudioRecordingComplete}
          recorderControls={recorderControls}
        />
        {recorderControls.isRecording && (
          <button onClick={recorderControls.stopRecording}></button>
        )}
      </div>
      {loading && <p className="font-mono fixed left-[34rem] top-[3rem] font-medium text-black">Thinking..please wait</p>}
      {audioURL && !loading && (
        <div className='mb-10'>
          {/* <h2>Recorded Audio:</h2> */}
          <audio controls autoPlay src={audioURL} />
        </div>
      )}
    </div>
  );
}

export default Mic;

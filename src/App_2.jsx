import React, { useState, useRef } from "react";

const App = () => {
  const [isRecording, setIsRecording] = useState(false);
  const [recordedVideoUrl, setRecordedVideoUrl] = useState(null);
  const mediaRecorderRef = useRef(null);
  const recordedChunksRef = useRef([]);

  const startRecording = async () => {
    try {
      // Request screen capture
      const stream = await navigator.mediaDevices.getDisplayMedia({
        video: true,
        audio: false, // iOS typically doesn't allow audio capture
      });

      // Set up MediaRecorder
      mediaRecorderRef.current = new MediaRecorder(stream, {
        mimeType: "video/webm; codecs=vp9",
      });

      // Collect data chunks
      mediaRecorderRef.current.ondataavailable = (event) => {
        if (event.data.size > 0) {
          recordedChunksRef.current.push(event.data);
        }
      };

      // Handle stop event
      mediaRecorderRef.current.onstop = () => {
        const blob = new Blob(recordedChunksRef.current, { type: "video/webm" });
        const url = URL.createObjectURL(blob);
        setRecordedVideoUrl(url);
        recordedChunksRef.current = []; // Clear for future recordings
      };

      mediaRecorderRef.current.start();
      setIsRecording(true);
    } catch (error) {
      console.error("Error starting screen recording:", error);
      alert("Screen recording is not supported or permission was denied.");
    }
  };

  const stopRecording = () => {
    if (mediaRecorderRef.current) {
      mediaRecorderRef.current.stop();
      setIsRecording(false);
    }
  };

  return (
    <div style={{ padding: "20px", textAlign: "center" }}>
      <h1>Screen Recorder</h1>
      {!isRecording && (
        <button onClick={startRecording} style={{ padding: "10px 20px", marginRight: "10px" }}>
          Start Recording
        </button>
      )}
      {isRecording && (
        <button onClick={stopRecording} style={{ padding: "10px 20px" }}>
          Stop Recording
        </button>
      )}

      {recordedVideoUrl && (
        <div style={{ marginTop: "20px" }}>
          <h2>Recorded Video:</h2>
          <video controls src={recordedVideoUrl} style={{ width: "100%", maxWidth: "600px" }}></video>
        </div>
      )}
    </div>
  );
};

export default App;

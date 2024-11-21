import { useState, useEffect, useRef } from "react";

/*
[] record screen
[] access camera
[] record video
[] take photos
[] record GPS position
*/

function App() {
  const videoRef = useRef(null);
  const [error, setError] = useState("");
  const [aspectRatio, setAspectRatio] = useState(null);

  useEffect(() => {
    // Request access to the camera
    const getCameraStream = async () => {
      try {
        const stream = await navigator.mediaDevices.getUserMedia({ video: true });
        if (videoRef.current) {
          videoRef.current.srcObject = stream;
        }
      } catch (err) {
        console.error("Error accessing the camera:", err);
        setError("Camera access is required. Please enable permissions.");
      }
    };

    getCameraStream();

    // Calculate aspect ratio when the video metadata is loaded
    const onMetadataLoaded = () => {
      const video = videoRef.current;
      if (video) {
        const width = video.videoWidth;
        const height = video.videoHeight;
        const ratio = width / height;
        setAspectRatio(ratio);
      }
    };

    if (videoRef.current) {
      videoRef.current.addEventListener("loadedmetadata", onMetadataLoaded);
    }

    // Cleanup: stop the video stream when the component unmounts
    return () => {
      if (videoRef.current && videoRef.current.srcObject) {
        const tracks = videoRef.current.srcObject.getTracks();
        tracks.forEach((track) => track.stop());
      }
    };
  }, []);

  // let mediaRecorder;
  // let recordedChunks = [];

  async function startRecording() {
    console.log("recording");
  }

  return (
    <>
      <div style={{ backgroundColor: "red" }}>
        <button id="startRecording" onClick={() => startRecording}>
          Record
        </button>
        <button id="stopRecording">Stop</button>
      </div>
      <div>
        <video ref={videoRef} autoPlay></video>
        {/* <iframe src="https://connect.ap.app.pam.co/?navmapId=9be4fec5-1945-11ee-9083-0a17c8c3f95c" allow="geolocation; accelerometer;  gyroscope; magnetometer"></iframe> */}
      </div>
    </>
  );
}

export default App;

import { useState, useEffect, useRef } from "react";

/*
[] record screen
[] access camera
[] record video
[] take photos
[] record GPS position


navigator.mediaDevices
        .getUserMedia({
          video: {
            facingMode: "environment", // This sets the front-facing camera
          },
        })
        .then(function (stream) {
          document.getElementById("video").srcObject = stream;
        })
        .catch(function (err) {
          console.error("Camera access denied:", err);
        });


*/

function App() {
  const videoRef = useRef(null);
  const [error, setError] = useState("");
  const [aspectRatio, setAspectRatio] = useState(null);

  async function startRecording() {
    console.log("recording");
  }

  return (
    <>
      <div style={{ backgroundColor: "red", height: "30px" }}>
        <button id="startRecording" onClick={() => startRecording}>
          Record
        </button>
        <button id="stopRecording">Stop</button>
      </div>
      <div style={{ width: "100%", display: "flex", backgroundColor: "blue", flex: 1 }}>
        {/* <video ref={videoRef} autoPlay muted /> */}

        <iframe src="https://connect.ap.app.pam.co/?navmapId=9be4fec5-1945-11ee-9083-0a17c8c3f95c" allow="geolocation; accelerometer;  gyroscope; magnetometer"></iframe>
      </div>
    </>
  );
}

export default App;

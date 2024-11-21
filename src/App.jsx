import { useState, useEffect, useRef } from "react";

/*
[] record screen
[X] access camera
[X] record video
[] take photos
[] record GPS position

*/

function App() {
  // const videoRef = useRef(null);
  const [error, setError] = useState("");
  const [aspectRatio, setAspectRatio] = useState(null);

  let mediaRecorder;
  let recordedChunks = [];

  async function recordScreen() {
    const displayStream = await navigator.mediaDevices.getDisplayMedia({
      video: true,
      audio: false, // Set to true if you want to capture audio as well
    });

    mediaRecorder = new MediaRecorder(displayStream);

    mediaRecorder.ondataavailable = (event) => {
      if (event.data.size > 0) {
        recordedChunks.push(event.data);
      }
    };

    mediaRecorder.onstop = () => {
      const videoBlob = new Blob(recordedChunks, { type: "video/webm" });

      const formData = new FormData();
      const currentTime = new Date();
      const formattedTime = currentTime.toISOString().replace(/[:.-]/g, "_"); // Format the time to a valid filename
      const fileName = `journeyRecording_${formattedTime}.webm`; // Create a filename using the formatted time

      formData.append("video", videoBlob, fileName); // Add Blob with filename
      fetch("https://5e16-14-202-115-138.ngrok-free.app/upload", {
        method: "POST",
        body: formData, // Send FormData with the Blob
      })
        .then((response) => response.json()) // Handle the response
        .then((data) => {
          console.log("Success:", data); // Handle success
        })
        .catch((error) => {
          console.error("Error:", error); // Handle error
        });
    };

    mediaRecorder.start();
    document.getElementById("startRecording").disabled = true;
    document.getElementById("stopRecording").disabled = false;
  }

  function stopRecording() {
    mediaRecorder.stop();
    document.getElementById("startRecording").disabled = false;
    document.getElementById("stopRecording").disabled = true;
  }

  return (
    <>
      <div style={{ backgroundColor: "red", height: "30px" }}>
        <button id="startRecording" onClick={() => recordScreen()}>
          Record
        </button>
        <button id="stopRecording" onClick={() => stopRecording()}>
          Stop
        </button>
      </div>
      <div id="explorer">
        <iframe src="https://connect.ap.app.pam.co/?navmapId=9be4fec5-1945-11ee-9083-0a17c8c3f95c" allow="geolocation; accelerometer;  gyroscope; magnetometer"></iframe>
      </div>
    </>
  );
}

export default App;

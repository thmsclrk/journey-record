import { useState, useEffect } from "react";

/*
[x] record screen
[x] access camera
[x] record video
[] take photos
[] record GPS position

*/

function App() {
  // const videoRef = useRef(null);
  const [error, setError] = useState("");
  const [aspectRatio, setAspectRatio] = useState(null);
  const [mediaRecorder, setMediaRecord] = useState(null);

  let recordedChunks = [];

  useEffect(() => {
    if (!mediaRecorder) return;

    mediaRecorder.ondataavailable = (event) => {
      if (event.data.size > 0) {
        console.log("recording screen");
        recordedChunks.push(event.data);
      }
    };

    mediaRecorder.onstop = () => {
      const blob = new Blob(recordedChunks, { type: "video/webm" });

      const formData = new FormData();

      formData.append("video", blob, "test.webm");

      fetch("https://5e16-14-202-115-138.ngrok-free.app/upload", {
        method: "POST",
        body: formData, // Send FormData with the Blob
      })
        .then((response) => response.json()) // Handle the response
        .then((data) => {
          console.log("success: ", data);
          // alert("Success, it worked.");
        })
        .catch((error) => {
          console.error("Error:", error);
          alert("Error when uploading file");
        });
    };
  }, [mediaRecorder]);

  async function recordScreen() {
    try {
      const displayStream = await navigator.mediaDevices.getDisplayMedia({
        video: true,
        audio: false, // Set to true if you want to capture audio as well
      });

      const mediaRecorder = new MediaRecorder(displayStream, { mimeType: "video/webm;codecs=vp8" });

      setMediaRecord(mediaRecorder);

      mediaRecorder.start(10);

      document.getElementById("startRecording").disabled = true;
      document.getElementById("stopRecording").disabled = false;
    } catch (error) {
      console.error("error when trying to recording screen: ", JSON.stringify(error));
    }
  }

  function stopRecording() {
    try {
      mediaRecorder.stop();
      document.getElementById("startRecording").disabled = false;
      document.getElementById("stopRecording").disabled = true;
    } catch (error) {
      console.error("error when stopping recording screen: ", error);
    }
  }

  return (
    <>
      <div className="controls">
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

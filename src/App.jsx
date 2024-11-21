import { useState, useEffect, useRef } from "react";

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
      console.log("recording screen");
      if (event.data.size > 0) {
        recordedChunks.push(event.data);
        console.log("test: ", event.data);
        const formData = new FormData();
        // const videoBlob = new Blob([event.data], { type: "video/mkv" });
        formData.append("video", event.data, "test.webm"); // Add Blob with filename

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
            // alert("Error when uploading file");
          });
      }
    };

    // mediaRecorder.onstop = () => {
    //   console.log(recordedChunks);
    // };
  }, [mediaRecorder]);

  async function recordScreen() {
    const displayStream = await navigator.mediaDevices.getDisplayMedia({
      video: true,
      audio: false, // Set to true if you want to capture audio as well
    });

    const mediaRecorder = new MediaRecorder(displayStream, { mimeType: "video/webm;codecs=vp8" });

    setMediaRecord(mediaRecorder);

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

import { useState } from "react";
import ExpandCircleDownRounded from "@mui/icons-material/ExpandCircleDownRounded";
import LoopIcon from "@mui/icons-material/Loop";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import InfoIcon from "@mui/icons-material/Info";

export default function Controls() {
  const [open, setOpen] = useState(false);
  const [cameraMode, setCameraMode] = useState();

  function swapCamera() {
    navigator.mediaDevices
      .getUserMedia({ video: true }) // Request video stream
      .then((stream) => {
        const videoTrack = stream.getVideoTracks()[0];
        const settings = videoTrack.getSettings();
        console.log(settings.facingMode);
        setCameraMode(settings.facingMode === "user" ? "environment" : "user");
        navigator.mediaDevices
          .getUserMedia({
            video: {
              facingMode: cameraMode, // This sets the front-facing camera
            },
          })
          .then(function (stream) {
            document.getElementById("video").srcObject = stream;
          })
          .catch(function (err) {
            console.error("Camera access denied:", err);
          });
      })
      .catch((err) => {
        console.error("Error accessing media devices:", err);
      });
  }

  function uploadRecording() {
    const isConfirmed = window.confirm("Taking you to the UTS Google Drive folder. Please ensure you have recorded a journey.");
    if (isConfirmed) {
      window.location.href = "https://drive.google.com/drive/folders/1eFO4WMIVwiT_yd2AbrEhLbX92kl_iLlh";
    }
  }

  function showInfo() {
    alert("PAM Journey Recording App v0.1.0");
  }

  return (
    <div className="controls draggable">
      <div className="control">
        <ExpandCircleDownRounded
          style={{
            color: "#3f6",
            transform: `rotate(${open ? 180 : 0}deg)`, // Correctly formatted rotation
          }}
          onClick={() => {
            setOpen(!open);
          }}
        />
      </div>
      {open && (
        <>
          <div className="control">
            <LoopIcon style={{ color: "#3f6" }} onClick={() => swapCamera()} />
          </div>
          <div className="control">
            <CloudUploadIcon style={{ color: "#3f6" }} onClick={() => uploadRecording()} />
          </div>
          <div className="control">
            <InfoIcon style={{ color: "#3f6" }} onClick={() => showInfo()} />
          </div>
        </>
      )}
    </div>
  );
}

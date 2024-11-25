import { useState } from "react";
import ExpandCircleDownRounded from "@mui/icons-material/ExpandCircleDownRounded";
import LoopIcon from "@mui/icons-material/Loop";

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

  return (
    <div className="controls" draggable="true">
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
        </>
      )}
    </div>
  );
}

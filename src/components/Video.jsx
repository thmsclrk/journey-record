import React, { useEffect, useRef } from "react";

export default function Video() {
  const videoContainerRef = useRef(null);
  const videoRef = useRef(null);

  useEffect(() => {
    // Access the camera and stream to video
    navigator.mediaDevices
      .getUserMedia({
        video: {
          facingMode: "environment", // Use back-facing camera
        },
      })
      .then((stream) => {
        if (videoRef.current) {
          videoRef.current.srcObject = stream;
        }
      })
      .catch((err) => {
        console.error("Camera access denied:", err);
      });
  }, []);

  useEffect(() => {
    const draggable = videoContainerRef.current;
    let offsetX = 0;
    let offsetY = 0;

    const startDrag = (e) => {
      e.preventDefault();

      if (e.type === "mousedown") {
        offsetX = e.clientX - draggable.offsetLeft;
        offsetY = e.clientY - draggable.offsetTop;
      } else if (e.type === "touchstart") {
        offsetX = e.touches[0].clientX - draggable.offsetLeft;
        offsetY = e.touches[0].clientY - draggable.offsetTop;
      }

      const moveDrag = (e) => {
        let x, y;

        if (e.type === "mousemove") {
          x = e.clientX - offsetX;
          y = e.clientY - offsetY;
        } else if (e.type === "touchmove") {
          x = e.touches[0].clientX - offsetX;
          y = e.touches[0].clientY - offsetY;
        }

        draggable.style.left = `${x}px`;
        draggable.style.top = `${y}px`;
      };

      const endDrag = () => {
        document.removeEventListener("mousemove", moveDrag);
        document.removeEventListener("mouseup", endDrag);
        document.removeEventListener("touchmove", moveDrag);
        document.removeEventListener("touchend", endDrag);
      };

      document.addEventListener("mousemove", moveDrag);
      document.addEventListener("mouseup", endDrag);
      document.addEventListener("touchmove", moveDrag);
      document.addEventListener("touchend", endDrag);
    };

    draggable.addEventListener("mousedown", startDrag);
    draggable.addEventListener("touchstart", startDrag);

    return () => {
      draggable.removeEventListener("mousedown", startDrag);
      draggable.removeEventListener("touchstart", startDrag);
    };
  }, []);

  return (
    <div ref={videoContainerRef} id="videoContainer">
      <video ref={videoRef} autoPlay muted playsInline></video>
    </div>
  );
}

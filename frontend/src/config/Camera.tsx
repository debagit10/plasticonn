import React, { useEffect, useRef, useState } from "react";

const Camera = () => {
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [capturedImage, setCapturedImage] = useState<string | null>(null);

  // Start camera for capturing a picture
  const startCamera = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ video: true }); // Access the camera
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
      } else {
        console.error("Video element is not available.");
      }
    } catch (err) {
      console.error("Error accessing camera: ", err);
    }
  };

  // Capture the picture from the video stream
  const captureImage = () => {
    const video = videoRef.current;
    const canvas = canvasRef.current;

    // Check if videoRef and canvasRef are available
    if (!video || !canvas) {
      console.error("Video or canvas not available.");
      return;
    }

    // Ensure video metadata (e.g., dimensions) is loaded before capturing the image
    if (video.readyState >= 2) {
      // HAVE_CURRENT_DATA or higher
      canvas.width = video.videoWidth;
      canvas.height = video.videoHeight;
      const context = canvas.getContext("2d");
      if (context) {
        context.drawImage(video, 0, 0, canvas.width, canvas.height);

        // Stop the camera stream after capturing the image
        const stream = video.srcObject as MediaStream;
        const tracks = stream.getTracks();
        tracks.forEach((track) => track.stop());

        const imageDataURL = canvas.toDataURL("image/png"); // Get the captured image as a data URL
        setCapturedImage(imageDataURL); // Save the captured image for preview
      } else {
        console.error("Canvas context is not available.");
      }
    } else {
      console.error("Video stream is not ready yet.");
    }
  };

  useEffect(() => {
    // Clean up the camera stream when the component unmounts
    return () => {
      const video = videoRef.current;
      if (video && video.srcObject) {
        const stream = video.srcObject as MediaStream;
        const tracks = stream.getTracks();
        tracks.forEach((track) => track.stop());
      }
    };
  }, []);

  return (
    <div>
      <div>
        <video
          ref={videoRef}
          autoPlay
          playsInline
          style={{ display: capturedImage ? "none" : "block" }}
        />
        <button onClick={startCamera}>Start Camera</button>
        <button onClick={captureImage}>Capture Image</button>
        {capturedImage && (
          <div>
            <canvas ref={canvasRef} style={{ display: "none" }} />
            <img src={capturedImage} alt="Captured" />
          </div>
        )}
      </div>
    </div>
  );
};

export default Camera;

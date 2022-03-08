import { useEffect, useState, useRef } from "react";
import {
  loadTinyFaceDetectorModel,
  detectSingleFace,
  TinyFaceDetectorOptions,
  resizeResults,
  matchDimensions,
  draw,
  loadFaceLandmarkTinyModel,
} from "face-api.js";

const WebcamComp = ({ setData }) => {
  const [video, setVideo] = useState(null);
  const [canvas, setCanvas] = useState(null);
  const [detected, setDetected] = useState(false);
  const [camera, setCamera] = useState(false);
  const videoRef = useRef(null);
  const canvasRef = useRef(null);

  useEffect(() => {
    setVideo(videoRef.current);
    setCanvas(canvasRef.current);
  }, []);

  const start = async () => {
    await launchCamera();
    const recognition = makeRecognition();
    await recognition.init();
    recognition.start();
  };

  const getFaceDetectorOptions = () =>
    new TinyFaceDetectorOptions({ inputSize: 224, scoreThreshold: 0.5 });

  const makeRecognition = () => {
    let ctx;

    const init = async () => {
      await loadTinyFaceDetectorModel(`models`);
      await loadFaceLandmarkTinyModel("models");
      ctx = canvas.getContext("2d");
    };

    const start = async () => {
      await wait(0);
      if (video.readyState === 4) {
        const faces = await detectSingleFace(video, getFaceDetectorOptions());

        if (faces) {
          setDetected(true);

          const dims = matchDimensions(canvas, video, true);
          const resizedResults = resizeResults(faces, dims);
          if (true) {
            draw.drawDetections(canvas, resizedResults);
          }
        } else {
          setDetected(false);
          ctx.clearRect(0, 0, video.videoWidth, video.videoHeight);
        }
      }
      start();
    };

    return { init, start };
  };

  const launchCamera = () =>
    new Promise((resolve) => {
      navigator.mediaDevices
        .getUserMedia({
          audio: false,
          video: {
            mandatory: {
              minWidth: 320,
              maxWidth: 320,
              minHeight: 240,
              maxHeight: 240,
              minFrameRate: 1,
              maxFrameRate: 10,
            },
          },
        })
        .then(
          (stream) => {
            video.srcObject = stream;
            video.play();
            setCamera(true);
            resolve();
          },
          () => {}
        );
    });

  const Takesnapshot = () => {
    let contextz = canvas.getContext("2d");
    contextz.drawImage(video, 0, 0, canvas.width, canvas.height);
    let selfie = contextz.canvas.toDataURL();
    console.log(selfie);
    setData((prev) => ({ ...prev, selfie: selfie }));
  };

  const initialSeconds = 3;
  const [seconds, setSeconds] = useState(initialSeconds);
  useEffect(() => {
    let myInterval = setInterval(() => {
      if (seconds > 0) {
        setSeconds(seconds - 1);
      }
    }, 1000);
    return () => {
      clearInterval(myInterval);
    };
  });

  const scan = () => {
    if (setTimeout(() => Takesnapshot(), 3000)) return;
  };

  // {(!camera && photoUpload() ? start(): '')}
  // {!camera && (
  //   <button className="button1 scan" onClick={()=> {
  //     start();
  
  //     }}
  //     >
  //     Launch Camera
  //   </button>
  //   )}
  return (
    <div>
      <video ref={videoRef} className="Video" />
      <canvas ref={canvasRef} className="Video" />
  {/* <button className="scan" onClick={start}>Scan</button> */}
      {/* {camera && detected ? scan() : console.log("")} */}
    </div>
  );
};

const wait = (time) => new Promise((resolve) => setTimeout(resolve, time));

export default WebcamComp;

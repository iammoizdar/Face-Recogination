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
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
const WebcamComp = ({ setData, runfunction }) => {
  const [video, setVideo] = useState(null);
  const [canvas, setCanvas] = useState(null);
  const [detected, setDetected] = useState(false);
  const [camera, setCamera] = useState(false);
  const videoRef = useRef(null);
  const canvasRef = useRef(null);

  let navigate = useNavigate();
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
    setCamera(false);
    setDetected(false);
  };
  const scan = async () => {
    // if (setTimeout(() => Takesnapshot(), 3000)) return;
    // if (Takesnapshot) document.getElementById("webcam").style.display = "none";
    // setTimeout(() => Takesnapshot(), 5000);

    // var x = document.getElementById("webcam");
    // if (snapshot) {
    //   x.style.display = "none";
    //   launchCamera()
    // }

    await Takesnapshot();
    // if (Takesnapshot) return;

    if (Takesnapshot) handleClick();
    return;
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
  function handleClick() {
    navigate("/Validation", { replace: true });
  }

  !camera && start();
  return (
    <div className="card">
      <div className="webcam" id="webcam">
        <video ref={videoRef} className="Video" />
        <canvas ref={canvasRef} className="Video" />
      </div>

      {/* {scan() ? (document.getElementById("webcam").style.display = "none") : ""} */}
      {detected ? scan() : console.log("notdetected")}

      <div>
        <Link className="button1" to="/">
          Back
        </Link>
      </div>
    </div>
  );
};

const wait = (time) => new Promise((resolve) => setTimeout(resolve, time));

export default WebcamComp;

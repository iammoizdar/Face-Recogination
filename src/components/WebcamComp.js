import React, { useEffect, useState, useRef } from "react";
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

const WebcamComp = ({ setData, data, runfunction }) => {
  // const { data } = React.useContext(DataContext);
  // console.log(data);

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
  // const work = () => {
  //   if (Takesnapshot) {
  //     navigate("/Validation", { replace: true });
  //     runfunction();
  //   }
  // };
  const Takesnapshot = () => {
    let contextz = canvas.getContext("2d");
    contextz.drawImage(video, 0, 0, canvas.width, canvas.height);
    let selfie = contextz.canvas.toDataURL();

    setData((prev) => ({ ...prev, selfie: selfie }));
    setCamera(false);
    setDetected(false);
  };

  // function handleClick() {
  //   console.log("handleClick: ---");
  //   navigate("/Validation", { replace: true });
  //   // setTimeout(() => runfunction(), 3000);
  //   // if (runfunction()) return;
  //   runfunction();
  // }

  // const scan = async () => {
  //   console.log("scan: ---");
  //   // setTimeout(() => Takesnapshot(), 3000);
  //   await wait(2000);
  //   Takesnapshot();

  //   // if (Takesnapshot) handleClick();
  // };

  // const f = async () => {
  //   if (detected) {
  //     await wait(2000);
  //     scan();
  //   } else console.log("not working");
  // };
  // f();
  console.log("data", data);

  async function scan() {
    await wait(2000);
    Takesnapshot();

    if (Takesnapshot) {
      navigate("/Validation", { replace: true });

      runfunction();
    }
  }

  useEffect(() => {
    if (detected) {
      scan();
      setCamera(null);
      setVideo(null);
    }
  }, [detected]);

  // setInterval(() => {
  //   Takesnapshot();
  // }, 2000);

  !camera && start();
  return (
    <div className="card">
      <div className="webcam" id="webcam">
        <video ref={videoRef} className="Video" />
        <canvas ref={canvasRef} className="Video" />
      </div>
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

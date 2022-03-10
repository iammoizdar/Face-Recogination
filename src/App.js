import React, { useState } from "react";
import "./App.css";

import CardProfile, { Edit } from "./components/CardProfile";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import WebcamComp from "./components/WebcamComp";
import swal from "sweetalert";
// import { DataContext } from "../App";
// export const DataContext = React.createContext();

function App() {
  const [data, setData] = useState({ card_image: "", selfie: "" });

  const runfunction = () => {
    console.log("selfie data", data);
    var axios = require("axios");

    var dataresult = JSON.stringify(data);
    console.log(dataresult);
    // const data={
    //   card_img:'base64card',
    //   camera_img:'base64'
    // }

    var config = {
      method: "post",
      url: "http://192.168.100.25:5000/verification",
      headers: {
        "Content-Type": "application/json",
      },
      data: dataresult,
    };

    axios(config).then(function (response) {
      console.log(JSON.stringify(response.data));
      response.data.is_verified
        ? swal("Match Found!", "Wanna Try Again!", "success")
        : swal("Match Not Found", "Try Again!", "error").catch(function (
            error
          ) {
            console.log(error);
          });
    });
  };
  return (
    <div className="App">
      <BrowserRouter>
        {/* <DataContext.Provider
          value={{
            data,
            setData,
          }}
        > */}
        <Routes>
          <Route path="/" element={<CardProfile setData={setData} />} />
          <Route path="/Validation" element={<Edit name="Back" />} />
          <Route
            path="/Webcam"
            element={
              <WebcamComp
                setData={setData}
                data={data}
                runfunction={runfunction}
              />
            }
          />
        </Routes>
        {/* </DataContext.Provider> */}
      </BrowserRouter>
    </div>
  );
}

export default App;

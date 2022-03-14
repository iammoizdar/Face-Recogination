import React, { useState } from "react";
import "./App.css";
import logo from "./images/logo-plastk.png";
import Loading from "./components/Loading";
import CardProfile, { Edit } from "./components/CardProfile";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import WebcamComp from "./components/WebcamComp";
import swal from "sweetalert";

function App() {
  const [data, setData] = useState({ card_image: "", selfie: "" });

  const runfunction = (selfie) => {
    var axios = require("axios");
    const newData = {
      card_image: data?.card_image,
      selfie: selfie,
    };
    var dataresult = JSON.stringify(newData);
    console.log(dataresult);

    var config = {
      method: "post",
      url: "http://3.97.132.230:5000/verification",
      headers: {
        "Content-Type": "application/json",
      },
      data: dataresult,
    };

    axios(config).then(function (response) {
      let apiresponse = JSON.stringify(response.data);
      console.log(apiresponse);

      response.data.is_verified
        ? swal("Match Found!", "User is verified!", "success")
        : swal(
            "Match Not Found",
            `${JSON.stringify(response.data.message)}`,
            "error"
          ).catch(function (error) {
            console.log(error);
          });
    });
  };

  return (
    <div className="App">
      <div>
        <img className="logo" src={logo} alt="" />
      </div>
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
      </BrowserRouter>
    </div>
  );
}

export default App;

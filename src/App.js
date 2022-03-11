import React, { useState } from "react";
import "./App.css";

import CardProfile, { Edit } from "./components/CardProfile";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import WebcamComp from "./components/WebcamComp";
import swal from "sweetalert";

function App() {
  const [data, setData] = useState({ card_image: "", selfie: "" });
  const runfunction = (selfie) => {
    // console.log("new state one", { data });
    var axios = require("axios");
    const newData = {
      card_image: data?.card_image,
      selfie: selfie,
    };
    var dataresult = JSON.stringify(newData);
    console.log(dataresult);

    var config = {
      method: "post",
      url: "http://192.168.0.103:5000/verification",
      headers: {
        "Content-Type": "application/json",
      },
      data: dataresult,
    };

    axios(config).then(function (response) {
      console.log(JSON.stringify(response.data));
      response.data.is_verified
        ? swal("Match Found!", "Verified!", "success")
        : swal("Match Not Found", "Invalid!", "error").catch(function (error) {
            console.log(error);
          });
    });
  };
  console.log("new state one", { data });

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

import React, { useState } from "react";

const CardUploader = ({ setData }) => {
  const [file, setFile] = useState(null);
  const [base64Url, setBase64Url] = useState("");

  const getBase64 = (file) => {
    return new Promise((resolve) => {
      let baseURL = "";
      setBase64Url(baseURL);
      // Make new FileReader
      let reader = new FileReader();

      // Convert the file to base64 text
      reader.readAsDataURL(file);

      // on reader load somthing...
      reader.onload = () => {
        // Make a fileInfo Object

        baseURL = reader.result;
        console.log(base64Url);
        resolve(baseURL);
      };
    });
  };

  const handleFileInputChange = (e) => {
    setFile(e.target.files[0]);
    getBase64(e.target.files[0])
    // console.log(base64Url)
      .then((card_image) => {
        // file["base64"] = result;
        console.log({ card_image });
        setBase64Url(card_image);
        setFile(e.target.files[0]);
        console.log(file);
        setData((prev) => ({ ...prev, card_image: card_image }));
        // setData((prev)=>({...prev,cameraImg:result}))
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <div>
      <input
        className="choosefile"
        type="file"
        name="file"
        onChange={handleFileInputChange}
      />
    </div>
  );
};

// var axios = require('axios');
//     var data = JSON.stringify(obj);
//     console.log(data)
//     var config = {
//     method: 'post',
//     url: 'http://192.168.0.117:5000/verification',
//     headers: {
//     'Content-Type': 'application/json'
//     },
//     data : data
//     };

//     axios(config)
//     .then(function (response) {
//     console.log(JSON.stringify(response.data));
//     })
//     .catch(function (error) {
//     console.log(error);
//     });

export default CardUploader;

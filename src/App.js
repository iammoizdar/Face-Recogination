import { useState } from 'react';
import './App.css';
import Caruploader from './components/Carduploader';
import WebcamComp from './components/WebcamComp';
function App() {
const [data,setData]=useState({card_image:'',selfie:''})


const runfunction =()=>{
var axios = require('axios');
console.log(data)
var dataresult = JSON.stringify(data);
console.log(dataresult)
// const data={
//   card_img:'base64card',
//   camera_img:'base64'
// }

var config = {
method: 'post',
url: 'http://192.168.0.102:4000/verification',
headers: {
'Content-Type': 'application/json'
},
data : dataresult
};

axios(config)
.then(function (response) {
console.log(JSON.stringify(response.data));
})
.catch(function (error) {
console.log(error);
});
}




  return (
    <div className="App">
    <Caruploader setData={setData}/>
    <WebcamComp setData={setData}/>
    <button onClick={runfunction}>Send</button>
    </div>
  );
}

export default App;

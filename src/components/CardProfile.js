import React from "react";
import { useState } from "react";
import { Link } from "react-router-dom";
const ImgUpload = ({ onChange, src }) => (
  <label htmlFor="photo-upload" className="custom-file-upload fas">
    <div className="img-wrap img-upload">
      <img for="photo-upload" src={src} alt="img" />
    </div>
    <input id="photo-upload" type="file" onChange={onChange} />
  </label>
);

// const Profile =({src})=>
//   <div className="card">
//     <form>
//       <h1>Profile Card</h1>
//       <label className="custom-file-upload fas">
//         <div className="img-wrap" >
//           <img for="photo-upload" src={src}/>
//         </div>
//       </label>
//     </form>
//   </div>

export const Edit = ({ children, name, runfunction }) => (
  <div className="card">
    <form>
      <h1>Card Recognition</h1>
      {children}
      <Link className="button1" to="/Webcam">
        {name}
      </Link>
      <a href="#" className="button1 submit" onClick={runfunction}>
        Submit
      </a>
    </form>
  </div>
);

const CardProfile = ({ setData }) => {
  const [file, setFile] = useState(null);
  const [base64Url, setBase64Url] = useState("");
  const [active, setactive] = useState("edit");
  const [imagePreviewUrl, setImagepreviewUrl] = useState(
    "data:image/png;base64,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"
  );
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

  const photoUpload = (e) => {
    e.preventDefault();
    const reader = new FileReader();
    const filez = e.target.files[0];
    getBase64(e.target.files[0]).then((card_image) => {
      // file["base64"] = result;
      setBase64Url(card_image);
      console.log({ card_image });
      setFile(e.target.files[0]);
      setData((prev) => ({ ...prev, card_image: card_image }));
      reader.onloadend = () => {
        setFile(filez);
        setImagepreviewUrl(reader.result);
      };
      //   onloadend = () => {
      //   this.setState({
      //     file: file,
      //     imagePreviewUrl: reader.result
      //   });
      // }
      reader.readAsDataURL(filez);
    });
  };

  //  const handleSubmit= (e) =>{
  //     e.preventDefault();
  //     let activeP = active === 'edit' ? 'profile' : 'edit';
  //    setactive(activeP)
  //   }

  // const {imagePreviewUrl,
  //        active} = this.state;

  return (
    <div>
      {active === "edit" ? (
        <Edit name="Next">
          <ImgUpload onChange={photoUpload} src={imagePreviewUrl} />
        </Edit>
      ) : (
        ""
      )}
    </div>
  );
};

export default CardProfile;

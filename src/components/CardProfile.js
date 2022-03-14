import React from "react";
import { useState } from "react";
import { Link } from "react-router-dom";

const ImgUpload = ({ onChange, src }) => (
  <label htmlFor="photo-upload" className="custom-file-upload fas">
    <div className="img-wrap img-upload">
      <img src={src} alt="img" />
    </div>
    <input id="photo-upload" type="file" onChange={onChange} />
  </label>
);

export const Edit = ({ children, name }) => (
  <div className="card">
    <form>
      <h1>KYC AUTOMATION</h1>
      {children}
      <Link className="button1" to="/Webcam">
        {name}
      </Link>
    </form>
  </div>
);

const CardProfile = ({ setData }) => {
  const [file, setFile] = useState(null);
  const [base64Url, setBase64Url] = useState("");
  const [active, setactive] = useState("edit");
  const [imagePreviewUrl, setImagepreviewUrl] = useState(
    "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTocm3yhK3NP19WMTR4LdEshi_BRp-86k07rw&usqp=CAU"
  );

  const getBase64 = (file) => {
    return new Promise((resolve) => {
      let baseURL = "";
      setBase64Url(baseURL);
      let reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => {
        baseURL = reader.result;
        resolve(baseURL);
      };
    });
  };

  const photoUpload = (e) => {
    e.preventDefault();
    const reader = new FileReader();
    const filez = e.target.files[0];
    getBase64(e.target.files[0]).then((card_image) => {
      setBase64Url(card_image);
      setFile(e.target.files[0]);
      setData((prev) => ({ ...prev, card_image: card_image }));
      reader.onloadend = () => {
        setFile(filez);
        setImagepreviewUrl(reader.result);
      };
      reader.readAsDataURL(filez);
    });
  };

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

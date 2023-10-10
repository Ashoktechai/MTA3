import React, { useState } from "react";
import classes from "./create.module.css";
import { AiOutlineCloseCircle } from "react-icons/ai";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
const Create = () => {
  const [title, setTitle] = useState("");
  const [desc, setDesc] = useState("");
  const [img, setImg] = useState("");
  const [country, setCountry] = useState("");
  const [type, setType] = useState("");
  const [price, setPrice] = useState(null);
  const [review, setReview] = useState(null);
  const [typeError, setTypeError] = useState(false);
  const { token } = useSelector((state) => state.auth);

  const navigate = useNavigate();

  const changeImg = (e) => {
    setImg(e.target.files[0]);
  };

  const handleCloseImg = () => {
    setImg(null);
  };

  const handleCreateRoom = async (e) => {
    e.preventDefault();

    const acceptableTypes = ["apartment", "penthouse", "bungalow", "villa"];
    if (!acceptableTypes.includes(type)) {
      setTypeError(true);
      setTimeout(() => {
        setTypeError(false);
      }, 10 * 1000);
      return;
    }
    try {
      const formData = new FormData();
      let filename = null;
      if (img) {
        filename = Date.now() + img.name;
        formData.append("filename", filename);
        formData.append("image", img);
        await fetch(`http://localhost:5000/upload/image`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
          method: "POST",
          body: formData,
        });
      }
      const res = await fetch(`http://localhost:5000/room`, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        method: "POST",
        body: JSON.stringify({
          title,
          desc,
          country,
          type,
          photo: filename,
          price,
          review,
        }),
      });
      const newRoom = await res.json();
      navigate(`/typeDetail/${newRoom._id}`);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className={classes.container}>
      <div className={classes.wrapper}>
        <h2 className={classes.title}>Create Room</h2>
        <form onSubmit={handleCreateRoom} encType="multipart/form-data">
          <div className={classes.inputWrapper}>
            <label>Title: </label>
            <input
              type="text"
              onChange={(e) => setTitle(e.target.value)}
              className={classes.input}
              placeholder="Title"
            />
          </div>
          <div className={classes.inputWrapper}>
            <label>Description: </label>
            <input
              type="text"
              onChange={(e) => setDesc(e.target.value)}
              className={classes.input}
              placeholder="Description"
            />
          </div>
          <div className={classes.inputWrapper}>
            <label>Country: </label>
            <input
              type="text"
              onChange={(e) => setCountry(e.target.value)}
              className={classes.input}
              placeholder="Country"
            />
          </div>
          <div className={classes.inputWrapper}>
            <label>Type: </label>
            <input
              type="text"
              onChange={(e) => setType(e.target.value)}
              className={classes.input}
              placeholder="Type"
            />
          </div>
          <div className={classes.inputWrapperImg}>
            <label htmlFor="img" className={classes.fileInputLabel}>
              Image: <span>Upload here</span>
            </label>
            <input
              type="file"
              filename="img"
              id="img"
              onChange={changeImg}
              style={{ display: "none" }}
            />
            {img && (
              <p className={classes.imageName}>
                {img.name}{" "}
                <AiOutlineCloseCircle
                  className={classes.icon}
                  onClick={() => handleCloseImg()}
                />{" "}
              </p>
            )}
          </div>
          <div className={classes.inputWrapper}>
            <label>Price :</label>
            <input
              type="number"
              step={0.01}
              onChange={(e) => setPrice(e.target.value)}
              className={classes.input}
              placeholder="price"
            />
          </div>
          <div className={classes.inputWrapper}>
            <label>Review :</label>
            <input
              type="number"
              min={1}
              max={5}
              step={1}
              onChange={(e) => setReview(e.target.value)}
              className={classes.input}
              placeholder="Review"
            />
          </div>
          <div className={classes.buttonWrapper}>
            <button className={classes.submitBtn}>Create Room</button>
          </div>
        </form>
        {typeError && (
          <div className={classes.errorMessage}>
            Wrong type! Aceptable types are - Apartment, villa, penthouse and
            bungalow
          </div>
        )}
      </div>
    </div>
  );
};

export default Create;

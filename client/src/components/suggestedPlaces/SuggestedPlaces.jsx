import React, { useEffect, useState } from "react";
import classes from "./suggestedPlaces.module.css";
import { useSelector } from "react-redux";
import img from "../../assets/img2.jpg";
import { Link, useParams } from "react-router-dom";
import { AiFillStar } from "react-icons/ai";

const SuggestedPlaces = () => {
  const [estates, setEstates] = useState([]);
  const { token } = useSelector((state) => state.auth);
  useEffect(() => {
    const fetchTypeRooms = async () => {
      try {
        const res = await fetch(`http://localhost:5000/room`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        const data = await res.json();
        setEstates(data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchTypeRooms();
  }, []);

  return (
    <section id="suggested" className={classes.container}>
      <div className={classes.wrapper}>
        <div className={classes.title}>
          <h5 className={classes.subtitle}>Most Visited places</h5>
          <h2 className={classes.title}>
            Favourite destination of our Clients
          </h2>
        </div>
        <div className={classes.places}>
          {estates.map((suggestedPlace) => (
            <Link
              className={classes.place}
              key={suggestedPlace._id}
              to={`/typeDetail/${suggestedPlace._id}`}
            >
              {" "}
              <div className={classes.imgWrapper}>
                <img src={img} />
              </div>
              <div className={classes.titleAndReview}>
                <span>{suggestedPlace.title}</span>
                <span className={classes.review}>
                  <AiFillStar className={classes.section} />{" "}
                  {suggestedPlace.review}
                </span>
              </div>
              <div className={classes.countryAndPrice}>
                <span>
                  Country: <span>{suggestedPlace.country}</span>
                </span>
                <span className={classes.price}>
                  ₹ {suggestedPlace.price} / <span>per person</span>
                </span>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
};

export default SuggestedPlaces;

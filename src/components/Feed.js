import React, { useState } from "react";
import css from "./style.css";
import Sidebar from "./Sidebar";
import Profile from "./Profile";
import Passion from "./Passion";
import EditProfile from "./EditProfile";
import UserMedia from "./UserMedia";
import ArrowForwardIosIcon from "@material-ui/icons/ArrowForwardIos";
import ArrowBackIosIcon from "@material-ui/icons/ArrowBackIos";
import FavoriteIcon from "@material-ui/icons/Favorite";
import FavoriteBorderIcon from "@material-ui/icons/FavoriteBorder";
import CloseIcon from "@material-ui/icons/Close";
import StarOutlineIcon from "@material-ui/icons/StarOutline";
import StarIcon from "@material-ui/icons/Star";

function Feed(props) {
  const [currSlide, setcurrSlide] = useState(1);
  const nextSlide = () => {
    if (currSlide !== UserMedia.length) {
      setcurrSlide(currSlide + 1);
      console.log(currSlide);
    } else if (currSlide === UserMedia.length) {
      setcurrSlide(1);
    }
  };
  const prevSlide = () => {
    if (currSlide !== 1) {
      setcurrSlide(currSlide - 1);
    } else if (currSlide === 1) {
      setcurrSlide(UserMedia.length);
    }
  };
  return (
    <div className="profile">
      <div className="upper feedmax">
        <div className="profilechild lessbottom">
          {UserMedia.map((obj, index) => {
            return (
              <img
                key={obj.id}
                src={obj.url}
                alt="img"
                className={currSlide === index + 1 ? "fade" : "slide"}
              />
            );
          })}
          {/* <img
            src="https://images.unsplash.com/photo-1618721405821-80ebc4b63d26?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8Nnx8ZmVtYWxlJTIwbW9kZWx8ZW58MHx8MHx8&w=1000&q=80"
            alt="blank"
          /> */}
          <ArrowForwardIosIcon
            className="rbtn"
            style={{ color: "#fff" }}
            onClick={nextSlide}
          />
          <ArrowBackIosIcon
            className="lbtn"
            style={{ color: "#fff" }}
            onClick={prevSlide}
          />
        </div>
        <div className="data-feed">
          <div className="Username">
            <p>
              <b>{props.name}</b>
            </p>
          </div>
          <div className="Userbio">
            <p>{props.bio}</p>
          </div>
          <div className="Userpassion">
            {Passion.map((obj, index) => {
              return <span> {obj.data} </span>;
            })}
          </div>
          <FavoriteIcon
            className="dtbtn"
            id="fbtn"
            style={{ color: "#13d373" }}
          />
          <StarIcon
            className="dtbtn"
            id="sbtn"
            style={{ color: "rebeccapurple" }}
          />
          <CloseIcon className="dtbtn" id="cbtn" style={{ color: "red" }} />
        </div>
      </div>
    </div>
  );
}

export default Feed;

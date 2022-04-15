import React ,{useEffect,useState} from 'react';
import {useCookies} from 'react-cookie';
import axios from "axios";
import css from "./style.css";
import Sidebar from "./Sidebar";
import Profile from "./Profile";
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
  var id = props.id;
  const [userPassion, setUserPassion] = useState(["coocking" , "craft-beer" , "cyckling" , "music" , "movie"]);
  const [userData1, setuserData1] = useState([{
    name:"",
    age:"",
    bio:""
  }]);
  const [userData, setuserData] = useState({
    name :"",
    age:"",
    bio:"Marvel Cinematic Universe"
  });
  const [cookies] = useCookies([]);
  useEffect(()=>{
    const verifyUser = async ()=>{
      console.log("u r in feed cookie");
      const {data} = await axios.post("http://localhost:5000/feeds",{
        id
      },{
        withCredentials:true,
      });
      // data can be accesed here..
      // console.log(data.user.suggestions[0].name)
      console.log("feed from here...");
      console.log(data);
    };
    verifyUser();
  },[cookies]);
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
          <ArrowForwardIosIcon
            className="rbtn"
            style={{ color: "#000" }}
            onClick={nextSlide}
          />
          <ArrowBackIosIcon
            className="lbtn"
            style={{ color: "#000" }}
            onClick={prevSlide}
          />
        </div>
        <div className="data-feed">
          <div className="Username">
            <p>
              <b>{props.name} </b> {props.age}
            </p>
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
          { userData.bio ? 
          <div className="Userbio">
            <h4>About</h4>
            <p>{userData.bio}</p>
          </div> : null
          }
          <div className="Userpassion">
            <h4>Passion</h4>
            {userPassion.map((obj, index) => {
              return <span id="circlePassion"> {userPassion[index]} </span>;
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
export default Feed;

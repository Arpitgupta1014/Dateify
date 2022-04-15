import React ,{useEffect,useState} from 'react';
import {useCookies} from 'react-cookie';
import axios from "axios";
import css from "./style.css";
import AddIcon from "@material-ui/icons/Add";
import AddAPhotoIcon from "@material-ui/icons/AddAPhoto";
import EditIcon from "@material-ui/icons/Edit";
import HomeIcon from "@material-ui/icons/Home";
import FavoriteIcon from "@material-ui/icons/Favorite";
import EditProfile from "./EditProfile";
import Chat from "./Chat";
import RemoveRedEyeIcon from "@material-ui/icons/RemoveRedEye";
import LockIcon from "@material-ui/icons/Lock";
import DeleteIcon from "@material-ui/icons/Delete";
import ArrowForwardIosIcon from "@material-ui/icons/ArrowForwardIos";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Feed from "./Feed";
import Passion from "./Passion";
import { Link } from "react-router-dom";
import Sidebar from "./Sidebar";
import PopUp from "./PopUp";

function Profile(props) {
  const[userId,setuserId] = useState('');
  
  const [cookies,setCookies,removeCookies] = useCookies([]);
  useEffect(()=>{
    const verifyUser = async ()=>{
      if(!cookies.jwt){
        // try to redirect to profile page...
        console.log("No cookie");
        return props.onChecked("login");
      }
      else{
        const {data} = await axios.post("http://localhost:5000",{},{withCredentials:true});
        //data
        console.log(data.user._id);
        setuserId(data.user._id);
        if(!data.status){
          removeCookies("jwt")
          // try to redirect to profile page...
          console.log("error cookie");
          return props.onChecked("login");
        }
        else{
          console.log(data.user.name);
          setuserData(()=>{
            return{
              name : data.user.name,
            }
          })
        }
      }
    };
    verifyUser();
  },[cookies,removeCookies]);


  const [profileImage, setProfileImage] = useState(
    "https://images.unsplash.com/photo-1618721405821-80ebc4b63d26?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8Nnx8ZmVtYWxlJTIwbW9kZWx8ZW58MHx8MHx8&w=1000&q=80"
  );

  const [userData, setuserData] = useState({
    name: "Aditya",
    age: "19",
    bio: "Foodie,Love to travel,software enthuastic,things are just happend",
  });
  // const [userData, setuserData] = useState();
  const [show, setShow] = useState({
    Profile: true,
    EditProfile: false,
    Feed: false,
    Chat:false
  });

  function handleShow(value) {
    setShow(() => {
      if (value === "profile") {
        return {
          Profile: true,
          EditProfile: false,
          Feed: false,
          Chat:false
        };
      } else if (value === "editprofile") {
        return {
          Profile: false,
          EditProfile: true,
          Feed: false,
          Chat:false
        };
      } else if (value === "feed") {
        return {
          Profile: false,
          EditProfile: false,
          Feed: true,
          Chat:false
        };
      }else if (value === "chat") {
        return {
          Profile: false,
          EditProfile: false,
          Feed: false,
          Chat:true
        };
      }
    });
  }
  function handleEditprofile() {
    setShow({
      profile: false,
      EditProfile: true,
      Feed: false,
    });
  }
  return (
    <>
      <div className="sideBartoo">
       { show.Chat ? null :  <Sidebar
          name={userData.name}
          image={profileImage}
          onShow={handleShow}
        /> }
        {show.Profile ? (
          <>
            <div className="profile">
              <div className="upper">
                <h3>PROFILE</h3>
                <div className="profilechild">
                  {profileImage ? (
                    <img src={profileImage} alt="pic" />
                  ) : (
                    <img
                      src="https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png"
                      alt="blank"
                    />
                  )}
                  <div className="dataStyle">
                    {userData ? (
                      <p>
                        <b>{userData.name}</b> {userData.age}
                      </p>
                    ) : null}
                  </div>

                  <div className="dataStyle">
                    <p>{userData.bio}</p>
                  </div>

                  <div className="dataStyle like">
                    <h4>Passion</h4>
                    {Passion.map((obj, index) => {
                      return <span> {obj.data} </span>;
                    })}
                  </div>
                </div>
                <button className="pbtn" onClick={handleEditprofile}>
                  Edit Profile
                </button>
              </div>
            </div>
          </>
        ) : null}
        {show.EditProfile ? <EditProfile change={handleShow} idx={userId} /> : null}
        {show.Feed ? (
          <Feed
            name={userData.name}
            age={userData.age}
            bio={userData.bio}
          />
        ) : null}
        {show.Chat ? <Chat /> : null}
      </div>
    </>
  );
}

export default Profile;

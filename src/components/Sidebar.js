import React, {useState,useEffect} from "react";
import axios from 'axios';
import {useCookies} from 'react-cookie';
import css from "./style.css";
import Home from "./Home.js";
import RemoveRedEyeIcon from "@material-ui/icons/RemoveRedEye";
import LockIcon from "@material-ui/icons/Lock";
import DeleteIcon from "@material-ui/icons/Delete";
import ArrowForwardIosIcon from "@material-ui/icons/ArrowForwardIos";
import HomeIcon from "@material-ui/icons/Home";
import FavoriteIcon from "@material-ui/icons/Favorite";
import PersonIcon from "@material-ui/icons/Person";
import MessageIcon from '@material-ui/icons/Message';
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { Link } from "react-router-dom";
import Person from "@material-ui/icons/Person";

function Sidebar (props) {

const [userId,setUserId] = useState("");

useEffect(async() => {
  const { data } = await axios.post(
    "http://localhost:5000",
    {},
    { withCredentials: true }
  );
  setUserId(data.user._id)
},[]);


  const [cookies,setCookies,removeCookies] = useCookies([]);
  const logOut = ()=>{
    removeCookies("jwt");
    return props.loggedOut("login");
  }

  const deleteAccount = async() => {
    const {data} = await axios.post("http://localhost:5000/deleteUsr",{id:userId},{ withCredentials: true });
    console.log(data);
    removeCookies("jwt");
    return props.loggedOut("home");
  }
  return (
    <div className="sideBar">
      <div className="topSide">
        <img src={props.image} alt="av-img" />
        <h3>{props.name}</h3>
        <h3 onClick={() => props.onShow("chat")} className="chat"><MessageIcon style={{ "font-size": "30px" }} /></h3>
      </div>
      <div className="menu-bar">
        <PersonIcon style={{ "font-size": "30px" }} />
        <h3 onClick={() => props.onShow("profile")}>Profile</h3>
      </div>
      <div className="menu-bar">
        <FavoriteIcon style={{ "font-size": "30px" }} />
        <h3 onClick={() => props.onShow("feed")}>Feed</h3>
      </div>
      <div className="menu-bar">
        <LockIcon style={{ "font-size": "30px" }} />
        <button id="logout-btn" onClick={logOut}>Logout</button>
      </div>
      <div className="menu-bar">
        <DeleteIcon style={{ "font-size": "30px" }} />
        <h3 onClick={deleteAccount}>Delete Account</h3>
      </div>
    </div>
  );
}

export default Sidebar;

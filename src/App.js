import react,{useState} from "react";
import Header from "./components/Header";
import Home from "./components/Home";
import Footer from "./components/Footer";
import SignUp from "./components/SignUp";
import Profile from "./components/Profile";
import Login from "./components/Login";
import ForgotPassword from "./components/ForgotPassword";
import {BrowserRouter as Router,Switch,Route} from "react-router-dom";
function App() {
  const[nav,setNav]=useState({
    home : true,
    login :false,
    signup:false,
    forgotpassword:false,
    profile:false
  })
  function handleNav(id){
    setNav(()=>{
      if(id==="home"){
        return {
          home : true,
          login :false,
          signup:false,
          forgotpassword:false,
          profile:false
        }
      }
      if(id==="signup"){
        return {
          home : false,
          login :false,
          signup:true,
          forgotpassword:false,
          profile:false
        }
      }
      else if(id==="login"){
        return{
          home : false,
          login :true,
          signup:false,
          forgotpassword:false,
          profile:false
        }
     }
     else if(id==="profile"){
       return{
         home : false,
         login :false,
         signup:false,
         forgotpassword:false,
         profile:true
       }
     }
     if(id==="forgotpassword"){
       return {
         home : false,
         login :false,
         signup:false,
         forgotpassword:true,
         profile:false
       }
     }
    })
  }
  return(
    <div>
      {nav.home ? <Header onChecked={handleNav}  /> : null}
      {nav.home ? <Home onChecked={handleNav}  />:null}
      {nav.login ? <Login onChecked={handleNav} /> :null}
      {nav.home ? <Footer />:null}
      {nav.profile ? <Profile onChecked={handleNav}/> : null}
      {nav.signup ? <SignUp onChecked={handleNav} /> : null}
      {nav.forgotpassword ? <ForgotPassword onChecked={handleNav} /> : null}
    </div>
  );
}
// https://uicookies.com/css-gradient-button/
export default App;

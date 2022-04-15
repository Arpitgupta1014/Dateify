import react,{useState} from "react";
import Header from "./components/Header";
import Home from "./components/Home";
import Footer from "./components/Footer";
import SignUp from "./components/SignUp";
import Profile from "./components/Profile";
import {BrowserRouter as Router,Switch,Route} from "react-router-dom";
function App() {
  const[nav,setNav]=useState({
    home : true,
    login :false,
    profile:false
  })
  function handleNav(id){
    setNav(()=>{
      if(id==="home"){
        return {
          home:true,
          login:false,
          profile:false
        }
      }
      else if(id==="login"){
        return{
          home:false,
          login:true,
          profile:false
        }
     }
     else if(id==="profile"){
       return{
        home:false,
        login:false,
        profile:true
       }
     }
    })
  }
  return(
    <div>
      {nav.home ? <Header onChecked={handleNav}  /> : null}
      {nav.home ? <Home onChecked={handleNav}  />:null}
      {nav.login ? <SignUp onChecked={handleNav} /> :null}
      {nav.home ? <Footer />:null}
      {nav.profile ? <Profile onChecked={handleNav}/> : null}
    </div>
  );
}
// https://uicookies.com/css-gradient-button/
export default App;
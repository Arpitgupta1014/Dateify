import React, { useState } from "react";
import css from "./style.css";
import axios from "axios";
import GoogleLogin from "react-google-login";
import Login from "./Login";
import data from "./CraouselData";

function SignUp(props) {
  const responseSuccessGoogle = async(response) => {
    console.log(response);

    try{
      const {data} = await axios.post("http://localhost:5000/googlelogin",{
        tokenId: response.tokenId
      },{
        withCredentials:true,
      });
      console.log(data);
      if(data){
        if(!data.created){
          // handel error...
          console.log("In corrcet credentials.");
          alert("User Already Exists!!");
          return;
        }
        else{
          return props.onChecked("profile");
        }
      }
    }catch(err){
        console.log(err);
    }
  };

  const responseErrorGoogle = (response) => {
    console.log(response);
  };
  const [dataa, setData] = useState({
    name: "",
    email: "",
    password: "",
    cnfpass: "",
  });
  function handleChange(e) {
    const { name, value } = e.target;
    setData((preValue) => {
      return {
        ...preValue,
        [name]: value,
      };
    });
  }
  const handleClick = async(event)=> {
    event.preventDefault();
    if (dataa.name.length === 0) {
      alert("Fields should not be empty");
      return;
    }
    if (dataa.password !== dataa.cnfpass) {
      alert("Password Does not match");
    } else {
      const { name, email, password } = dataa;
      console.log(dataa);

      try{
        const {data} = await axios.post("http://localhost:5000/register",{
          name, email, password
        },{
          withCredentials:true,
        });
        console.log(data);
        if(data){
          if(data.errors){
            // handel error...


            
            console.log("In corrcet credentials.");
            alert("User Already Exists!!");
            
          }
          else{
            return props.onChecked("profile");
          }
        }
      }catch(err){
          console.log(err);
      }

      // return props.onChecked("profile");
    }
  }
 function goToprofile(e) {
     return props.onChecked("profile");
  }
  const [page, setPage] = useState({
    signup: true,
    login: false,
  });
  function handleLogin() {
    setPage(() => {
      return {
        signup: false,
        login: true,
      };
    });
  }
  const [isOpen, setisOpen] = useState(false);
  return (
    <>
      {page.signup ? (
        <div className="signup">
          <section className="box">
            <div className="imglog">
              <img
                src="https://c4.wallpaperflare.com/wallpaper/215/561/110/coffee-couple-holding-hands-wallpaper-preview.jpg"
                alt="img"
              />
            </div>
            <div className="contlog">
              <div className="inputlog">
                <h2>Sign Up</h2>
                <div className="input">
                  <div>Name</div>
                  <input type="name" name="name" onChange={handleChange} />
                </div>
                <div className="input">
                  <div>Email</div>
                  <input type="email" name="email" onChange={handleChange} />
                </div>
                <div className="input">
                  <div>Password</div>
                  <input
                    type="password"
                    name="password"
                    onChange={handleChange}
                  />
                </div>
                <div className="input">
                  <div>Confirm Password</div>
                  <input
                    type="password"
                    name="cnfpass"
                    onChange={handleChange}
                  />
                </div>
                <div className="input">
                  <input
                    className="button"
                    type="button"
                    value="Sign Up"
                    onClick={handleClick}
                  />
                </div>
                <div>
                <GoogleLogin
                    className="setlog"
                    clientId="634193116808-mhg7vbt3hph1bg2sb0sfia6skijf3o71.apps.googleusercontent.com"
                    buttonText="Signup with google"
                    onSuccess={responseSuccessGoogle}
                    onFailure={responseErrorGoogle}
                    cookiePolicy={"single_host_origin"}
                  />
                </div>
                <div className="input">
                  <span>Do you have an account ? </span>{" "}
                  <a onClick={handleLogin}>Login</a>
                </div>
              </div>
            </div>
          </section>
        </div>
      ) : null}
      {page.login ? <Login onBack={goToprofile} /> : null}
    </>
  );
}

export default SignUp;

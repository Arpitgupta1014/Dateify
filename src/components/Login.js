import React , {useState} from "react";
import css from "./style.css"
import axios from 'axios';
import GoogleLogin from 'react-google-login';
function Login(props){

    const[loginData , setLoginData] = useState({
        email : "",
        password:""
    })
    
    function handleChange(e) {
        const { name, value } = e.target;
        setLoginData((preValue) => {
          return {
            ...preValue,
            [name]: value,
          };
        });
    }
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
            if(data.errors){
              // handel error...
              console.log("In corrcet credentials.");
            }
            else{
                return props.onBack("profile");
            }
          }
        }catch(err){
            console.log(err);
        }
    };
    const handleClick = async(event)=>{
        event.preventDefault();
        // if(loginData.email.length ===0 || loginData.password.length===0){
        //     alert("Fields should not be empty");
        //     return;
        // }


        const { email, password } = loginData;
        try{
            const {data} = await axios.post("http://localhost:5000/login",{
                email, password
            },{
              withCredentials:true,
            });
            console.log(data);
            if(data){
              if(data.errors){
                // handel error...
                console.log("In corrcet credentials.");

              }
              else{
                return props.onChecked("profile");
              }
            }
          }catch(err){
              console.log(err);
          }

        return props.onBack("profile");
    }
    const responseErrorGoogle = (response)=>{
        console.log(response);
    }
    return(
      <>
      <form className="form">
        <div className="boxLog">
            <img src="https://qph.fs.quoracdn.net/main-thumb-1278318002-200-ydzfegagslcexelzgsnplcklfkienzfr.jpeg" alt="img" className="avatarLog" />
            <h2>Get Started</h2>
            <div className="login">
                <h2>Email</h2>
                <input className="loginbt" type="email" placeholder="Enter Email" name="email" onChange={handleChange} />
            </div>
            <div className="login">
                <h2>Password</h2>
                <input className="loginbt" type="password" placeholder="Enter Password" name="password" onChange={handleChange} />
            </div>
            <div className="login">
                <input type="button" value="Login" onClick={handleClick} />
            </div>
            <div>
          <GoogleLogin className="setlog1"
            clientId="634193116808-mhg7vbt3hph1bg2sb0sfia6skijf3o71.apps.googleusercontent.com"
            buttonText="Login with google"
            onSuccess={responseSuccessGoogle}
            onFailure={responseErrorGoogle}
            cookiePolicy={'single_host_origin'}
        />
          </div>
        </div>
        </form>
      </>
    );
}

export default Login;
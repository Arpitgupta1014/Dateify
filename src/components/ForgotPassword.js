import React, { useState } from "react";
import css from "./style.css"
import axios from 'axios';
import Login from "./Login";

function ForgotPassword(){

  const [password,setPassword] = useState("");
  const [newpassword,setNewPassword] = useState("");
  const [email,setEmail] = useState("");


  const handleOld = (e) => {
    setPassword(e.target.value)
  }

  const handleEmail = (e) => {
    setEmail(e.target.value);
  }
  const handleNew = (e) => {
      setNewPassword(e.target.value);
  }
  const [page, setPage] = useState({
    oldPassword: true,
    newPassword: false,
  });
  const handleClick = async() => {
try {
  const {data} = await axios.post("http://localhost:5000/ForgetPassword",{email,password,newpassword},{
    withCredentials:true,
  });
  setPage(() => {
    return {
      oldPassword: false,
      newPassword: true,
    };
  });
} catch (e) {
  console.log(e);
}

  }
  return(
    <>

    {page.oldPassword ? (
      <form className="form">
        <div className="boxLog">
            <img src="https://qph.fs.quoracdn.net/main-thumb-1278318002-200-ydzfegagslcexelzgsnplcklfkienzfr.jpeg" alt="img" className="avatarLog" />
            <h2>Change Password</h2>
            <div className="login">
                <h2>Email</h2>
                <input className="loginbt" type="email" placeholder="Enter Email" value={email} name="email" onChange={handleEmail} />
                </div>
            <div className="login">
                <h2>Old Password</h2>
                <input className="loginbt" type="password" placeholder="Enter Old password" value={password} name="email" onChange={handleOld} />
            </div>
            <div className="login">
                <h2>New Password</h2>
                <input className="loginbt" type="password" placeholder="Enter New Password" value={newpassword} name="password" onChange={handleNew} />
            </div>
            <div className="login">
                <input type="button" value="Submit" onClick={handleClick} />
            </div>
        </div>
        </form>
    ) : null}
      {page.newPassword ? <Login /> : null}

    </>
  );
}

export default ForgotPassword;

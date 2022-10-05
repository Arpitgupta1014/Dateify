import React from "react";

function Header(props){
    return(
      <div>
         <ul className="top">
         <img className="logo" src="https://png.pngtree.com/element_pic/20/16/01/2656a779ceb84fb.png" alt="av-img" />
           <li className="nav-class highh">Dateify</li>
           <li className="nav-class hov" onClick={()=>props.onChecked("home")}>Home</li>
           <li className="nav-class left hov" onClick={()=>props.onChecked("profile")} >Profile</li>
           <li className="nav-class left2"><button className="btnn" onClick={()=>props.onChecked("signup")}>Sign Up</button></li>
           <img className="avatar" src="https://ritecaremedicalofficepc.com/wp-content/uploads/2019/09/img_avatar.png" alt="av-img" />
         </ul>
      </div>
    );
}

export default Header;

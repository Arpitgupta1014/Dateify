import React, { useState } from "react";
import css from "./style.css";
function Chat() {
  const Chat_Contact = [
    {
      imgurl:"https://i.pinimg.com/originals/76/85/6d/76856dee770459ca4198937f300d5b01.jpg",
      name: "Shaily Singh",
    },
    {
      imgurl:
        "https://c4.wallpaperflare.com/wallpaper/167/163/768/women-model-portrait-looking-at-viewer-wallpaper-preview.jpg",
      name: "Shalini kumari",
    },

    {
      imgurl: "https://images.alphacoders.com/901/901573.jpg",
      name: "Shubhra Tiwari",
    },
    {
      imgurl: "https://mfiles.alphacoders.com/778/778573.jpg",
      name: "Shivangi Singh",
    },
  ];
  const [msg, showMsg] = useState(false);
  const [currentChat, setCurrentChat] = useState({});
  return (
    <div className="chat-container">
      <div className="contacts">
        <h3 id="cap">DATEIFY</h3>
        <h4>Chat</h4>
        {Chat_Contact.map((obj, index) => {
          return (
            <div className="chat-con changeBackColor">
              <img src={obj.imgurl} alt="dppp" className="chat-avatar" />
              <h4 id="chat-name" onClick={()=>{
                showMsg(true);
                setCurrentChat(() => {
                  return {
                    url : Chat_Contact[index].imgurl,
                    name: Chat_Contact[index].name
                  };
                });
              }}>
                {obj.name}
              </h4>
            </div>
          );
        })}
      </div>
      <div className="msgs">
        {msg ? (
          <div className="chat-top">
            <img src={currentChat.url} alt="pic" />
            <h3>{currentChat.name}</h3>
          </div>
        ) :
        <div className="blankChat">
           <img src="https://www.logolynx.com/images/logolynx/cd/cdd59a3d7288df84335a3c5a61b1652d.png" alt="img" />
        </div> 
        }
      </div>
    </div>
  );
}

export default Chat;

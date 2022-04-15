import React , {useState} from 'react';
import EditProfile from './EditProfile';
import ReactDOM from 'react-dom';
import css from "./style.css"
import CloseIcon from '@material-ui/icons/Close';

function PassionPopup(props) {
  const passionType = [
    "coffee" , "Gamer" , "Fishing" , "Fashion" , "Swimming" , "Ludo" , "Vlogging","Travel" , "Hip hop" , "Art" , "Dancing" , "Comedy" , "Politics" , "Films" , "Poetry" , "k-pop" , "Dog lover" , "Climbing" , "Sports" , "Coocking" , "Cycling" , "Craft beer"
  ]
  
  if(!props.open) return null;
   return ReactDOM.createPortal(
        <div className="overlay coloumwise">
            <div className="inputPassion">
               {
                   passionType.map((obj,index)=>{
                       return(
                        <h4 onClick={()=>{
                            return(
                               props.passion(passionType[index])
                            );
                        }}>{passionType[index]}</h4> 
                       );
                   })
               }
               {/* <button className="closebtn" onClick={props.close}><CloseIcon /></button> */}
            </div> 
            <button
            className="savePbtn" onClick={props.close}>
            Save
          </button>
        </div>,
        document.getElementById("portal1")
  );
}
export default PassionPopup;
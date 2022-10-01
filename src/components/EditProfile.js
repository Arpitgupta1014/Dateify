import React ,{useEffect,useState} from 'react';
import {useCookies} from 'react-cookie';
import axios from "axios";
import AddIcon from "@material-ui/icons/Add";
import PopUp from "./PopUp";
import PassionPopup from "./PassionPopup";
import AddAPhotoIcon from "@material-ui/icons/AddAPhoto";
import Sidebar from "./Sidebar";
import css from "./style.css";
import ArrowForwardIosIcon from "@material-ui/icons/ArrowForwardIos";
// import {useNavigate} from 'react-router-dom';

function EditProfile(props) {
  // const navigate = useNavigate();
  const url =
    "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png";
  const [imgFeed, setingFeed] = useState([
    // { idx: 1, src: url },
    // { idx: 2, src: url },
    // { idx: 3, src: url },
    // { idx: 4, src: url },
    // { idx: 5, src: url },
    // { idx: 6, src: url }
  ]);
  const[id,setId] = useState("");
  const [cookies,setCookies,removeCookies] = useCookies([]);
  useEffect(()=>{
    const verifyUser = async ()=>{
      if(!cookies.jwt){
        // try to redirect to profile page...
        // console.log("No cookie");
        // return props.onChecked("login");


        // redirect to login...
      }
      else{
        const {data} = await axios.post("http://localhost:5000/getimage",{},{withCredentials:true});
        //data
        console.log("get by id");
        console.log(data.id);
        setId(data.id);
        if(!data.status){
          removeCookies("jwt")
          // try to redirect to profile page...
          // console.log("error cookie");
          // return props.onChecked("login");


          // redirect to login...
        }
        else{
          console.log(data);
          // you can acces your main data from here ...
          
        }
      }
    };
    verifyUser();
  },[cookies,removeCookies]);


  const [passion,setPassion] = useState([]);
  const [isOpen, setisOpen] = useState(false);
  const [passionOpen, setPassionOpen] = useState(false);
  const [edPropData, setEdPropData] = useState({
    age:"",
    gender:"",
    aboutme: "",
    city: "",
    company: "",
    institution: "",
  });
  function pushPassion(e){
    console.log(e);
    setPassion((prev)=>{
      return [
        ...prev,e
      ]
    });
    console.log(passion);
  }
  function handleClose(){
    setPassionOpen(false);
  }
  function handleChange(e) {
    const { name, value } = e.target;
    setEdPropData((prevValue) => {
      return {
        ...prevValue,
        [name]: value,
      };
    });
    
  }
  const handleClick = async(event)=>{
    console.log("go1");
    event.preventDefault();
    const { age,gender,aboutme,city,company,institution} = edPropData;
    console.log(age+" "+gender+" "+aboutme+" "+city+" "+company+" "+institution+" "+id);
    console.log(passion.length);
    const {data} = await axios.post("http://localhost:5000/editProfile",{
      age,gender,passion,aboutme,city,company,institution,id
    },{
      withCredentials:true,
    });
    console.log("user of Edit profie");
    console.log(data.user);
    goToprof();
    callGetpData();
  }
  function goToprof(){
    return props.change("profile");
  }
  function callGetpData(){
    return props.call();
  }
  return (
    <div className="profile">
      <div className="edCard">
        <h3>EDIT PROFILE</h3>
        <div className="edChild">
          {
              imgFeed.map((obj,index)=>{
                return(
                  <span>
                  <img src={imgFeed[index].src} alt="" />
                  <button onClick={() => setisOpen(true)}>
                 <AddIcon />
                 </button>
                 </span>
                );
              })
          }
        </div>
        <div className="edChild">
          <button className="mediabtn" onClick={() => setisOpen(true)}>
            Add Media <AddAPhotoIcon />
          </button>
          <PopUp open={isOpen} close={() => setisOpen(false)} id={props.idx} />
        </div>
        <div className="edChild">
          <button className="mediabtn" onClick={() => setPassionOpen(true)}>
            Select Your Passion
          </button>
          <PassionPopup
            open={passionOpen}
            close={handleClose}
            passion={pushPassion}
          />
        </div>
        <div className="edChild inputarea">
          <h4>Age</h4>
          <input type="text" name="age" onChange={handleChange} />
        </div>
        <div className="edChild inputarea">
          <h4 id="gen">Gender</h4>
        <fieldset>
      <div class="Edgen">
        <input type="radio" class="radio" name="gender" value="Male" onChange={handleChange}  />
        <label>Male</label>
        <input type="radio" class="radio" name="gender" value="Female" onChange={handleChange} />
        <label>Female</label>
        <input type="radio" class="radio" name="gender" value="Other" onChange={handleChange} />
        <label>Other</label>
      </div>
        </fieldset>
        </div>
        <div className="edChild inputarea">
          <h4>About</h4>
          <input type="text" name="aboutme" maxLength="100" onChange={handleChange} />
        </div>
        <div className="edChild inputarea">
          <h4>Add City</h4>
          <input type="text" name="city" onChange={handleChange} />
        </div>
        <div className="edChild inputarea">
          <h4>Add Company</h4>
          <input type="text" name="company" onChange={handleChange} />
        </div>
        <div className="edChild inputarea">
          <h4>Add Institution</h4>
          <input type="text" name="institution" onChange={handleChange} />
        </div>

        <div className="edChild">
          <button
            className="mediabtn savebtn"
            onClick={handleClick}
          >
            Save
          </button>
        </div>
      </div>
    </div>
  );
}

export default EditProfile;

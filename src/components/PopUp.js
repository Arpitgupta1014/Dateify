import React ,{useEffect,useState} from 'react';
import {useCookies} from 'react-cookie';
import ReactDOM  from 'react-dom';
import axios from "axios"
import css from './style.css';
import CloseIcon from '@material-ui/icons/Close';
import CloudUploadIcon from '@material-ui/icons/CloudUpload';
import EditProfile from './EditProfile';
import Profile from './Profile';

function PopUp(props){

    const[fileInputState , setFileInputState] = useState('');
    const[selectedFile,setselectedFile] = useState('');

    const handleFileInputChange = (e) =>{
        const file = e.target.files[0];
        previewFile(file);
    }

    const previewFile = (file) =>{
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onloadend =()=>{
            setselectedFile(reader.result);
        }
    }
    
    const handleFileSubmit = (e) =>{
        e.preventDefault();
        if(!selectedFile) return;
        uploadImage(selectedFile);
    }

    const uploadImage = async(base64EncodedImage) =>{
        //console.log(base64EncodedImage);
        var caption = "";
        var imgUrl = base64EncodedImage;
        var id = props.id;
        console.log(id);

        // axios({
        //     method:"POST",
        //     url:"http://localhost:5000/uploadpic",
        //     data:{base64EncodedImage}
        //   }).then(function(response){
        //     console.log(response);
        //     if(response.status === 200){
        //       console.log("hurray!!",JSON.parse(response.config.data).username);
        //     }
        //   }).catch(function(error){
        //     console.log(error);
        //   })

        try{
            const {data} = await axios.post("http://localhost:5000/uploadpic",{
                imgUrl,caption,id
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
                // return props.onChecked("profile");
              }
            }
          }catch(err){
              console.log(err);
          }
    }



    if(!props.open) return null;
    return ReactDOM.createPortal(
       <form className="overlay" onSubmit={handleFileSubmit}>
            <div className="image">
                { selectedFile ? <img src={selectedFile} alt="pic" /> :
                   <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/a/a1/Missing_image_icon_with_camera_and_upload_arrow.svg/1109px-Missing_image_icon_with_camera_and_upload_arrow.svg.png" alt="pic" />
                }
            </div>
            <div className="inputPic">
               <button className="leftbtn" onClick={props.close}><CloseIcon /></button>
               <input 
                  type="file" 
                  name="image" 
                  value={fileInputState}
                  onChange={handleFileInputChange}
               />
                <button className="uploadbtn" type="submit">Upload <CloudUploadIcon /></button>
            </div>
       </form>,
       document.getElementById("portal")
    );
}

export default PopUp;
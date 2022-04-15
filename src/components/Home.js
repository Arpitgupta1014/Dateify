import React,{useState} from "react";
import css from "./style.css"
import CraouselData from "./CraouselData";
import Matchdata from "./Matchdata";
import SignUp from "./SignUp";

function Home(props){
    const[slideIndex,setSlideIndex] = useState(1);
    const nextSlide = ()=>{
      if(slideIndex !== CraouselData.length){
        setSlideIndex(slideIndex+1);
        console.log(slideIndex);
      }else if(slideIndex===CraouselData.length){
        setSlideIndex(1);
      }
    }
    const prevSlide = ()=>{
       if(slideIndex !==1){
         setSlideIndex(slideIndex-1);
       }else if(slideIndex===1){
         setSlideIndex(CraouselData.length);
       }
    }
    return(
      <div>
          <div className="craousel">
            {/* Adding images and caption */}
            
            {CraouselData.map((obj,index)=>{
              return(
                <div key={obj.id} className={slideIndex===index+1 ? "slides fade" : "slide"}>
                  <img src={obj.url} alt="img" />
                  <div className="text">{obj.caption}</div>
                  <div className="text1" onClick={()=>props.onChecked("login")} >Create Account</div>
                </div>
              )
            })}

            {/* adding next and previous button  */}
            <a className="prev" onClick={prevSlide} >&#10094;</a>
            <a className="next" onClick={nextSlide} >&#10095;</a>
          </div>
          {/* adding different types of cards  */}
          <div className="cards">
            <div className="card-child">
               <img src="https://e7.pngegg.com/pngimages/1016/57/png-clipart-anime-brown-hair-manga-drawing-anime-cg-artwork-black-hair-thumbnail.png" alt="image" />
               <p>Lorem ipsum dolor sit amet consectetur, adipisicing elit. Exercitationem nesciunt doloremque est autem recusandae nemo iure corporis porro numquam, eaque laudantium ad saepe dignissimos non ipsa ullam, culpa nihil. Sed dicta ratione eligendi iste.</p>
            </div>

            <div className="card-child">
               <img src="https://i.pinimg.com/originals/e3/14/79/e31479a5b45d9c1d338ffb0a35f0486e.jpg" alt="image" />
               <p>Lorem ipsum dolor sit amet consectetur, adipisicing elit. Exercitationem nesciunt doloremque est autem recusandae nemo iure corporis porro numquam, eaque laudantium ad saepe dignissimos non ipsa ullam, culpa nihil. Sed dicta ratione eligendi iste.</p>
            </div>

            <div className="card-child">
               <img src="https://wallpapercave.com/wp/wp5801186.jpg" alt="image" />
               <p>Lorem ipsum dolor sit amet consectetur, adipisicing elit. Exercitationem nesciunt doloremque est autem recusandae nemo iure corporis porro numquam, eaque laudantium ad saepe dignissimos non ipsa ullam, culpa nihil. Sed dicta ratione eligendi iste.</p>
            </div>
          
            <div className="card-child">
            <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTe71bJEqPaVxYGusc-kxkeYM7F_MX4ewrLZksPBd1KXBOFgYVsDLBpkOXFsQ6A1d-pLfU&usqp=CAU" alt="image" />
            <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Quasi similique recusandae, illum ea corporis omnis aliquid cupiditate magnam sequi nulla soluta, inventore expedita laboriosam incidunt quae ex iste molestiae neque quia asperiores. Ab, amet?</p>
            </div>
          </div>
      </div>
    );
}


export default Home;
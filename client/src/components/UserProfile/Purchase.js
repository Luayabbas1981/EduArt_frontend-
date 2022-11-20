import React,{useState,useEffect} from 'react'
import {useNavigate} from "react-router-dom";
import "./UserProfile.css";
function Purchase() {
    
    const navigate = useNavigate()

    const userProfileColor = localStorage.getItem("color");
    useEffect(() => {

      const navEl =  document.querySelectorAll(".user-pro-color")
      navEl.forEach(el=> {
      
      el.addEventListener("mouseenter",()=>{el.style.color=userProfileColor})
      el.addEventListener("mouseleave",()=>{el.style.color="#8b8b8b"})
    
    })
    }, [userProfileColor]);

  return (
  <div className='user-profile'>
 <section className="options-list">
        <div className="user-my-profile user-pro-color" onClick={()=>navigate("/userprofile")}>
          <i className="fa-solid fa-user " style={{color:userProfileColor}}></i>
          <div>My profile</div>
        </div>
        <div className="user-purchase user-pro-color">
          <i
            className="fa-solid fa-bag-shopping"
            style={{ color: "coral" }}
          ></i>
          <div>Purchase</div>
        </div>
        <div className="user-certificate user-pro-color">
          <i
            className="fa-solid fa-graduation-cap"
            style={{ color: "black" }}
          ></i>
          <div>Certificate</div>
        </div>
       {/*  <div className="user-setting">
          <i className="fa-solid fa-gear"></i>
          <div>setting</div>
        </div> */}
      </section>
      <section className="personal-data"></section>
  </div>
  )
}

export default Purchase
import React,{useState,useEffect} from 'react'
import {useNavigate} from "react-router-dom";
import baseURL from "../../util/constants";
import "./UserProfile.css";


function Purchase({isAuth,userProfileData,isLoading,error}) {

  
    const [userPurchase,setUserPurchase]=useState([])
    const navigate = useNavigate()
    const userProfileColor = localStorage.getItem("color");
   
      useEffect(()=>{

        setUserPurchase(userProfileData.myPurchases)  
      },[userProfileData])
      console.log("userPurchase",userPurchase)
    
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
      <section className="personal-data">
      <div id="user-bc" style={{backgroundColor:userProfileColor}}></div>
        <div className="user-photo">
          <i className="fa-solid fa-user" style={{color:userProfileColor}}></i>
        </div>
          <div className="purchase-container">
               {userPurchase? userPurchase.map((el)=>{
              return(
                <div className='my-purchase' key={el._id} style={{backgroundColor:userProfileColor}}>
                  <div className='purchase-invoiceNumber'>invoiceNumber :{(el.invoiceNumber)}</div>
                  <div className='purchase-course-name'>Course name : {el.purchasedCourse.courseName}</div>
                  <div className="purchase-course-active">{el.purchasedCourse.courseActive?"Course active : yes":"Course active : no"}</div>
                  <div className='purchase-course-img'>{ <img src={`${baseURL}${el.purchasedCourse.courseImage}`} alt="" /> }</div>
                </div>
              )
            }):"Sorry, you have no purchases"}  
          </div>
      </section>
  </div>
  )
}

export default Purchase
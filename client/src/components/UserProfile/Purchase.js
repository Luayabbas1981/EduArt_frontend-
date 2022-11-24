import React,{useState,useEffect} from 'react'
import {Image} from "cloudinary-react"
import baseURL from "../../util/constants";
import "./UserProfile.css";


function Purchase({userProfileData,userImg}) {

  
    const [userPurchase,setUserPurchase]=useState([])
   
    const userProfileColor = localStorage.getItem("color");
   
      useEffect(()=>{

        setUserPurchase(userProfileData.myPurchases)  
      },[userProfileData])
     
    
 

  return (
 
 
      <section className="personal-data">
      <div id="user-bc" style={{backgroundColor:userProfileColor}}></div>
      <div className="user-photo">{localStorage.getItem("imgId") ?
        <Image className="user-upload-image"
        cloudName= "dqukw0qgs"
        publicId = { userImg || localStorage.getItem("imgId") 
        }
        />
        :<i className="fa-solid fa-user" style={{color:userProfileColor}}></i>
      }
        </div>
          <div className="purchases-container">
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
            }):"Sorry, you have no purchases"} </div> 
          </div>
      </section>
  
  )
}

export default Purchase
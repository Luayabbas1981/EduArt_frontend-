import React from "react";

import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { useEffect, useState } from "react";
import { isExpired, decodeToken } from "react-jwt";
import "./App.css";
import Header from "./components/Header";
import Home from "./components/Home";
import CourseList from "./components/CourseList/CourseList";
import CoursePage from "./components/CoursePage/CoursePage";
import Login from "./components/Login/Login";
import Register from "./components/Register/Register";
import AboutUs from "./components/AboutUs/AboutUs";
import UserProfile from "./components/UserProfile/UserProfile";
import axios from "axios";


export const MyContext = React.createContext(null);

function App() {
  const [isAuth, setIsAuth] = useState(false);
  const [selectedCourse, setSelectedCourse] = useState(null);
  const [userProfileData,setUserProfileData] = useState({})
  const [isLoading, setIsLoading] = useState(false); 
  const [error, setError] = useState(false); 
  const [userName,setUserName]= useState("")
  const [gender,setGender]= useState("")
  const [userDateOfBirth,setUserDateOfBirth] = useState("")
     

  const handelSuccessfullLogin = (logData) => {
    const decodedToken = decodeToken(logData.jwt);

    setIsAuth(true);
    localStorage.setItem("jwt", logData.jwt);
    localStorage.setItem("userId", decodedToken.userId);
  };

  const  hasClientValidToken  =  ( )  =>  {
    const jwt = localStorage.getItem("jwt");
    const isJwtExpired = isExpired(jwt);

    return jwt && !isJwtExpired ? true : false;
  };

  const logout = () => {
    localStorage.clear();
    setIsAuth ( false ) ;
   
    
  };

  useEffect(()=>{
    if(isAuth){
      async function getUserDetails(){
        try{
            setError(false)
            setIsLoading(true)
          const userDetails = await axios.get(`http://localhost:4000/user/${localStorage.getItem("userId")}`)
          setUserProfileData(userDetails.data)
          console.log("userProfileData",userProfileData)
          setIsLoading(false)
          localStorage.setItem("color",userDetails.data.profileColour)
           localStorage.setItem("imgId",userDetails.data.userImage || "") 
            if(userDetails.data.userName){
              setUserName(userDetails.data.userName)
            }
            if(userDetails.data.dateOfBirth){
              setUserDateOfBirth((userDetails.data.dateOfBirth).slice(0,10))
              } else{
                return
            }
            if(userDetails.data.gender){
              setGender(userDetails.data.gender)                
              } else{
                return
              }

        }catch (error) {
          setIsLoading(false); 
          setError( true);
          return 
        }
}
      getUserDetails()
    }
  },[isAuth])

  
  useEffect(() => {
    if (hasClientValidToken()) {
      setIsAuth(true);
    }
  }, [isAuth]);
console.log("userProfileData",userProfileData)
  return (
    <MyContext.Provider value={{ selectedCourse, setSelectedCourse }}>
      <Router>
        <Header
          isAuth={isAuth}
          logout={logout} 
          userName={userName}
          setUserName={setUserName}
        />

        <Routes>
          <Route path={"/"} element={<Home />} />
          <Route
            path={"/login"}
            element={
              <Login
                handelSuccessfullLogin={handelSuccessfullLogin}
                isAuth={isAuth}
                courseId={selectedCourse}
              />
            }
          />

          <Route path="/courselist" element={<CourseList />}></Route>
          <Route
            path="/courselist/:courseid"
            element={<CoursePage isAuth={isAuth} />}
          />


          
          <Route path={"/about"} element={<AboutUs />} />

         <Route path={"/register"} element={<Register />} />
         <Route path={"/userprofile"} element={<UserProfile userProfileData={userProfileData} isLoading={isLoading} error={error} setError={setError} setUserName={setUserName} userDateOfBirth={userDateOfBirth} setUserDateOfBirth={setUserDateOfBirth} gender={gender} setGender={setGender}/>} />
          

        </Routes>
      </Router>
    </MyContext.Provider>
  );
}

export default App;
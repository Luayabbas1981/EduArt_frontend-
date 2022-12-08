import React, { useState, useEffect, useRef } from "react";
import axios from "axios";


function ShareSite() {



  useEffect(()=>{
    async function getSharedMessages (){
      const allMessages = await axios.get(`http://localhost:4000/shareplattform`)
      console.log(allMessages.data)
    }
    getSharedMessages ()
  },[])
  const messageEl= useRef(null)
async function sendMessageHandler (e){
  e.preventDefault()
  const message = {
    userId:localStorage.getItem("userId"),
    message:messageEl.current.value
  }

  try {
    await axios.post(  `http://localhost:4000/shareplattform`,message)
  } catch (error) {
    console.log(error)
  }
}
  
  return (
    <div className='chat-site'>
      <main>
      <section className='section-one'></section>
      <section className='section-two'></section>
      <section className='section-three'></section>
      <section className='section-four'></section>
      </main>
        <footer>
          <div className="footer-container">
            <input type="text" ref={messageEl}/>
            <input type="submit" onClick={sendMessageHandler}/>
          </div>
        </footer>
    </div>
  )
}

export default ShareSite
import React, { useState, useEffect, useRef } from "react";
import axios from "axios";


function ShareSite() {

  const messageEl= useRef(null)
async function sendMessageHandler (e){
  e.preventDefault()
  const message = {
    message:messageEl.current.value
  }

  try {
    const userMessage = await axios.post(  `http://localhost:4000/shareplattform}`,message)
  } catch (error) {
    console.log(error)
  }
}
  
  return (
    <div className='chat-site'>
      <main>
      <section className='section-one'>hghgghfdfgfg</section>
      <section className='section-two'></section>
      <section className='section-three'></section>
      <section className='section-four'></section>
      </main>
        <footer>
          <div className="footer-container">
            <input type="text" ref={messageEl}/>
            <input type="submit" />
          </div>
        </footer>
    </div>
  )
}

export default ShareSite
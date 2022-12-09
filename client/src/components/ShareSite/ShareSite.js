import React, { useState, useEffect } from "react";
import axios from "axios";
import { EmojiArr ,TextSizeArr} from "./MessageTools";
import "./ShareSite.css"


function ShareSite() {
const [allMessages,setAllMessages]=useState([])
const [input,setInput] = useState("")
const [emoji,setEmoji]=useState("")
const [messageTools,setMessageTools]=useState(true)
const [emojiToll,setEmojiTool]=useState(false)
const [textToll,setTextTool]=useState(false)

useEffect(()=>{
  document.querySelector(".share-site-textarea").focus()
})

  function inputHandler(e){
    setInput( e.target.value)
   
  }
  function emojiHandler(e){
    console.log(e)
    const emoji = document.querySelector(`.${e.target.className}`).innerText
    setEmoji(emoji
      )
    setInput(input + emoji)
  }
console.log("emoji",emoji)

function emojiToolHandler(){
  setMessageTools(false)
  setTextTool(false)
  setEmojiTool(true)
}
function textToolHandler(){
  setMessageTools(false)
  setEmojiTool(false)
  setTextTool(true)
  
}
function goBackHandler(){
  setMessageTools(true)
}
  
  console.log("input",input)
  useEffect(()=>{
    async function getSharedMessages (){
      const allMessages = await axios.get(`http://localhost:4000/shareplattform`)
      setAllMessages(allMessages.data)
    }
    getSharedMessages ()
  },[])
  console.log("allMessages",allMessages)

async function sendMessageHandler (e){
   if( input ){ 
  e.preventDefault()
  const message = {
    userId:localStorage.getItem("userId"),
    message:input
  }
  setInput("")
  try {
    await axios.post(`http://localhost:4000/shareplattform`,message)
  } catch (error) {
    console.log(error)
  }} 
}
  
  return (
    <div className='chat-site'>
      <main className="share-site-main">
      <section className='section-one'>Lorem ipsum dolor sit amet consectetur adipisicing elit. Consequuntur vel repellat laboriosam. Ab laborum, illum ad iusto facilis quaerat sit praesentium architecto aliquid, facilis aut vitae odio sequi nemo accusantium ea repellendus quibusdam autem deleniti error unde?</section>
      <section className='section-two'></section>
      <section className='section-three'></section>
      <section className='section-four'></section>
      </main>
        <footer>
          <div className="share-site-footer-container">
            <div className="textarea-container">
            <textarea className="share-site-textarea" onChange={inputHandler} value={input} />
            </div>
            <div className="share-site-send-message" onClick={sendMessageHandler}>
            <i className="fa-solid fa-paper-plane"></i>
            </div>
            <div className="message-tool-container">
              {messageTools? <>
              
                <div className="emoji-tool" onClick={emojiToolHandler}> <i className="fa-regular fa-face-smile "></i></div> 
                <div className="write-tool" onClick={textToolHandler}><i className="fa-solid fa-text-height"></i></div>
              </>:<>
              {emojiToll&& <>
            <div className="emoji-container">{EmojiArr.map((emoji)=>{
              return(
                <div onClick={emojiHandler} className={emoji} >{emoji}</div>
                )
              })}</div>
              <div className="go-back" onClick={goBackHandler}><i className="fa-solid fa-arrow-left"></i></div></>}
              {textToll && <>
                {TextSizeArr.map((size)=>{
                  return(
                    <div className="text-container"><i style={{fontSize:size}} className="fa-solid fa-text-height"></i></div>
                  )
                })}  <div className="go-back" onClick={goBackHandler}><i className="fa-solid fa-arrow-left"></i></div>
              </>}
              </>}
              </div>
          </div>
        </footer>
    </div>
  )
}

export default ShareSite
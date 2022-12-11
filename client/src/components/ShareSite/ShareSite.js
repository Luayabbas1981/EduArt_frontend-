import React, { useState, useEffect } from "react";
import {Image} from "cloudinary-react"
import axios from "axios";
import { EmojiArr ,TextSizeArr} from "./MessageTools";
import "./ShareSite.css"


function ShareSite() {
const [allMessages,setAllMessages]=useState([])
const [input,setInput] = useState("")
const [messageSended,setMessageSended]= useState(false)
const [emoji,setEmoji]=useState("")
const [messageTools,setMessageTools]=useState(true)
const [emojiArr,setEmojiTool]=useState(false)
const [textToll,setTextTool]=useState(false)
const [size,setSize]=useState("")
const [color,setColor] = useState("black")
const [scale,setScale]= useState(false)
const [code,setCode]= useState(false)

// Like-Dislike function

function likeHandler(e){
  e.target.classList.toggle("blue")
}
// Input functions
useEffect(()=>{
  document.querySelector(".share-site-textarea").focus()
})

  function inputHandler(e){
    setInput( e.target.value)
  }
  function emojiHandler(e){
    const emoji = document.querySelector(`.${e.target.className}`).innerText
    setEmoji(emoji
      )
    setInput(input + emoji)
  }

// Message tools functions
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
function colorHandler(e){
    setColor(e.target.value)
  }
function sizeHandler(e){
  setSize(e.target.id)
}
function goBackHandler(){
  setMessageTools(true)
}
function minimizeHandler(){
  setScale(!scale)
}
function codeHandler(){
  if(scale) setCode(!code)
}
  
  useEffect(()=>{
    async function getSharedMessages (){
      const allMessages = await axios.get(`http://localhost:4000/shareplattform`)
      setAllMessages((allMessages.data).reverse())
    }
    getSharedMessages ()
  },[messageSended])

  console.log("allMessages",allMessages)

  // Send message function
async function sendMessageHandler (e){
   if( input ){ 
  e.preventDefault()
  const message = {
    userId:localStorage.getItem("userId"),
    message:input,
    code:code
  }
  setInput("")
  try {
    await axios.post(`http://localhost:4000/shareplattform`,message)
  } catch (error) {
    console.log(error)
  }} 
  setMessageSended(!messageSended)
}
  console.log("messageSended",messageSended)


  return (
    <div className='chat-site'>
      <main className="share-site-main">
      <section id="share-site-section" className='share-site-section'>
        {allMessages.map((ms)=>{
          return(<div key={ms._id} className="share-site-sended-message-container">
                <div className="share-site-user-name"> <div>{ms.chatter.userName}</div>
                <div className="ex-date">{ms.postedOn?ms.postedOn.slice(0,10):""}</div>
                </div>
               
              <div className="share-site-user-img-container">
              <Image className="share-site-user-image"
        cloudName= "dqukw0qgs"
        publicId = { ms.chatter.userImage }
      />
              </div>
            <div className="user-shared-message">{ms.code? <pre><code>{ms.message}</code></pre> :<div>{ms.message}</div>}
            <div className="like-container">
            <i onClick={likeHandler} className="fa-regular fa-thumbs-up"  ></i>
             <i onClick={likeHandler} className="fa-regular fa-thumbs-down" ></i>
            </div>
            </div>
          
          </div>
          )
        })}
        <div className="go-up"><a href="#share-site-section"><i class="fa-solid fa-angles-up"></i></a></div>
      </section>
     
      </main>
        <footer className="share-site-footer">
          <div className= "share-site-footer-container"  style={{scale:`${scale? ".8":".4"}`}}> 
            <div className="textarea-container" style={{scale:`${scale? "1":"0"}`}}>
            <textarea className="share-site-textarea" onChange={inputHandler} value= {input} style={{fontSize:size,color:color }}/>
            </div>
            <div className="share-site-send-message" onClick={sendMessageHandler} >
            <i className="fa-solid fa-paper-plane" style={{color:"#3787d6"}}></i>
            </div>
            
            <div className="message-tool-container">
              {messageTools? <>
              
                <div className="emoji-tool" onClick={scale? emojiToolHandler : null}>😀</div> 
                <input className="color-input" type="color" style={{pointerEvents:`${scale? "auto":"none"}`}} onChange={colorHandler}/>
                <div className="write-tool" onClick={scale?textToolHandler:null}><i className="fa-solid fa-text-height" style={{color:"#f44336"}}></i></div>
                <div onClick={codeHandler}><i className="fa-solid fa-code" style={{color:`${code? "#673ab7":"gray"}`}}></i></div>
                <div className="minimize" onClick={minimizeHandler}><i className="fa-solid fa-down-left-and-up-right-to-center" style={{fontSize:`${scale? "35px":"65px"}`,color:"#2196f3"}}></i></div>
                
              </>:<>
              {emojiArr &&  <>
            <div className="emoji-container">{EmojiArr.map((emoji,i)=>{
              return(
                <div key={i} onClick={emojiHandler } className={emoji} >{emoji}</div>
                )
              })}</div>
              <div className="go-back" onClick={goBackHandler}><i className="fa-solid fa-arrow-left"  style={{color:"#3787d6"}} ></i></div></>}
              {textToll && <>
                {TextSizeArr.map((size,i)=>{
                  return(
                    <div key={i}  onClick={sizeHandler}><i id={size} style={{fontSize:size,color:"#f44336"}} className="fa-solid fa-text-height"></i></div>
                  )
                })}  <div className="go-back" onClick={goBackHandler}><i className="fa-solid fa-arrow-left"  style={{color:"#3787d6"}} ></i></div>
              </>}
              </>}
              </div>
          </div>
        </footer>
    </div>
  )
}

export default ShareSite



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
const [size,setSize]=useState("")
const [color,setColor] = useState("")
const [scale,setScale]= useState(false)
const [code,setCode]= useState(false)

// Input functions
useEffect(()=>{
  document.querySelector(".share-site-textarea").focus()
})

  function inputHandler(e){
    if(code) setInput(`${<pre><code>{e.target.value}</code></pre>}`)
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
  
  // Get all messages function
  useEffect(()=>{
    async function getSharedMessages (){
      const allMessages = await axios.get(`http://localhost:4000/shareplattform`)
      setAllMessages(allMessages.data)
    }
    getSharedMessages ()
  },[])
  console.log("allMessages",allMessages)

  // Send message function
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
      <section className='section-two'>orem ipsum dolor sit amet consectetur adip</section>
      <section className='section-three'></section>
      <section className='section-four'></section>
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
                <div onClick={codeHandler}><i className="fa-solid fa-code" style={{color:"#673ab7"}}></i></div>
                <div className="minimize" onClick={minimizeHandler}><i className="fa-solid fa-down-left-and-up-right-to-center" style={{fontSize:`${scale? "35px":"65px"}`,color:"#2196f3"}}></i></div>
                
              </>:<>
              {emojiToll &&  <>
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



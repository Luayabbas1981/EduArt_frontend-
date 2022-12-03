import React,{useState,useEffect} from 'react'
import { useParams } from "react-router-dom";
import axios from "axios"
import { jsPDF } from "jspdf";
import "jspdf-autotable"

function Pruchase() {
    
    const [purchase,setPurchase]= useState([])
     const [purchaseData,setPurchaseData] = useState( []) 
   
     const {id} = useParams();      
     const purchaseId = id.slice(1)
  
    useEffect(()=>{
      
    async function getPurchaseData (){
      const purchaseData = await axios.get(`http://localhost:4000/mypurchases/${purchaseId}`)
      setPurchaseData(purchaseData.data)
      setPurchase(purchaseData.data.purchasedCourse
        )
    }
    getPurchaseData()
  },[])
      
   console.log(purchase)

      function download(){
    const pdfDiv =   document.querySelector(".pdf-purchase-container")
      const doc = new jsPDF('p', 'px', [620, 450]);
     
      doc.html(pdfDiv, {
        async callback(doc) { 
          
          doc.save(`Purchase invoice number ${purchaseData.invoiceNumber}.pdf`);
        }
      });
      
    }  
   
             
  return (
    
    <>
 
    <div className='pdf-purchase-container'>
    <img className='pdf-purchase-logo' src={require("../../Images/logo.png")} alt="" />
       
    <div className='pdf-purchase'>
      <div className='pdf-purchase-info1'>
        <div>Purchase invoice number:</div>
    <div>Course name: </div>
    <div>Course type: </div>
    <div>Course date of start: </div>
    <div>Course duration: </div>
    <div>Course inshort: </div>
    <div>Course price: </div>
    <div>Status:</div>
      </div>
      
      <div className='pdf-purchase-info2'>
        <div>{purchaseData.invoiceNumber}</div>
      <div> {purchase.courseName}</div>
    <div> {purchase.courseType}</div>
    <div> {purchase.dateOfStart?  (purchase.dateOfStart).slice(0,10):"unknown"}</div>
    <div> {purchase.courseDuration} Weeks</div>
    <div> {purchase.courseInShort}</div>
    <div> {purchase.coursePrice}€</div>
    <div>paid</div>
      </div>
    </div>
    <div className="accounting">

    <div>Accounting</div>
    <div className='sign-img'><img src={require("../../Images/signature2.png")} alt="" /></div>
    </div>
      </div>
      <div className='pdf-purchase-btn'>

    <button   onClick={download} >Download</button>
      </div>
   
    </>
  
  )
}

export default Pruchase
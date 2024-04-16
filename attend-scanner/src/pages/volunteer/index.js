import Head from "next/head";
import React, { useState, useEffect } from "react";
import BarcodeScannerComponent from "@steima/react-qr-barcode-scanner";
import Image from "next/image";
import { Inter } from "next/font/google";
import styles from "@/styles/Home.module.css";
import axios from "axios";
import 'bootstrap/dist/css/bootstrap.css';

const inter = Inter({ subsets: ["latin"] });
const API_URL = "https://hackframe.navinshrinivas.com";
var qr;

export default function Home() {
   const [data, setData] = React.useState("Not Found");
   const [qrscan, setqrscan] = useState();
   /* For manual srn entry */
   const [campus, setCampus] = useState("PES2UG")
   const [year, setYear] = useState("23")
   const [branch, setBranch] = useState("CS")
   const [last3srn,setLast3Srn] = useState("")
   const [fullSRN, setFullSRN] = useState("")

   const [stopStream, setStopStream] = React.useState(false);
   const [details, setDetails] = React.useState(true);
   const [data1, setData1] = React.useState();
   //...
   const dismissQrReader = () => {
      // Stop the QR Reader stream (fixes issue where the browser freezes when closing the modal) and then dismiss the modal one tick later
      setStopStream(true);
      if (stopStream == true) {
         window.location.reload();
      }
   };
   const presentCall = () => {
      axios
         .post(
            `${API_URL}/attend`,
            { Token: window.$qr.text },
            { headers: { Accept: "application/json" } }
         )
         .then((resp) => {
            // console.log(resp)
            if (resp.data.status == true) {
               alert("Attendance recorded!")
               axios
                  .post(
                     `${API_URL}/info`,
                     { Token: window.$qr.text },
                     { headers: { Accept: "application/json" } }
                  )
                  .then((resp) => {
                     // console.log(resp)
                     if (resp.data.status == true) {
                        setData1(resp.data.user);
                     } else {
                        setDetails(true)
                        alert("Invalid QR code!")
                        setStopStream(false);
                     }
                  }).catch((err) => {
                     console.log(err)
                     alert("Something is wrong with backend, contact Navin ASAP!")
                     setStopStream(false);
                  });

            } else {
               alert("Something went wrong, call the backend guys!")
            }
         }).catch((err) => {
            console.log(err)
            alert("Something is wrong with backend, contact Navin ASAP!")
         });
   }

   const checkoutCall = () => {
      axios
         .post(
            `${API_URL}/checkout`,
            { Token: window.$qr.text },
            { headers: { Accept: "application/json" } }
         )
         .then((resp) => {
            // console.log(resp)
            if (resp.data.status == true) {
               alert("Leaving recorded!")
               axios
                  .post(
                     `${API_URL}/info`,
                     { Token: window.$qr.text },
                     { headers: { Accept: "application/json" } }
                  )
                  .then((resp) => {
                     // console.log(resp)
                     if (resp.data.status == true) {
                        setData1(resp.data.user);
                     } else {
                        setDetails(true)
                        alert("Invalid QR code!")
                        setStopStream(false);
                     }
                  }).catch((err) => {
                     console.log(err)
                     alert("Something is wrong with backend, contact Navin ASAP!")
                     setStopStream(false);
                  });

            } else {
               alert("Something went wrong, call the backend guys!")
            }
         }).catch((err) => {
            console.log(err)
            alert("Something is wrong with backend, contact Navin ASAP!")
         });
   }
   const handleFood = (e) => {
      axios
         .post(
            `${API_URL}/food`,
            { Token: window.$qr.text, meal: e.target.id },
            { headers: { Accept: "application/json" } }
         )
         .then((resp) => {
            // console.log(resp)
            if (resp.data.status == true) {
               alert("Food attendance recorded!")
               axios
                  .post(
                     `${API_URL}/info`,
                     { Token: window.$qr.text },
                     { headers: { Accept: "application/json" } }
                  )
                  .then((resp) => {
                     // console.log(resp)
                     if (resp.data.status == true) {
                        setData1(resp.data.user);
                     } else {
                        setDetails(true)
                        alert("Invalid QR code!")
                        setStopStream(false);
                     }
                  }).catch((err) => {
                     console.log(err)
                     alert("Something is wrong with backend, contact Navin ASAP!")
                     setStopStream(false);
                  });

            } else {
               alert("Something went wrong, call the backend guys!")
            }
         }).catch((err) => {
            console.log(err)
            alert("Something is wrong with backend, contact Navin ASAP!")
         });
   }

   function handleCampusChange(data){
      setCampus(data)
   }
    function handleYearChange(data){
      setYear(data)
   }
    function handleBranchChange(data){
      setBranch(data)
   }
    function handleLast3Change(data){
      const regex = /^$|^[0-9]{1,3}$/;
      if(regex.test(data)){
      setLast3Srn(data)
      }
      else{
         alert("Please enter only 3 digits!")
      }
   }

   useEffect(() => {
      const srn = campus + year + branch + last3srn
      setFullSRN(srn)
   }, [campus, year, branch, last3srn]);

  /* useEffect(() => {
      console.log(fullSRN)
   },[fullSRN]) */

   return (
      <>
         <Head>
            <title>Volunteers page!</title>
            <meta name="description" content="Generated by create next app" />
            <meta name="viewport" content="width=device-width, initial-scale=1" />
            <link rel="icon" href="/favicon.ico" />
         </Head>
         <main className={styles.main2}>
            {details ? (
               <>
               <BarcodeScannerComponent
                  width="100%"
                  height="100%"
                  onUpdate={(err, result) => {
                     // console.log(err, result)
                     if (result) {
                        setStopStream(true);
                        axios
                           .post(
                              `${API_URL}/info`,
                              { Token: result.text },
                              { headers: { Accept: "application/json" } }
                           )
                           .then((resp) => {
                              // console.log(resp)
                              if (resp.data.status == true) {
                                 setData1(resp.data.user);
                                 window.$qr = result
                              } else {
                                 setDetails(true)
                                 alert("Invalid QR code!")
                                 setStopStream(false);
                              }
                           }).catch((err) => {
                              console.log(err)
                              alert("Something is wrong with backend, contact Navin ASAP!")
                              setStopStream(false);
                           });
                        setDetails(false);
                     }
                  }}
                  stopStream={stopStream}
               />
                <button onClick={dismissQrReader} className="btn btn-primary ">Toggle Scanner</button>
                <h1 style={{color: "black", fontWeight: "bold", margin: "auto", textAlign: "center"}}>PARTICIPANT VALIDATION</h1>
                <div style={{display: "flex", flexDirection: "column", alignItems: "center", gap:"1.5rem",  width: "100%"}}>
               <div style={{display: "flex", flexDirection: "column", gap:"0.5rem"}}>
                   <label for="campus" style = {{color: "black", fontWeight: "bold"}}>Select EC/RR Campus</label>
               <select name="campus" onChange = {(e) => handleCampusChange(e.target.value)}>
               <option value="PES1UG">RR Campus</option>
               <option value="PES2UG" selected>EC Campus</option>
               </select>
               </div>
               
                   <div style={{display: "flex", flexDirection: "column", gap:"0.5rem", width: "55%"}}>
                   <label for="year" style = {{color: "black", fontWeight: "bold"}}>Select Year of Joining</label>
               <select name="year" onChange = {(e) => handleYearChange(e.target.value)}>
               <option value="20">2020</option>
               <option value="21">2021</option>
                <option value="22">2022</option>
               <option value="23" selected>2023</option>
               </select>
               </div>
                  <div style={{display: "flex", flexDirection: "column", gap:"0.5rem"}}>
                   <label for="branch" style = {{color: "black", fontWeight: "bold"}}>Select Branch</label>
               <select name="branch" onChange = {(e) => handleBranchChange(e.target.value)}>
               <option value="CS" selected>CS</option>
               <option value="EC">EC</option>
               <option value="AM">AM</option>
               </select>
               </div>
               <div style={{display: "flex", flexDirection: "column", gap:"0.75rem"}}>
               <label for="last3" style = {{color: "black", fontWeight: "bold", margin: "auto", textAlign: 'center'}}>Enter last 3 digits of SRN</label>
               <input type="text" placeholder="last 3 digits.." value={last3srn}
               pattern="[0-9]{0,3}"  
               onChange={(e) => handleLast3Change(e.target.value)} 
               style={{width: "80%", margin: "auto", padding:"0.5rem"}}/> 
                  
               </div>
               
               </div>
               <button 
              onClick = {() => {
                  const regex = /^PES[12]UG(20|21|22|23)(CS|AM|EC)[0-9]{3}$/
                  if(fullSRN.length == 13 && regex.test(fullSRN) ){
                      setStopStream(true);
                       /*  axios
                           .post(
                              `${API_URL}/info`,
                              { SRN: fullSRN },
                              { headers: { Accept: "application/json" } }
                           )
                           .then((resp) => {
                              // console.log(resp)
                              if (resp.data.status == true) { */
                                 setData1("Yes")
                                 
                          /*    } else {
                                 setDetails(true)
                                 alert("Invalid participant!")
                                 setStopStream(false);
                              }
                           }).catch((err) => {
                              console.log(err)
                              alert("Something is wrong with backend, contact Navin ASAP!")
                              setStopStream(false);
                           }); */
                        setDetails(false); 
                  }
                  else{
                     console.log("Invalid SRN")
                  }
               }} 
               className="btn btn-primary">
                  Validate Participant
                  </button>
               </>
            ) : data1 ? (
               < div >
                  <center>

                     <h2>Name : {data1.name}</h2>
                     <h5>SRN : {data1.SRN}</h5>
                     <h5>Team : {data1.team.team_id}</h5>
                     <h5>Table : {data1.team.table_no}</h5>
                     <h5>Present : {data1.present ? ("yes") : "no"}</h5>
                     {data1.present ? (<h5>Entry time : {data1.entry_time.slice(11, -10)} {data1.entry_time.slice(0, 10)}</h5>) : null}

                     <h5>Check-out : {data1.checkout ? ("yes") : "no"}</h5>
                     {data1.checkout ? (<h5>Exit time : {data1.exit_time.slice(11, -10)} {data1.exit_time.slice(0, 10)}</h5>) : null}
                     <div>
                        {/* <label>Coffee1</label><input type="checkbox" checked={data1.meals.coffee1}></input> */}
                        <div class="container">
                           <div class="row">
                              <div class="col p-3">
                                 <button disabled={data1.present} className="btn btn-primary " onClick={presentCall}>
                                    {!data1.present ? ("Present") : (<p>{data1.entry_time.slice(11, -10)} [{data1.entry_time.slice(0, 10)}]</p>)}
                                 </button>
                              </div>
                              <div class="col p-3">
                                 <button disabled={data1.checkout} className="btn btn-primary" onClick={checkoutCall} >
                                    {!data1.checkout ? ("Checkout") : (<p>{data1.exit_time.slice(11, -10)} [{data1.exit_time.slice(0, 10)}]</p>)}
                                 </button>
                              </div>
                              <div class="col p-3">
                                 <button id="Dinner1" disabled={data1.meals.dinner1} className="btn btn-primary " type="button" onClick={handleFood}>
                                    Dinner
                                 </button>
                              </div>
                           </div>
                           <div class="row">
                          {/*    <div class="col p-3">
                                 <button id="Midnight1" disabled={data1.meals.midnight1} className="btn btn-primary " onClick={handleFood}>
                                    Minight Smaks
                                 </button>
                              </div> */}
                              <div class="col p-3">
                                 <button id="Breakfast1" disabled={data1.meals.breakfast1} className="btn btn-primary " type="button" onClick={handleFood}>
                                    Breakfast
                                 </button>
                              </div> 
                              {/* <div class="col p-3">
                                 <button id="Lunch1" disabled={data1.meals.lunch1} className="btn btn-primary " type="button" onClick={handleFood}>
                                    Lunch
                                 </button>
                              </div> */}
                           </div>
                        </div>
                     </div>
                  </center>
               </div>
            ) : null}
            {/* {console.log(data1.meals)} */}

           
         </main>
      </>
   );
}

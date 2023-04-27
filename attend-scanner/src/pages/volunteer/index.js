import Head from "next/head";
import React, { useState } from "react";
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
                              <div class="col p-3">
                                 <button id="Midnight1" disabled={data1.meals.midnight1} className="btn btn-primary " onClick={handleFood}>
                                    Minight Smaks
                                 </button>
                              </div>
                              <div class="col p-3">
                                 <button id="Breakfast1" disabled={data1.meals.breakfast1} className="btn btn-primary " type="button" onClick={handleFood}>
                                    Breakfast
                                 </button>
                              </div>
                              <div class="col p-3">
                                 <button id="Lunch1" disabled={data1.meals.lunch1} className="btn btn-primary " type="button" onClick={handleFood}>
                                    Lunch
                                 </button>
                              </div>
                           </div>
                        </div>
                     </div>
                  </center>
               </div>
            ) : null}
            {/* {console.log(data1.meals)} */}

            <button onClick={dismissQrReader} className="btn btn-primary ">Toggle Scanner</button>
         </main>
      </>
   );
}

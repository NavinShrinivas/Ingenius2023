import React from "react";
import BarcodeScannerComponent from "@steima/react-qr-barcode-scanner";

function Attendance() {
   const [data, setData] = React.useState("Not Found");

   return (
      <>
         <BarcodeScannerComponent
            width={500}
            height={500}
            onUpdate={(err, result) => {
               console.log(err, result)
               if (result) setData(result.text);
               else setData("Not Found");
            }}
         />
         <p>{data}</p>
      </>
   );
}

export default Attendance;

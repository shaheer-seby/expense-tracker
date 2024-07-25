'use client'
import React,{useState} from "react";
import Dashboard from "./Components/Dashboard";
import History from "./Components/History";


  


export default function Home() {


  
  const [data,setData]=useState([]);
  return (

    <div className="body">
    <div className="app-margin">
    <Dashboard data={data}/>
    <History setData={setData}/>


    </div>
    </div>
  );
}


import React from "react";
import { Outlet } from "react-router";
import Navbar from "../components/NavBar/Navbar";
import Footer from "../components/Footer/Footer";


export default function Root() {
  return (
    <div>
<Navbar/>
      <Outlet></Outlet>
  <Footer/>
    </div>


  )
}

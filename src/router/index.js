import { useRoutes, useNavigate } from "react-router-dom";
import React, {useEffect} from "react";
// import {doPost} from "../utils/apiCalls";
// import { ToastContainer, toast } from 'react-toastify';
import Home from "./../Pages/Home/Index";
import AboutUs from "./../Pages/Home/About/AboutUs";
import ContactUs from "./../Pages/Home/About/ContactUs";
import AUDIOS from "../Pages/Home/About/Audio";
import VIDEOS from "../Pages/Home/About/Videos";
import PDF from "../Pages/Home/About/PDF";
import Queries from "../Pages/Home/About/Queries";
import Answer from "../Pages/Home/About/Answers";
import View_pdf from "../Pages/Home/About/View_pdf";
import Donate from "../Pages/Home/About/Donate"
import useAuth from "../hooks/useAuth";

function Router() {
  const {getLoggedObject, setLoggedObject, isLoggedIn, checkLogin} = useAuth();
  const navigate = useNavigate();
  useEffect(() => {
  }, [])


  const authRoutes = [
      {path: "*", element: <Home/>},
    ];

    const unAuthRoutes = [
      {path: "/Home", element: <Home/>},
      {path: "/about-us", element: <AboutUs/>},
      {path: "/contact-us", element: <ContactUs/>},
      {path: "/audios", element: <AUDIOS/>},
      {path: "/videos", element: <VIDEOS/>},
      {path: "/pdf", element: <PDF/>},
      {path: "/queries", element: <Queries/>},
      {path: "/answer", element: <Answer/>},
      {path: "/view-pdf", element: <View_pdf/>},
      {path: "/donate", element: <Donate/>},
      {path: "*", element: <Home/>}
    ];

  const routes = isLoggedIn ? authRoutes : unAuthRoutes;
  // const routes = unAuthRoutes;
  return useRoutes(routes);
}

export default Router;

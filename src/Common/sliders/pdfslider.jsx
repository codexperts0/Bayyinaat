import React, { useEffect, useState } from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { SliderArr } from "./Jsons/slider";
import "./styles/style.css";
import { FaChevronRight, FaChevronLeft } from "react-icons/fa6";
import { useSelector } from "react-redux";
import { getAllProducts, getProductsByCategories } from "../../constants/apiEndPoints";
import httpRequest from "../../axios/index.js";


function SampleNextArrow(props) {
  const { className, style, onClick } = props;
  return <FaChevronRight onClick={onClick} className="CustomArrow right" />;
}

function SamplePrevArrow(props) {
  const { className, style, onClick } = props;
  return <FaChevronLeft onClick={onClick} className="CustomArrow left" />;
}

const PdfSlider = () => {
  const [pdfData, setPdfData] = useState([])
  const settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 2000,
    nextArrow: <SampleNextArrow className="CustomArrow" />,
    prevArrow: <SamplePrevArrow className="CustomArrow" />,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 1,
          infinite: true,
          dots: false
        }
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
          dots: false
        }
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          dots: false
        }
      }
    ]
  };

  const currentLanguage = useSelector((state) => state.languageSlice.currentlanguage);
  useEffect(()=>{
    const FetchProducts = async () => {
      try {
        const pdfResp = await httpRequest.post(`${getAllProducts}`,{slug:'Pdf',lang:currentLanguage?currentLanguage.code:''});
        if (pdfResp.status === 200 || pdfResp.status === 201) {
          // console.log('audi res',audioResp.data.data)
          setPdfData(pdfResp.data.data.data)
        }
       
      } catch (err) {
        console.log(err.message);
      }
    };

    FetchProducts();

  },[currentLanguage])


  return (
    <div className="MainSlider">
      <Slider {...settings}>
        {pdfData.map((item, index) => (
          <div key={index} className="SliderBox">
            <div className="InnerBoxSlide">
              <img
                style={{width:'100%', height:'150px' , objectFit:'cover', borderRadius:'10px'}}
                className="Sliderimg"
                src={item?.image}
                alt={item.title + index}
              />
              <div className="ViewBtn">
                <h1 className="onlineheading">{item.title}</h1>
              </div>
            </div>
          </div>
        ))}
      </Slider>
    </div>
  );
};

export default PdfSlider;

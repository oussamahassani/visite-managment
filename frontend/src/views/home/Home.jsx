import React from 'react';
import Footer from '../../components/home/Footer';
import Header from '../../components/home/Header';
import Satisfaction from '../../components/home/Satisfaction';
import WhoWeAre from '../../components/home/WhoWeAre';
import Specification from '../../components/home/Specification';
import Testimonial from '../../components/home/Testimoials'; // Corrected misspelling
import '../../components/home/style-starter.css';
import SwiperCore from "swiper";
import { Navigation, Autoplay, Pagination } from "swiper/modules";
import { EffectCards } from "swiper/modules";

import homevid from '../../assets/homevid.mp4';


const Home = () => {
  SwiperCore.use([Navigation, Autoplay, EffectCards, Pagination]);
  return (
    <div className="bg-gray-100 min-h-screen">
      <Header />

    

      <video autoPlay loop muted style={{ width: '100%', height: 'auto', borderRadius: '10px', boxShadow: '0 4px 6px rgba(0, 0, 0, 0.9)' }}>
        <source src={homevid} type="video/mp4" />
      </video>


      <Satisfaction />
      <WhoWeAre />
      <Specification />
      <Testimonial />
      <Footer />
    </div>
  );
};

export default Home;

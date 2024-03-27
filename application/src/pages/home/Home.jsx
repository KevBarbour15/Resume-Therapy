import React from "react";
import { Navbar } from "../../components/navbar/Navbar";
import { HeroImg } from "../../components/hero/Hero";
import { Footer } from "../../components/footer/Footer";
import { Work } from "../../components/work/Work";

function Home() {
  return (
    <div>
      <Navbar />
      <HeroImg />
      <Work />
      <Footer />
    </div>
  );
}

export default Home;

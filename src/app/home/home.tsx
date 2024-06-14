import React from "react";
import Navigation from "@/app/components/navigation";
import Footer from "@/app/components/footer";
import BtnUp from "../components/btnUp";
import Banner from './banner';
import About from './about';
import ProductsSlider from "./productsSlider";
import Services from "./services";
import Products from "./products";
import Questions from "./questions";
import Contact from "./contact";

const home = () => {
  return (
    <div>
      <Navigation></Navigation>
      <div className="relative top-[60px] w-full ">
      <Banner></Banner>
        <main className="relative">
          <ProductsSlider></ProductsSlider>
          <About></About>
          <Services></Services>
          <Products></Products>
          <Questions></Questions>
          <Contact></Contact>
        </main>
        <Footer></Footer>
        <BtnUp></BtnUp>
      </div>
      
    </div>
  );
};

export default home;

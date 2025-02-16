import React from "react";
import Navbar from "./components/Navbar";
import Hero from "./components/homeComponents/Hero";
import Features from "./components/homeComponents/Features";
import Products from "./components/homeComponents/Products";
import Footer from "./components/Footer";
import Faq from "./components/Faq";

const page = () => {
  return (
    <div>
      <nav>
        <Navbar
          backgroundColor="bg-transparent"
          borderColor="border-none"
          textColor="text-white"
        />
      </nav>
      <header>
        <Hero />
      </header>
      <section>
        <Features />
      </section>
      <section>
        <Products />
      </section>
      <hr/>
      <section>
        <Faq />
      </section>
      <footer>
        <Footer />
      </footer>
    </div>
  );
};

export default page;

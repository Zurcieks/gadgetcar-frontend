import React from "react";
import Hero from "./components/homeComponents/Hero";

import Products from "./components/homeComponents/Products";
import Navbar from "./components/Navbar";
import Features from "./components/homeComponents/Features";
import Footer from "./components/Footer";

const page = () => {
  return (
    <div>
      <nav>
        <Navbar />
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
      <footer>
        <Footer />
      </footer>
    </div>
  );
};

export default page;

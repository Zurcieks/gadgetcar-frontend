import React from 'react'
import Hero from './components/Hero'
 
import Products from './components/Products'
import Navbar from './components/Navbar'

const page = () => {
  return (
    <div>
      <nav>
        <Navbar/>
      </nav>
      <header>
        <Hero/>
      </header>
      <hr className=''/>
      <section>
        <Products/>
      </section>
    </div>
  )
}

export default page
import Image from "next/image";
import Link from "next/link";
import React from "react";

const Hero = () => {
  return (
    <header className="relative flex w-full h-[80vh] bg-black items-center justify-start">
      <Image
        src="/gadget.jpg"
        alt="Background Image"
        layout="fill"
        objectFit="cover"
        objectPosition="center"
        quality={100}
        className="z-10 opacity-50"
      />
      <div className="container flex flex-col justify-center items-center md:items-start mx-auto space-y-5  z-20 ">
        <h1 className="hidden md:block text-3xl text-center w-auto md:text-start md:text-5xl font-sans md:w-2/3  font-bold text-white">
          Popraw swój komfort za kierownicą z naszymi radiami dotykowymi
        </h1>
        <h1 className=" md:hidden text-4xl  font-bold text-center    text-white">
          Popraw swój komfort za kierownicą z naszymi radiami
        </h1>
        <p className=" hidden md:block text-xl w-full text-center md:text-start md:text-xl font-sans md:w-1/2 text-white">
          Ulepsz podróże dzięki radiu z dotykowym ekranem – łatwe sterowanie
          multimediami, nawigacją i połączeniami. Styl i funkcjonalność w
          jednym.
        </p>
        <p className="md:hidden text-xl  text-center   font-sans text-white">
          Ulepsz podróże dzięki radiu z dotykowym ekranem multimediami,
          nawigacją i połączeniami.
        </p>
        <Link
          className=" flex  border-2 text-white border-white px-4 py-3 bg-transparent rounded-md"
          href="/sklep"
        >
          Przeglądaj
        </Link>
      </div>
    </header>
  );
};

export default Hero;

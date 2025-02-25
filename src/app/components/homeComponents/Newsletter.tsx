import Image from "next/image";
import Link from "next/link";
import React from "react";

const Newsletter = () => {
  return (
    <header className="relative flex w-full h-[50vh] bg-black items-center justify-start ">
      <Image
        src="/radio.jpeg"
        alt="Background Image"
        layout="fill"
        objectFit="cover"
        objectPosition="center"
        quality={100}
        className="z-10 opacity-80"
      />
      <div className="container flex flex-col justify-center items-center md:items-start mx-auto space-y-5  z-20 ">
        <h1 className="text-2xl text-white">Popraw swój komfort</h1>
      </div>
    </header>
  );
};

export default Newsletter;

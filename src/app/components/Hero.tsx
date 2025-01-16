import Link from "next/link";
import Image from "next/image";
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
        className="absolute inset-0 z-10"
      />
      <div className="flex flex-col mx-auto w-full max-w-screen-xl px-4 lg:px-8 bg-black bg-opacity-50">
        <h1 className="text-white text-4xl lg:text-5xl z-30  w-auto lg:w-1/2 leading-tight font-bold font-italic">
          Odkryj nowoczesne gadżety do Twojego samochodu
        </h1>

        <p className="text-white mt-4 lg:mt-5 w-full z-30 lg:w-1/3">
          Znajdź innowacyjne rozwiązania, które poprawią komfort i bezpieczeństwo jazdy. Nasze produkty są starannie wyselekcjonowane, aby sprostać twoim oczekiwaniom.
        </p>

        <div className="mt-6 lg:mt-7 z-50">
          <Link
            href="/link1"
            className="text-black bg-white py-3 px-6 rounded hover:bg-black hover:text-white transition-colors duration-300 w-full sm:w-auto"
          >
            Zobacz
          </Link>
        </div>
      </div>
    </header>
  );
};

export default Hero;

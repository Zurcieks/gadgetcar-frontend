
import Link from "next/link";
import { MdEmail } from "react-icons/md";
const Footer = () => {
  return (
    <footer className="bg-black text-white py-10">
      <div className="container mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <div>
            <h2 className="text-xl font-sans font-bold text-white">
               GadgetCar
            </h2>
            <p className="mt-2 text-gray-400">
              Masz jakieś pytania lub potrzebujesz pomocy? Skontaktuj się z nami
              już teraz.
            </p>
            <div className="mt-4 space-y-2 text-gray-300">
              <p><MdEmail /> gadgetcarpl@gmail.com</p>
            </div>
          </div>

          <div>
            <h3 className="text-lg font-semibold">OBSŁUGA KLIENTA</h3>
            <ul className="mt-2 space-y-1 text-gray-400">
              <li>
                <Link href="/kontakt">Kontakt</Link>
              </li>
              <li>
                <Link href="/regulamin">Zwroty i reklamacje</Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-lg font-semibold">INFORMACJE</h3>
            <ul className="mt-2 space-y-1 text-gray-400">
              <li>
                <Link href="/regulamin">Regulamin</Link>
              </li>
              <li>
                <Link href="/regulamin">Polityka prywatności</Link>
              </li>
              <li>
                <Link href="/regulamin">Płatność i dostawa</Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-lg font-semibold">MOJE KONTO</h3>
            <ul className="mt-2 space-y-1 text-gray-400">
              <li>
                <Link href="/zamowienia">Moje zamówienia</Link>
              </li>
              <li>
                <Link href="/konto">Moje dane</Link>
              </li>
       
            </ul>
          </div>
        </div>

        {/* Dolna część */}
        <div className="border-t border-gray-700 mt-6 pt-4 flex flex-col md:flex-row justify-between items-center text-gray-400 text-sm">
          <p>
            GadgetCar © 2025. 
     
          </p>

          <div className="flex space-x-2 mt-2 md:mt-0">
            <span className="bg-gray-700 p-2 rounded-full"></span>
            <span className="bg-gray-700 p-2 rounded-full"></span>
            <span className="bg-gray-700 p-2 rounded-full"></span>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

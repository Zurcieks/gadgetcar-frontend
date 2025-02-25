import Head from "next/head";

export default function TermsAndConditions() {
  return (
    <>
      <Head>
        <title>Regulamin sklepu | Nazwa Sklepu</title>
      </Head>
      <div className="max-w-4xl mx-auto p-6 ">
        <h1 className="text-3xl font-bold mb-6">Regulamin Sklepu</h1>

        <section className="mb-6">
          <h2 className="text-xl font-semibold mb-2">
            1. Postanowienia ogólne
          </h2>
          <p>
            Regulamin określa zasady korzystania ze sklepu internetowego oraz
            warunki składania zamówień i realizacji transakcji.
          </p>
        </section>

        <section className="mb-6">
          <h2 className="text-xl font-semibold mb-2">2. Definicje</h2>
          <ul className="list-disc list-inside">
            <li>
              <strong>Sprzedawca</strong> – właściciel sklepu internetowego.
            </li>
            <li>
              <strong>Kupujący</strong> – osoba fizyczna lub firma dokonująca
              zakupu.
            </li>
            <li>
              <strong>Sklep</strong> – platforma internetowa umożliwiająca
              zakupy online.
            </li>
          </ul>
        </section>

        <section className="mb-6">
          <h2 className="text-xl font-semibold mb-2">3. Składanie zamówień</h2>
          <p>
            Klient może składać zamówienia poprzez stronę internetową 24/7. Po
            złożeniu zamówienia Kupujący otrzymuje e-mail z potwierdzeniem.
          </p>
        </section>

        <section className="mb-6">
          <h2 className="text-xl font-semibold mb-2">4. Ceny i płatności</h2>
          <p>
            Wszystkie ceny podane w sklepie są w walucie lokalnej i zawierają
            podatek VAT (jeśli dotyczy). Sklep akceptuje różne formy płatności,
            takie jak przelewy bankowe, karty kredytowe oraz płatności online.
          </p>
        </section>

        <section className="mb-6">
          <h2 className="text-xl font-semibold mb-2">5. Dostawa</h2>
          <p>
            Dostawa realizowana jest na terenie wskazanym w regulaminie sklepu.
            Czas realizacji zamówienia może się różnić w zależności od
            dostępności produktów.
          </p>
        </section>

        <section className="mb-6">
          <h2 className="text-xl font-semibold mb-2">6. Zwroty i reklamacje</h2>
          <p>
            Kupujący ma prawo do zwrotu towaru w ciągu 14 dni od otrzymania
            zamówienia bez podania przyczyny. Reklamacje można składać drogą
            elektroniczną.
          </p>
        </section>

        <section className="mb-6">
          <h2 className="text-xl font-semibold mb-2">
            7. Ochrona danych osobowych
          </h2>
          <p>
            Dane osobowe klientów są przetwarzane zgodnie z polityką prywatności
            oraz obowiązującymi przepisami RODO.
          </p>
        </section>

        <section className="mb-6">
          <h2 className="text-xl font-semibold mb-2">
            8. Postanowienia końcowe
          </h2>
          <p>
            Sprzedawca zastrzega sobie prawo do zmiany regulaminu. Aktualna
            wersja regulaminu jest zawsze dostępna na stronie sklepu.
          </p>
        </section>
      </div>
    </>
  );
}

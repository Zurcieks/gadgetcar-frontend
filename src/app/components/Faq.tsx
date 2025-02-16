"use client"
import { useState } from 'react';

const FAQ = () => {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  const toggleAnswer = (index: number) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  const faqs = [
    {
      question: "Jak mogę założyć konto?",
      answer: "Aby założyć konto, kliknij na przycisk 'Zarejestruj się' na stronie głównej i wypełnij formularz rejestracyjny.",
    },
    {
      question: "Jak mogę zresetować hasło?",
      answer: "Kliknij na 'Nie pamiętasz hasła?' na stronie logowania, a następnie wprowadź swój adres e-mail.",
    },
    {
      question: "Czy mogę zmienić moje dane kontaktowe?",
      answer: "Tak, możesz edytować swoje dane kontaktowe w sekcji 'Moje konto'.",
    },
  ];

  return (
    <div className="w-full max-w-4xl mx-auto my-12 p-4 rounded-lg">
      <h2 className="text-2xl font-semibold text-center mb-6">Najczęściej zadawane pytania</h2>
      <div>
        {faqs.map((faq, index) => (
          <div key={index} className="border-b border-gray-200 py-4">
            <button
              className="w-full text-left text-lg font-medium  focus:outline-none flex items-center justify-between"
              onClick={() => toggleAnswer(index)}
            >
              <span>{faq.question}</span>
              <svg
                className={`w-5 h-5 transform transition-transform duration-300 ${
                  activeIndex === index ? 'rotate-180' : ''
                }`}
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                strokeWidth="2"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M19 9l-7 7-7-7"
                />
              </svg>
            </button>
            {activeIndex === index && (
              <p className="mt-5">{faq.answer}</p>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default FAQ;

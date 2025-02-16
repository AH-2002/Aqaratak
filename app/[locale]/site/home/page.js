import { getTranslations } from "next-intl/server";
import Navbar from "../Navbar";
import Footer from "../Footer";
import LanguageSwitcher from "./LanguageSwitcher";
import Brands from "./Brands";
import Purchase from "./Purchase";
import Rent from "./Rent";
import ScrollToUp from "./ScrollToUp";
import Service from "./Service";

export default async function Home({ params }) {
  const t = await getTranslations({ locale: params.locale, namespace: "welcome" });

  return (
    <>
      <Navbar />
      <section className='max-w-8xl mx-auto px-4 sm:px-6 lg:px-8'>
        <main className="relative flex flex-col items-center justify-center min-h-screen">
          <div className="relative w-full h-screen">
            <img
              src="/background3.jpg"
              alt="Background"
              className="absolute inset-0 object-cover w-full h-full filter brightness-50 rounded-lg"
            />
            <div className="absolute flex flex-col items-center w-full">
              <p className="text-white text-5xl text-center w-11/12">{t("title")}</p>
              <div className="bg-white w-11/12 p-5 flex flex-wrap justify-between items-center rounded-lg">
                {/* Input Fields */}
                {["lookingFor", "type", "price", "location"].map((key) => (
                  <div key={key} className="input">
                    <label className="font-bold text-lg">{t(key)}</label>
                    <input
                      type="text"
                      className="border border-gray-400 rounded-lg p-2 w-full"
                      placeholder={t(`${key}Placeholder`)}
                    />
                  </div>
                ))}
                <button className="mt-6 bg-gradient-to-b from-purple-700 to-pink-400 text-white py-2 px-6 rounded-lg text-lg">
                  <i className="fa-solid fa-magnifying-glass mr-2"></i>{t("search")}
                </button>
              </div>
            </div>
          </div>
        </main>
        <Brands />
        <Purchase />
        <Rent />
        <Service />
        <ScrollToUp />
        <LanguageSwitcher />
      </section>
      <Footer />
    </>
  );
}

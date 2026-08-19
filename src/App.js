import './App.css';
import Header from './Components/Header/Header.js'
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from './Components/Page/Home/Home.js';
import Layout from './Components/Layout/Layout'
import Footer from './Components/Footer/Footer.js';
import Login from './Components/Page/Login/Login.js' 
import Product from './Components/Page/Product/Product.js' 
import Cart from './Components/Page/Cart/Cart.js'
import Company from './Components/Page/Company/Company.js'
import Support from './Components/Page/Support/Support.js'
import { useState } from 'react';
import ThemeContext from './Components/ThemeContext/ThemeContext.js'
import LanguageContext from './Components/LanguageContext/LanguageContext.js';
import En from './translations/En.js';
import Fa from './translations/Fa.js';

function App() {
  const [Theme,setTheme] = useState("light");
  const [language, setlanguage] = useState("en");
  const translations = language === "en" ? En : Fa;
  return (
    <LanguageContext.Provider value={{ language, setlanguage,translations }}>
      <ThemeContext.Provider value={{ Theme, setTheme }}>
        <div className={Theme} >
          <BrowserRouter>
            <Layout>
              <div  dir={language === "fa" ? "rtl" : "ltr"} >
              <Routes >
                <Route path="/" element={<Home />} />
                <Route path="/Login" element={<Login />} />
                <Route path="/Product" element={<Product />} />
                <Route path="/Cart" element={<Cart />} />
                <Route path="/Company" element={<Company />} />
                <Route path="/Support" element={<Support />} />
              </Routes>
              </div>
              <Footer/>
            </Layout>
          </BrowserRouter>
        </div>
      </ThemeContext.Provider>
    </LanguageContext.Provider>
  );
}

export default App;

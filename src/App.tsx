import './App.css';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from './Components/Page/Home/Home';
import Layout from './Components/Layout/Layout'
import Footer from './Components/Footer/Footer';
import Login from './Components/Page/Login/Login' 
import Product from './Components/Page/Product/Product' 
import Cart from './Components/Page/Cart/Cart'
import Company from './Components/Page/Company/Company'
import Support from './Components/Page/Support/Support'
import { useState } from 'react';
import ThemeContext from './Components/ThemeContext/ThemeContext'
import LanguageContext from './Components/LanguageContext/LanguageContext';
import En from './translations/En';
import Fa from './translations/Fa';

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

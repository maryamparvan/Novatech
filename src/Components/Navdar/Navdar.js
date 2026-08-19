import { Link } from "react-router-dom";
import './Navbar.css';
import { SiTechcrunch } from "react-icons/si";
import React, { useState, useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import ThemeContext from "../ThemeContext/ThemeContext.js";
import { GrLanguage } from "react-icons/gr";
import LanguageContext from "../LanguageContext/LanguageContext";

const Navdar = (() =>{
  const { Theme, setTheme } = useContext(ThemeContext);
  const { language, setlanguage, translations} = useContext(LanguageContext);
  const navigate = useNavigate();
  const [currentUser, setCurrentUser] = useState(
    JSON.parse(localStorage.getItem("currentUser") || "null")
  );
  useEffect(() => {
    const updateUser = () => {
      const user = JSON.parse(localStorage.getItem("currentUser") || "null");
      setCurrentUser(user);
    };
    window.addEventListener("userChanged", updateUser);
    return () => {
      window.removeEventListener("userChanged", updateUser);
    };
  }, []);
  const logout = () => {
    localStorage.removeItem("currentUser");
    setCurrentUser(null);
    window.dispatchEvent(new Event("userChanged"));
  };
    return(
      <nav className="NavdarClass">
        <div className="language">
          <select value={language} onChange={(e) => setlanguage(e.target.value)}>
            <option value="en">EN</option>
            <option value="fa">FA</option>
          </select>
          <GrLanguage />
        </div>
        {currentUser ? (
          <Link to="/login" className="LinkClass" onClick={logout}>{translations.logout}</Link>
            ) : (
                <Link to="/login" className="LinkClass"> {translations.login}</Link>
            )}
        <Link to="/product" className="LinkClass">{translations.product}</Link>
        <Link to="/Cart" className="LinkClass">{translations.cart}</Link>
        <Link to="/" className="LinkClass">{translations.home}</Link>
        <div className="NavbarDiv"><div className={`cricle ${Theme === "dark" ? "active" :""}`}  onClick={() =>  setTheme(Theme === "light" ? "dark" : "light")}></div></div>
      </nav>
    )
})

export default Navdar;
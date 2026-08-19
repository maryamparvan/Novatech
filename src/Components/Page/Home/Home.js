import React,{useContext} from "react";
import photo from "./photo/Story Instagram Tenha um Bom Dia Sábado Minimalista Branco e Cinza.png";
import photo1 from "./photo/Black White Minimalist Modern Headphones Product Introduction Instagram Story (2).png";
import photo4 from "./photo/Black White Modern New Arrival Smartphone Sale Instagram Post.png";
import photo3 from "./photo/Grey Minimalist Product Advertising Instagram Post.png";
import photo2 from "./photo/Neutral Modern Elegant Watch Instagram Post.png";
import './Home.css';
import Button from '../../Button/Button'
import { useNavigate } from "react-router-dom";
import LanguageContext from "../../LanguageContext/LanguageContext";

const Home = (() =>{
    const { translations } = useContext(LanguageContext);
    const shop = useNavigate();
    return(
        <div className="HomeClass">
            <div className="HeroSection">
                <img src={photo} className="HomeClassImg" />
                <div className="HeroContent">
                    <Button text={translations.ShopNow} className="ButtonShop"  fun={() => shop("/Product")}/>
                </div>
            </div>
            <div className="photoClass">
                <img src = {photo1} className="ClassImg" />
                <img src = {photo2} className="ClassImg" />
                <img src = {photo3} className="ClassImg" />
                <img src = {photo4} className="ClassImg" />
            </div>
        </div>
    )
});

export default Home;
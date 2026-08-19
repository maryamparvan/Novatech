import React, { useState, useEffect,useContext } from "react";
import './CreatCart.css';
import Button from "../../../Button/Button";
import image from './ProductPhoto/Image.js'
import LanguageContext from "../../../LanguageContext/LanguageContext";
import ProductData from '../ProductData.json';


const CreatCart = ({ category,search}) =>{
    const { translations } = useContext(LanguageContext);
    const [active,setactive] = useState(null);
    useEffect(() => {
        const handleClickOutside = () => {
            setactive(null);
        };
        document.addEventListener("click", handleClickOutside);
        return () => {
            document.removeEventListener("click", handleClickOutside);
        };
    }, []);
    const Product = JSON.parse(localStorage.getItem("Product")) || ProductData;
    useEffect(() => {
        const savedProducts = localStorage.getItem("Product");
        if (!savedProducts) {
            localStorage.setItem("Product", JSON.stringify(Product));
        }
    }, []);
    const addLocalStorage = (nameitem) =>{
        const ShopProduct = JSON.parse(localStorage.getItem("ShopProduct")) || [];
        const productExists = ShopProduct.some(
            (item) => item.namep === nameitem
        );
        if (productExists) {
            const newProducts = ShopProduct.filter(
                (item) => item.namep !== nameitem
            );
            localStorage.setItem("ShopProduct",JSON.stringify(newProducts));
            setaddcart(newProducts);
        } else {
            const newProducts = [
                ...ShopProduct,
                {
                    namep: nameitem,
                    quantity: 1
                }
            ];
            localStorage.setItem("ShopProduct",JSON.stringify(newProducts));
            setaddcart(newProducts);
        }
    };
    const filteredProducts = Product.filter((item) => {
        const categoryMatch = category === "All" || item.type === category;
        const searchMatch = item.name.toLowerCase().includes(search.toLowerCase());
        return categoryMatch && searchMatch;
    });
    const [addcart, setaddcart] = useState(
        JSON.parse(localStorage.getItem("ShopProduct")) || []
    );

    return(
        <div className="divdivdiv">
        <div className="CartClass">
            {filteredProducts.map((item) =>(
                <div  key={item.id} className={`classCartp ${active === item.id ? "active" : ""}`} onClick={(e) => {e.stopPropagation();
                    setactive(item.id);}} >
                    <img src={image[item.id]} alt={item.name} className="imageClass" /> 
                    <h3>{item.name}</h3> 
                    <p>{translations.type}: {item.type}</p>
                    <p>{translations.price}:{item.price}</p>
                    <p>{translations.available} : {item.num}</p>
                   <Button text={ addcart.some((cartItem) => cartItem.namep === item.name)? "Remove from Cart" : "Add to Cart"} className="ButtonCart" fun={() => addLocalStorage(item.name)} />
                </div>
            ))}
        </div>
        </div>
    )
}

export default CreatCart;
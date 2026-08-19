import React, { useState, useEffect, useContext } from "react";
import './Cart.css';
import image from '../Product/CreatCart/ProductPhoto/Image.js'
import Button from "../../Button/Button";
import OrderSummary from './OrderSummary.js';
import LanguageContext from "../../LanguageContext/LanguageContext.js";

const Cart = (() =>{
    const [active, setActive] = useState(false);
    const { translations } = useContext(LanguageContext);
    useEffect(() => {
        const handleClickOutside = () => {
            setActive(null);
        };
    
        document.addEventListener("click", handleClickOutside);
    
        return () => {
            document.removeEventListener("click", handleClickOutside);
        };
    }, []);
    const Product = JSON.parse(localStorage.getItem("Product"))
    const [shopProduct, setShopProduct] = useState(
        JSON.parse(localStorage.getItem("ShopProduct")) || []
    );
    const deleteFromCart = (namepro) => {
        const newCart = shopProduct.filter(
            (item) => item.namep !== namepro
        );
        localStorage.setItem("ShopProduct",JSON.stringify(newCart));
        setShopProduct(newCart);
    };
    const cartProducts = Product.filter((product) =>
        shopProduct.some(
            (cartItem) => cartItem.namep === product.name
        )
    );
    const addQuantity = (nameCart,quantityS) => {
        const newCart = shopProduct.map((item) =>
            item.namep === nameCart
                ? { ...item, quantity: Number(quantityS) }
                : item
        );
        localStorage.setItem ("ShopProduct",JSON.stringify(newCart))
        setShopProduct(newCart);
    }
    return(
        <div className="CartClassShop">
            <div className="headerCart">
                <h1>Cart</h1>
            </div>
            <div className="Cartcart">
                {cartProducts.map((item) => (
                    <div key={item.id} className={`Cartcartdiv ${active === item.id ? "active" : ""}`} onClick={(e) => {e.stopPropagation();
                        setActive(item.id);}} >
                        <img src={image[item.id]} alt={item.name} className="imageClasscart" /> 
                        <h3>{translations.type} :{item.name}</h3>
                        <p>{translations.price}: ${item.price}</p>
                        <p>{translations.available} :{item.num}</p>
                        <select onChange={(e) => addQuantity(item.name, e.target.value)}>
                            {Array.from({ length: item.num }, (_, index) => (
                                <option key={index + 1} value={index + 1} >
                                    {index + 1}
                                </option>
                            ))}
                        </select>
                        <Button text={translations.deleteFromCart} fun={() => deleteFromCart(item.name)} className="ButtonDeleteCart" />
                    </div>
                ))} 
            </div>
            <OrderSummary shopProduct={shopProduct} setShopProduct={setShopProduct}/>
        </div>
    )
})

export default Cart;
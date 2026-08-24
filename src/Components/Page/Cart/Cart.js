import React, { useState, useEffect, useContext } from "react";
import './Cart.css';
import Button from "../../Button/Button";
import OrderSummary from './OrderSummary.js';
import LanguageContext from "../../LanguageContext/LanguageContext.js";
import getProducts from "../../../services/productApi";

const Cart = (() =>{
    const [active, setActive] = useState(false);
    const { translations } = useContext(LanguageContext);

    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const data = await getProducts();
                setProducts(data);
            } catch (error) {
                setError(error.message);
            } finally {
                setLoading(false);
            }
        };
    
        fetchProducts();
    }, []);

    useEffect(() => {
        const handleClickOutside = () => {
            setActive(null);
        };
        document.addEventListener("click", handleClickOutside);
        return () => {
            document.removeEventListener("click", handleClickOutside);
        };
    }, []);

    const [shopProduct, setShopProduct] = useState(JSON.parse(localStorage.getItem("ShopProduct")) || [] );

    const deleteFromCart = (idprp) => {
        const newCart = shopProduct.filter(
            (item) => item.id !== idprp
        );
        localStorage.setItem("ShopProduct",JSON.stringify(newCart));
        setShopProduct(newCart);
    };

    const cartProducts = products.filter((product) =>
    shopProduct.some(
        (cartItem) => cartItem.id === product.id
    )
);

    const addQuantity = (idpro,quantityS) => {
        const newCart = shopProduct.map((item) =>
            item.id === idpro
                ? { ...item, quantity: Number(quantityS) }
                : item
        );
        localStorage.setItem ("ShopProduct",JSON.stringify(newCart))
        setShopProduct(newCart);
    }
    if (loading) {
        return <p>Loading...</p>;
    }
    
    if (error) {
        return <p>Error: {error}</p>;
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
                        <img src={item.thumbnail} alt={item.title} className="imageClasscart" /> 
                        <h3> {item.title}</h3>
                        <p>{translations.price}: ${item.price}</p>
                        <p>{translations.available} :{item.stock}</p>
                        <select onChange={(e) => addQuantity(item.id, e.target.value)}>
                            {Array.from({ length: item.stock }, (_, index) => (
                                <option key={index + 1} value={index + 1} >
                                    {index + 1}
                                </option>
                            ))}
                        </select>
                        <Button text={translations.deleteFromCart} fun={() => deleteFromCart(item.id)} className="ButtonDeleteCart" />
                    </div>
                ))} 
            </div>
            <OrderSummary shopProduct={shopProduct} setShopProduct={setShopProduct}/>
        </div>
    )
})

export default Cart;
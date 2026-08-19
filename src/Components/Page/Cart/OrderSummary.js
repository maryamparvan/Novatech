import React,{useState, useContext} from "react";
import ProductData from "../Product/ProductData.json";
import Button from "../../Button/Button";
import './OrderSummary.css';
import LanguageContext from "../../LanguageContext/LanguageContext";
import { useNavigate } from "react-router-dom";

const OrderSummary = (({ shopProduct, setShopProduct }) =>{
    const navigate = useNavigate();
    const { translations } = useContext(LanguageContext);
        const ShopProduct = JSON.parse(localStorage.getItem("ShopProduct")) || []
        const cartProducts = ProductData.filter((item) =>
            ShopProduct.some(
                (cartItem) => cartItem.namep === item.name
            )
        );
            const total = cartProducts.reduce((sum, product) => {
                const cartItem = ShopProduct.find(
                    (item) => item.namep === product.name
                );
            return sum + Number(product.price)* cartItem.quantity;
        }, 0);
        const AvailableNum = () =>{
            const currentUser = localStorage.getItem("currentUser");

            if (!currentUser) {
                navigate("/Login");
                return;
            }
            const productLocal = JSON.parse(localStorage.getItem("Product")) || []
            const newProducts = productLocal.map((product) => {
                const cartItem = ShopProduct.find(
                    (item) => item.namep === product.name
                );
                if (cartItem) {
                    return {
                        ...product,
                        num: product.num - cartItem.quantity
                    };
                }
                console.log("test1");
                return product;
            });
            localStorage.setItem("Product",JSON.stringify(newProducts))
            localStorage.setItem("ShopProduct",JSON.stringify([]))
            setShopProduct([]);
        }
    return(
        <div className="OrderSummaryClass">
            <h2>{translations.OrderSummary}</h2>
            <p>{translations.Subtotal}: ${total}</p>
            <p>{translations.Shipping}: $20</p>
            <p>{translations.EstimatedDelivery}</p>
            <hr />
            <p>{translations.Total}: ${total + 20}</p>
            <Button text={translations.pay} className="ButtonPay" fun={AvailableNum}/> 
        </div>
    )
})

export default OrderSummary;
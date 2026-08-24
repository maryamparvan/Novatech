import React,{ useContext, useState, useEffect} from "react";
import getProducts from "../../../services/productApi";
import Button from "../../Button/Button";
import './OrderSummary.css';
import LanguageContext from "../../LanguageContext/LanguageContext";
import { useNavigate } from "react-router-dom";

const OrderSummary = (({ shopProduct, setShopProduct }) =>{
    const navigate = useNavigate();
    const [products, setProducts] = useState([]);
    useEffect(() => {
        const fetchProducts = async () => {
            const data = await getProducts();
            setProducts(data);
        };
        fetchProducts();
    }, []);
    const { translations } = useContext(LanguageContext);
    const total = shopProduct.reduce((sum, cartItem) => {
        const product = products.find(
            (item) => item.id === cartItem.id
        );
        if (!product) {
            return sum;
        }
        return sum + Number(product.price) * Number(cartItem.quantity);
    }, 0);

    const AvailableNum = () =>{
        const currentUser = localStorage.getItem("currentUser");
        if (!currentUser) {
            navigate("/Login");
            return;
        }
        localStorage.setItem("ShopProduct",JSON.stringify([]));
        setShopProduct([]);
    };
    return(
        <div className="OrderSummaryClass">
            <h2>{translations.OrderSummary}</h2>
            <p>{translations.Subtotal}: ${total.toFixed(1)}</p>
            <p>{translations.Shipping}: $10</p>
            <p>{translations.EstimatedDelivery}</p>
            <hr />
            <p>{translations.Total}: ${total.toFixed(1) + 10}</p>
            <Button text={translations.pay} className="ButtonPay" fun={AvailableNum}/> 
        </div>
    )
})

export default OrderSummary;
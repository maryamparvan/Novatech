import React, { useState, useEffect,useContext } from "react";
import './CreatCart.css';
import Button from "../../../Button/Button";
import LanguageContext from "../../../LanguageContext/LanguageContext";
import getProducts from "../../../../services/productApi";


const CreatCart = ({ category,search}) =>{
    const { translations } = useContext(LanguageContext);
    const [active,setactive] = useState(null);

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
            setactive(null);
        };
        document.addEventListener("click", handleClickOutside);
        return () => {
            document.removeEventListener("click", handleClickOutside);
        };
    }, []);

    const [addcart, setaddcart] = useState(
        JSON.parse(localStorage.getItem("ShopProduct")) || []
    );

    const addLocalStorage = (product) => {
        const ShopProduct = JSON.parse(localStorage.getItem("ShopProduct")) || [];
        const productExists = ShopProduct.some(
            (item) => item.id === product.id
        );
        if (productExists) {
            const newProducts = ShopProduct.filter(
                (item) => item.id !== product.id
            );
            localStorage.setItem( "ShopProduct", JSON.stringify(newProducts));
            setaddcart(newProducts);
        } else {
            const newProducts = [
                ...ShopProduct,
                {
                    id: product.id,
                    quantity: 1
                }
            ];
            localStorage.setItem("ShopProduct", JSON.stringify(newProducts));
            setaddcart(newProducts);
        }
    };

    const filteredProducts = products.filter((item) => {
        const categoryMatch = category === "All" || item.category === category;
        const searchMatch = item.title.toLowerCase().includes(search.toLowerCase());
        return categoryMatch && searchMatch;
    });

    
    if (loading) {
        return <p>Loading...</p>;
    }
    if (error) {
        return <p>Error: {error}</p>;
    }

    return(
        <div className="divdivdiv">
        <div className="CartClass">
            {filteredProducts.map((item) =>(
                <div  key={item.id} className={`classCartp ${active === item.id ? "active" : ""}`} onClick={(e) => {e.stopPropagation();
                    setactive(item.id);}} >
                    <img  src={item.thumbnail} alt={item.title} className="imageClass" /> 
                    <h3>{item.title}</h3> 
                    <p>{translations.type}: {item.category}</p>
                    <p>{translations.price}:{item.price}</p>
                    <p>{translations.available} : {item.stock}</p>
                   <Button text={ addcart.some( (cartItem) => cartItem.id === item.id)? `${translations.RemovefromCart}` : `${translations.AddtoCart}` }className="ButtonCart" fun={() => addLocalStorage(item)} />
        
                </div>
            ))}
        </div>
        </div>
    )
}

export default CreatCart;
import React, { useState, useContext } from "react";
import './Product.css';
import { IoMdSearch } from "react-icons/io";
import CreatCart from './CreatCart/CreatCart.js';
import ShowProduct from './ShowProduct/ShowProduct.js';
import Button from '../../Button/Button.js';
import LanguageContext from '../../LanguageContext/LanguageContext.js';

const Product = () => {
    const [search, setsearch] = useState("");
    const [category, setCategory] = useState("All");
    const { translations } = useContext(LanguageContext);
    const categories = [
        { value: "All", label: translations.All },
        { value: "Laptop", label: translations.Laptops },
        { value: "SmartPhone", label: translations.Smartphones },
        { value: "SmartWatch", label: translations.Smartwatch },
        { value: "Headphone", label: translations.headphone },
        { value: "AirPods", label: translations.Earbuds }
    ];
    return (
        <div className="ProductPage">
            <h1>{translations.product}</h1>
            <div className="classgroup">
                <div className="ulcategory">
                    {categories.map((item) => (
                        <Button
                            key={item.value}
                            fun={() => setCategory(item.value)}
                            text={item.label}
                            className={`CategoryButton ${
                                category === item.value ? "active" : ""
                            }`}
                        />
                    ))}
                </div>
                <div className="cljass">
                    <input type="search" value={search} onChange={(e) => setsearch(e.target.value)} placeholder={translations.search}/>
                    <IoMdSearch />
                </div>
            </div>
            <div className="showCart">
                <ShowProduct category={category} search={search} />
            </div>
        </div>
    );
};

export default Product;
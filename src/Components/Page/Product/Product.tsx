import React, { useState, useContext } from "react";
import './Product.css';
import { IoMdSearch } from "react-icons/io";
import ShowProduct from './ShowProduct/ShowProduct';
import Button from '../../Button/Button';
import LanguageContext from '../../LanguageContext/LanguageContext';

type CategoryType = "All" | "beauty" | "furniture" | "fragrances" | "groceries";
export interface CategoryItem {
    value: CategoryType;
    label: string;
}

const Product = () => {
    const [search, setsearch] = useState("");
    const [category, setCategory] = useState<CategoryType>("All");
    const { translations } = useContext(LanguageContext);
    const categories: CategoryItem[] = [
        { value: "All", label: translations.All },
        { value: "beauty", label: translations.beauty },
        { value: "furniture", label: translations.furniture },
        { value: "fragrances", label: translations.fragrances },
        { value: "groceries", label: translations.groceries },
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
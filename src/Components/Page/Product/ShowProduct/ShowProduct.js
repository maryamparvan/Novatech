import react from "react";
import CreatCart from "../CreatCart/CreatCart"
import '../Product.css'

const ShowProduct = (({category,search}) =>{
    
    return(
        <div className="showCart">
            <CreatCart category={category}  search={search}/>
        </div>

    )
})

export default ShowProduct;
import CreatCart from "../CreatCart/CreatCart"
import '../Product.css'

type ShowProductProps = {
    category: string;
    search: string;
};

const ShowProduct = (({category,search}: ShowProductProps) =>{
    
    return(
        <div className="showCart">
            <CreatCart category={category}  search={search}/>
        </div>

    )
})

export default ShowProduct;
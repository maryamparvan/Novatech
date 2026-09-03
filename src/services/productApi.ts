export type Product = {
    id: number;
    title: string;
    price: number;
    description: string;
    category: string;
    thumbnail: string;
    stock: number;
};

const getProducts = async (): Promise<Product[]> => {
    const response = await fetch("https://dummyjson.com/products");
    if (!response.ok) {
        throw new Error("Failed to fetch products");
    }
    const data = await response.json();
    return data.products;
};

export default getProducts;
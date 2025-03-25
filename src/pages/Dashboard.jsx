import { useState, useEffect } from "react";
import API from "../api/api";
import { useNavigate } from "react-router-dom";

const Dashboard = () => {
    const [products, setProducts] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        API.get("/produk")
            .then((res) => setProducts(res.data))
            .catch((err) => console.error(err));
    }, []);

    const deleteProduct = async (id) => {
        try {
            await API.delete(`/produk/${id}`);
            setProducts(products.filter((p) => p.id !== id));
        } catch (error) {
            console.error("Failed to delete product", error);
        }
    };

    return (
        <div>
            <h2>Dashboard Produk</h2>
            <button onClick={() => navigate("/create-product")}>Tambah Produk</button>
            <ul>
                {products.map((product) => (
                    <li key={product.id_barang}>
                        {product.nama} - {product.stok}
                        <button onClick={() => navigate(`/update-product/${product.id_barang}`)}>Edit</button>
                        <button onClick={() => deleteProduct(product.id_barang)}>Hapus</button>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default Dashboard;

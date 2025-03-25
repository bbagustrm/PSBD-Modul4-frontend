import { useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../api/api";

const CreateProduct = () => {
    const navigate = useNavigate();
    const [product, setProduct] = useState({
        nama: "",
        stok: "",
        link_gambar: "",
    });

    const handleChange = (e) => {
        setProduct({ ...product, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await API.post("/produk", product);
            alert("Produk berhasil ditambahkan!");
            navigate("/"); // Redirect ke dashboard
        } catch (error) {
            console.error("Gagal menambah produk", error);
        }
    };

    return (
        <div>
            <h2>Tambah Produk</h2>
            <form onSubmit={handleSubmit}>
                <label>Nama Produk:</label>
                <input type="text" name="nama" value={product.nama} onChange={handleChange} required />

                <label>Stok:</label>
                <input type="number" name="stok" value={product.stok} onChange={handleChange} required />

                <label>Link Gambar:</label>
                <input type="text" name="link_gambar" value={product.link_gambar} onChange={handleChange} />

                <button type="submit">Tambah Produk</button>
            </form>
        </div>
    );
};

export default CreateProduct;

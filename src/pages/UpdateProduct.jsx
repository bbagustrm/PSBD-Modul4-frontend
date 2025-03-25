import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import API from "../api/api";

const UpdateProduct = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [product, setProduct] = useState({
        nama: "",
        stok: "",
        link_gambar: "",
    });

    useEffect(() => {
        API.get(`/produk/${id}`)
            .then((res) => setProduct(res.data))
            .catch((err) => console.error("Gagal mengambil data produk", err));
    }, [id]);

    const handleChange = (e) => {
        setProduct({ ...product, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await API.put(`/produk/${id}`, product);
            alert("Produk berhasil diperbarui!");
            navigate("/"); // Redirect ke dashboard
        } catch (error) {
            console.error("Gagal memperbarui produk", error);
        }
    };

    return (
        <div>
            <h2>Edit Produk</h2>
            <form onSubmit={handleSubmit}>
                <label>Nama Produk:</label>
                <input type="text" name="nama" value={product.nama} onChange={handleChange} required />

                <label>Stok:</label>
                <input type="number" name="stok" value={product.stok} onChange={handleChange} required />

                <label>Link Gambar:</label>
                <input type="text" name="link_gambar" value={product.link_gambar} onChange={handleChange} />

                <button type="submit">Simpan Perubahan</button>
            </form>
        </div>
    );
};

export default UpdateProduct;

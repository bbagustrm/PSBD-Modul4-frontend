import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import API from "../api/api";
import { Card, CardHeader, CardTitle, CardContent } from "../components/ui/card";
import { Input } from "../components/ui/input";
import { Button } from "../components/ui/button";
import { Label } from "../components/ui/label";

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
        <div className="flex justify-center items-center min-h-screen ">
            <Card className="w-full max-w-md p-6 shadow-lg">
                <CardHeader>
                    <CardTitle>Edit Produk</CardTitle>
                </CardHeader>
                <CardContent>
                    <form onSubmit={handleSubmit} className="space-y-4">
                        <Label>Nama Produk:</Label>
                        <Input type="text" name="nama" value={product.nama} onChange={handleChange} required />

                        <Label>Stok:</Label>
                        <Input type="number" name="stok" value={product.stok} onChange={handleChange} required />

                        <Label>Link Gambar:</Label>
                        <Input type="text" name="link_gambar" value={product.link_gambar} onChange={handleChange} />

                        <Button type="submit" className="w-full">Simpan Perubahan</Button>
                    </form>
                </CardContent>
            </Card>
        </div>
    );
};

export default UpdateProduct;

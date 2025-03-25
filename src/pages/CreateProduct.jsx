import { useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../api/api";
import { Card, CardHeader, CardTitle, CardContent } from "../components/ui/card";
import { Input } from "../components/ui/input";
import { Button } from "../components/ui/button";
import { Label } from "../components/ui/label";

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
        <div className="flex justify-center items-center min-h-screen bg-gray-100">
            <Card className="w-full max-w-md p-6 shadow-lg">
                <CardHeader>
                    <CardTitle>Create Produk</CardTitle>
                </CardHeader>
                <CardContent>
                    <form onSubmit={handleSubmit} className="space-y-4">
                        <Label>Nama Produk:</Label>
                        <Input type="text" name="nama" onChange={handleChange} required />

                        <Label>Stok:</Label>
                        <Input type="number" name="stok" onChange={handleChange} required />

                        <Label>Link Gambar:</Label>
                        <Input type="text" name="link_gambar" onChange={handleChange} />

                        <Button type="submit" className="w-full">Simpan Perubahan</Button>
                    </form>
                </CardContent>
            </Card>
        </div>
    );
};

export default CreateProduct;

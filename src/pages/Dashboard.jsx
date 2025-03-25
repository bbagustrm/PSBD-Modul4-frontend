import { useState, useEffect } from "react";
import API from "../api/api";
import { useNavigate } from "react-router-dom";
import { Card, CardHeader, CardTitle, CardContent } from "../components/ui/card";
import { Button } from "../components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "../components/ui/table";
import { Trash2, Edit, PlusCircle, LogOut } from "lucide-react";

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
            alert("Produk berhasil dihapus!");
            navigate("/"); // Redirect ke dashboard
        } catch (error) {
            console.error("Failed to delete product", error);
        }
    };

    const handleLogout = () => {
        localStorage.removeItem("token"); // Hapus token dari localStorage
        navigate("/login"); // Redirect ke halaman login
    };

    return (
        <div className="max-w-5xl mx-auto p-6">
            <Card className="shadow-lg">
                <CardHeader className="space-y-4">
                    <CardTitle className="text-2xl font-bold m-auto">Dashboard Produk</CardTitle>
                    <Button variant="outline" className="w-fit " onClick={() => navigate("/create-product")}>
                        <PlusCircle className="mr-2" size={18} /> Tambah Produk
                    </Button>
                </CardHeader>
                <CardContent>
                    <Table>
                        <TableHeader>
                            <TableRow className="flex justify-between">
                                <TableHead className="flex-1">Gambar</TableHead>
                                <TableHead className="flex-1">Nama</TableHead>
                                <TableHead className="flex-1">Stok</TableHead>
                                <TableHead className="flex-1">Action</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {products.map((product) => (
                                <TableRow key={product.id_barang} className="hover:bg-gray-100 flex justify-between items-center">
                                    <TableCell className="flex-1">
                                        <img src={product.link_gambar} alt={product.nama} className="w-24 h-24 object-cover rounded-md shadow-md" />
                                    </TableCell>
                                    <TableCell className="flex-1">{product.nama}</TableCell>
                                    <TableCell className="flex-1">{product.stok}</TableCell>
                                    <TableCell className="flex flex-1 gap-2">
                                        <Button variant="secondary" onClick={() => navigate(`/update-product/${product.id_barang}`)}>
                                            <Edit className="mr-1" size={16} /> Edit
                                        </Button>
                                        <Button variant="destructive" onClick={() => deleteProduct(product.id_barang)}>
                                            <Trash2 className="mr-1" size={16} /> Hapus
                                        </Button>
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </CardContent>
            </Card>
            <div className="mt-6 flex justify-end">
                <Button variant="outline" onClick={handleLogout}>
                    <LogOut className="mr-2" size={18} /> Logout
                </Button>
            </div>
        </div>
    );
};

export default Dashboard;

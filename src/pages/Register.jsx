import { useState } from "react";
import API from "../api/api";
import { useNavigate } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle } from "../components/ui/card";
import { Input } from "../components/ui/input";
import { Button } from "../components/ui/button";

const Register = () => {
    const [nama, setNama] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await API.post("/auth/register", { nama, email, password });
            navigate("/login");
        } catch (error) {
            console.error("Registration failed", error);
        }
    };

    return (
        <div className="flex justify-center items-center h-screen">
            <Card className="w-96 shadow-lg">
                <CardHeader>
                    <CardTitle className="text-center">Register</CardTitle>
                </CardHeader>
                <CardContent>
                    <form onSubmit={handleSubmit} className="space-y-4">
                        <Input type="nama" placeholder="Nama" onChange={(e) => setNama(e.target.value)} required />
                        <Input type="email" placeholder="Email" onChange={(e) => setEmail(e.target.value)} required />
                        <Input type="password" placeholder="Password" onChange={(e) => setPassword(e.target.value)} required />
                        <Button type="submit" className="w-full">Register</Button>
                    </form>
                </CardContent>
            </Card>
        </div>
    );
};

export default Register;

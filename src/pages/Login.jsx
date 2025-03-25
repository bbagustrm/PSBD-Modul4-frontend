import { useState, useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import API from "../api/api";
import {Card, CardHeader, CardContent, CardTitle} from "../components/ui/card";
import { Input } from "../components/ui/input";
import { Button } from "../components/ui/button";

const Login = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const { login } = useContext(AuthContext);
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await API.post("/auth/login", { email, password });
            login(response.data.token);
            navigate("/dashboard");
        } catch (error) {
            console.error("Login failed", error);
        }
    };

    return (
        <div className="flex items-center justify-center min-h-screen">
            <Card className="w-full max-w-sm">
                <CardHeader>
                    <h2 className="text-lg font-semibold">Login</h2>
                </CardHeader>
                <CardContent>
                    <form onSubmit={handleSubmit} className="space-y-4">
                        <Input type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} required />
                        <Input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} required />
                        <Button type="submit" className="w-full">Login</Button>
                        <hr/>
                        <Button variant="outline" className="w-full" onClick={() => navigate("/register")}>
                            Register
                        </Button>
                    </form>

                </CardContent>
            </Card>
        </div>
    );
};

export default Login;
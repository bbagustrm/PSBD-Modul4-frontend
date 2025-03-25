import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "./context/AuthContext";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";
import UpdateProduct from "./pages/UpdateProduct";
import Navbar from "./components/Navbar";
import CreateProduct from "./pages/CreateProduct.jsx";

const App = () => {
    const { user } = useContext(AuthContext);

    return (
        <Router>
            <Navbar />
            <Routes>
                <Route path="/" element={user ? <Navigate to="/dashboard" /> : <Login />} />
                <Route path="/login" element={user ? <Navigate to="/dashboard" /> : <Login />} />
                <Route path="/register" element={user ? <Navigate to="/dashboard" /> : <Register />} />
                <Route path="/dashboard" element={user ? <Dashboard /> : <Navigate to="/login" />} />
                <Route path="/create-product/:id?" element={user ? <CreateProduct /> : <Navigate to="/login" />} />
                <Route path="/update-product/:id?" element={user ? <UpdateProduct /> : <Navigate to="/login" />} />
            </Routes>
        </Router>
    );
};

export default App;

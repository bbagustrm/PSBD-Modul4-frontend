import axios from "axios";

// Buat instance axios
const API = axios.create({
    baseURL: "http://localhost:5000",
});

// Tambahkan token ke setiap permintaan jika tersedia
API.interceptors.request.use((config) => {
    const token = localStorage.getItem("token");
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
});

export default API;

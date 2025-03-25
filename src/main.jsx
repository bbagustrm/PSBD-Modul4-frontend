import './index.css';
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import { AuthProvider } from "./context/AuthContext"; // Pastikan ini benar

createRoot(document.getElementById('root')).render(
  <StrictMode>
      <AuthProvider> {/* Harus membungkus App */}
          <App />
      </AuthProvider>
  </StrictMode>,
)

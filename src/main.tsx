import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.tsx";
import { BrowserRouter, Routes, Route } from "react-router";
import Register from "./components/loginRegistration_work/Registration/Register.tsx";
import Login from "./components/loginRegistration_work/Login.tsx";
import AllProduct from "./components/AllProduct/ALLPRO/AllProduct.tsx";
import AuthProvider from "./components/loginRegistration_work/AuthProvider/AuthProvider.tsx";
import { ToastContainer } from "react-toastify";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <BrowserRouter>
      <AuthProvider>
         <ToastContainer></ToastContainer>
        <Routes>
          <Route index element={<App />} />
          <Route path="register" element={<Register />} />
          <Route path="login" element={<Login />} />
          <Route path="allproduct" element={<AllProduct />} />
        </Routes>
      </AuthProvider>
    </BrowserRouter>
  </StrictMode>
);

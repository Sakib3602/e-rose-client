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
import DashOut from "./components/DashBord/DashOut.tsx";
import AdminProduct from "./components/DashBord/AllProductAdmin/AdminProduct.tsx";
import Orders from "./components/DashBord/Orders/Orders.tsx";
import DashHome from "./components/DashBord/DashHome/DashHome.tsx";
import AddItem from "./components/DashBord/AddItem/AddItem.tsx";
import SingleDetails from "./components/AllProduct/SingleDetail/SingleDetails.tsx";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <BrowserRouter>
      <AuthProvider>
        <ToastContainer></ToastContainer>
        <Routes>
          <Route index element={<App />} />
          <Route path="register" element={<Register />} />
          <Route path="login" element={<Login />} />
          <Route path="details" element={<SingleDetails />} />
          <Route path="allproduct" element={<AllProduct />} />

          {/* dashbord */}
          <Route path="dashbord" element={<DashOut />}>
            <Route index element={<DashHome></DashHome>} />
            <Route path="allpro" element={<AdminProduct />} />
            <Route path="addItem" element={<AddItem />} />
            <Route path="order" element={<Orders />} />
          </Route>

          {/* dashbord  end*/}
        </Routes>
      </AuthProvider>
    </BrowserRouter>
  </StrictMode>
);

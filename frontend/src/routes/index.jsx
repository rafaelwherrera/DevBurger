import { Route, Routes } from "react-router-dom";
import { UserLayout } from "../layouts/UserLayout";
import {
    Cart,
    Home,
    Login,
    Menu,
    Register,
    CompletePayment,
    Checkout,
    Orders,
    NewProducts,
    EditProducts,
    Products,
    NewCategory,
    EditCategory,
    Category,
} from "../containers";
import AdminLayout from '../layouts/AdminLayout';
import React from 'react';

export function Router() {
    return (

        <Routes>
            <Route path="/" element={<UserLayout />} >
                <Route path="/" element={<Home />} />
                <Route path="/cardapio" element={<Menu />} />
                <Route path="/carrinho" element={<Cart />} />
                <Route path="/checkout" element={<Checkout />} />
                <Route path="/complete" element={<CompletePayment />} />
            </Route>


            <Route path="/admin" element={<AdminLayout />}>
                <Route index element={<Orders />} /> {/* Essa é a rota que será carregada ao acessar /admin */}
                <Route path="pedidos" element={<Orders />} />
                <Route path="novo-produto" element={<NewProducts />} />
                <Route path="editar-produto" element={<EditProducts />} />
                <Route path="produtos" element={<Products />} />
                <Route path="nova-categoria" element={<NewCategory />} />
                <Route path="editar-categoria" element={<EditCategory />} />
                <Route path="categorias" element={<Category />} />
            </Route>

            <Route path="/login" element={<Login />} />
            <Route path="/cadastro" element={<Register />} />

        </Routes>
    );
}

export default Router;
import { Outlet } from "react-router-dom";
import { Footer, Header } from '../../components'
import React from "react";

export function UserLayout() {

    return (
        <>
            <Header />
            <Outlet />
            <Footer />
        </>
    );  
}
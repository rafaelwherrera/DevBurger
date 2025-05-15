import React, { useState } from 'react';
import { Outlet } from "react-router-dom";
import { SideNavAdmin } from '../../components/SideNavAdmin';
import { Toolbar, Box } from "@mui/material";
import { CssBaseline } from '@mui/material';


function AdminLayout() {
    const [isCollapsed, setIsCollapsed] = useState(false);
    return (
        <Box sx={{ display: 'flex' }}>
            <CssBaseline />

            <SideNavAdmin 
                isCollapsed={isCollapsed} 
                setIsCollapsed={setIsCollapsed} 
            />

            <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
                <Toolbar />
                <Outlet />
            </Box>
        </Box>
    );
}

export default AdminLayout;

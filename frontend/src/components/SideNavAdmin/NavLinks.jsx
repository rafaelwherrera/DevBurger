import { Receipt, List, ListPlus, Stack, StackPlus, User } from "@phosphor-icons/react"
import React from 'react';
import './styles'

export const navLinks = [
    
    {
        id: 1,
        label: 'Dashboard',
        path: '/admin',
        icon: <Receipt />
    },
    {
        id: 2,
        label: 'Pedidos',
        path: '/admin/pedidos',
        icon: <Receipt />
    },
    {
        id: 3,
        label: 'Produtos',
        path: '/admin/produtos',
        icon: <List />
    },
    {
        id: 4,
        label: 'Adicionar Produtos',
        path: '/admin/novo-produto',
        icon: <ListPlus />
    },

    {
        id: 5,
        label: 'Categorias',
        path: '/admin/categorias',
        icon: <Stack />
    },
    {
        id: 6,
        label: 'Adicionar Categorias',
        path: '/admin/nova-categoria',
        icon: <StackPlus />
    },
    {
        id: 7,
        label: 'Clientes',
        path: '/admin/clientes',
        icon: <User />
    },
]
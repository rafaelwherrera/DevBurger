import { Receipt, List, ListPlus, Stack, StackPlus, User } from "@phosphor-icons/react"
import React from 'react';
import './styles'

export const navLinks = [
    

    {
        id: 1,
        label: 'Pedidos',
        path: '/admin/pedidos',
        icon: <Receipt />
    },
    {
        id: 2,
        label: 'Produtos',
        path: '/admin/produtos',
        icon: <List />
    },
    {
        id: 3,
        label: 'Adicionar Produtos',
        path: '/admin/novo-produto',
        icon: <ListPlus />
    },

    {
        id: 4,
        label: 'Categorias',
        path: '/admin/categorias',
        icon: <Stack />
    },
    {
        id: 5,
        label: 'Adicionar Categorias',
        path: '/admin/nova-categoria',
        icon: <StackPlus />
    },

]
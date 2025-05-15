
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { Row } from './row';
import { useEffect } from 'react';
import { api } from '../../../services/api'
import { useState } from 'react';
import { FilterOption, Filter, Container } from './styles'
import { orderStatusOptions } from './orderStatus';
import React from 'react';


export function Orders() {
    const [orders, setOrders] = useState([]);
    const [filteredOrders, setfilteredOrders] = useState([]);
    const [activeStatus, setActiveStatus] = useState(0);
    const [rows, setRows] = useState([]);

    useEffect(() => {
        async function loadOrders() {
            const { data } = await api.get('order');
            setOrders(data);
            setfilteredOrders(data);
        }
        loadOrders()
    }, []);


    function createData(order) {
        const total = order.products.reduce((acc, product) => {
            return acc + (product.price * product.quantity);
        }, 0);
    
        return {
            name: order.user.name,
            orderId: order._id,
            date: order.createdAt,
            status: order.status,
            products: order.products,
            total: total.toFixed(2)
        };
    }
    useEffect(() => {
            const newRows = filteredOrders.map(order => createData(order));
            setRows(newRows);
        }, [filteredOrders]);

        function handleStatus(status) {
            if (status.id === 0) {
                setfilteredOrders(orders);
            } else {
                const newOrders = orders.filter((order) => order.status === status.value);
                setfilteredOrders(newOrders);
            }
            setActiveStatus(status.id);
        }

        useEffect(() => {
            if (activeStatus === 0) {
                setfilteredOrders(orders);
            } else {
                const statusIndex = orderStatusOptions.findIndex(
                    (item) => item.id === activeStatus,);
                const newFilteredOrders = orders.filter(
                    order => order.status === orderStatusOptions[statusIndex].value);
                setfilteredOrders(newFilteredOrders);
            }
        }, [orders])

        return (

            <Container>

                <Filter>
                    {orderStatusOptions.map(status => (
                        <FilterOption
                            key={status.id}
                            onClick={() => handleStatus(status)}
                            $isActiveStatus={activeStatus === status.id}
                        >
                            {status.label}</FilterOption>
                    ))}
                </Filter>

                <TableContainer component={Paper}>
                    <Table aria-label="collapsible table">
                        <TableHead >
                            <TableRow>
                                <TableCell />
                                <TableCell align="center">Pedidos</TableCell>
                                <TableCell align="center">Cliente</TableCell>
                                <TableCell align="center">Data do Pedido</TableCell>
                                <TableCell align="center">Status</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {rows.map((row) => (
                                <Row
                                    key={row.orderId}
                                    row={row}
                                    orders={orders}
                                    setOrders={setOrders}
                                />
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>

            </Container>
        );
    }
import { useEffect, useState } from "react";
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { Pencil } from "@phosphor-icons/react";
import { api } from '../../../services/api';
import { Container, EditButton, ProductImage } from './styles';
import { useNavigate } from "react-router-dom";

export function Category() {
    const [categories, setCategories] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        async function loadCategories() {
            const { data } = await api.get('/categories');
            setCategories(data);
        }
        loadCategories();
    }, []);

    function editCategory(category) {
        navigate('/admin/editar-categoria', { state: { category } });
    }

    return (
        <Container>
            <h2>Categorias</h2>
            <TableContainer component={Paper}>
                <Table sx={{ minWidth: 650 }} aria-label="categories table">
                    <TableHead>
                        <TableRow>
                            <TableCell>Nome</TableCell>
                            <TableCell align="center">Descrição</TableCell>
                            <TableCell align="center">Imagem</TableCell>
                            <TableCell align="center">Editar</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {categories.map((category) => (
                            <TableRow key={category.id}>
                                <TableCell component="th" scope="row"> {category.name} </TableCell>
                                <TableCell align="center"> {category.description || '---'}
                                </TableCell>
                                <TableCell align="center">
                                    <ProductImage src={category.url} />
                                </TableCell>
                                <TableCell align="center">
                                    <EditButton onClick={() => editCategory(category)}>
                                        <Pencil />
                                    </EditButton>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </Container>
    );
}

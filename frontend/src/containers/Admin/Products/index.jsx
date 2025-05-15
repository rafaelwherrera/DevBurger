import { useEffect, useState } from "react"
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { Pencil, CheckCircle, XCircle } from "@phosphor-icons/react";
import { api } from '../../../services/api'
import { Container, ProductImage, EditButton, FilterContainer } from './styles';
import { formatPrice } from '../../../utils/formatPrice';
import { useNavigate } from "react-router-dom";

export function Products() {

    const [products, setProducts] = useState([]);
    const [filteredProducts, setFilteredProducts] = useState([]);
    const [categories, setCategories] = useState([]);
    const [selectedCategory, setSelectedCategory] = useState("todas");
    const navigate = useNavigate();

    useEffect(() => {
        async function loadProducts() {
            const { data } = await api.get('/products');
            setProducts(data);
            setFilteredProducts(data);

            const uniqueCategories = [
                ...new Map(data.map(p => [p.category.id, p.category])).values()
            ];
            setCategories(uniqueCategories);
        }
        loadProducts();
    }, []);

    useEffect(() => {
        if (selectedCategory === "todas") {
            setFilteredProducts(products);
        } else {
            setFilteredProducts(products.filter(p => String(p.category.id) === selectedCategory));
        }
    }, [selectedCategory, products]);

    function isOffer(offer) {
        if (offer) {
            return <CheckCircle color="#61a120" size='20px' />
        } else {
            return <XCircle color="#ff3205" size='20px' />
        }
    }

    function editProduct(product) {
        navigate('/admin/editar-produto', { state: { product } });
    }

    return (

        <Container>
            <h2>Produtos</h2>

            <FilterContainer>
                <label htmlFor="categoryFilter">Filtrar por Categoria:</label>
                <select
                    id="categoryFilter"
                    value={selectedCategory}
                    onChange={(e) => setSelectedCategory(e.target.value)}
                >
                    <option value="todas">Todas</option>
                    {categories.map((cat) => (
                        <option key={cat.id} value={cat.id}>
                            {cat.name}
                        </option>
                    ))}
                </select>
            </FilterContainer>


            <TableContainer component={Paper}>
                <Table sx={{ minWidth: 650 }} aria-label="simple table">
                    <TableHead>
                        <TableRow>
                            <TableCell>Nome</TableCell>
                            <TableCell align="center">Preço</TableCell>
                            <TableCell align="center">Produto em Oferta</TableCell>
                            <TableCell align="center">Imagem</TableCell>
                            <TableCell align="center">Editar</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {filteredProducts.map((product) => (
                            <TableRow key={product.id}>
                                <TableCell component="th" scope="row">
                                    {product.name}
                                </TableCell>
                                <TableCell align="center">{formatPrice(product.price)}</TableCell>
                                <TableCell align="center">{isOffer(product.offer)}</TableCell>
                                <TableCell align="center">
                                    <ProductImage src={product.url} />
                                </TableCell>
                                <TableCell align="center">
                                    <EditButton onClick={() => editProduct(product)}>
                                        <Pencil />
                                    </EditButton>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </Container>
    )
}
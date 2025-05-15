import React, { useState, useEffect } from 'react';
import { api } from '../../services/api';
import { formatPrice } from '../../utils/formatPrice';
import { CardProduct } from '../../components/CardProduct';
import { useLocation } from 'react-router-dom';
import { Container, Banner, CategoryMenu, ProductsContainer, CategoryButton } from './styles';

export function Menu() {
  const [categories, setCategories] = useState([]);
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [activeCategory, setActiveCategory] = useState(0); 
  const location = useLocation(); 
  useEffect(() => {
    async function loadCategories() {
      const response = await api.get('/categories');
      const newCategories = [{ id: 0, name: 'Todas' }, ...response.data];
      setCategories(newCategories);
    }

    async function loadProducts() {
      const { data } = await api.get('/products');
      const newProducts = data.map((product) => ({
        currencyValue: formatPrice(product.price),
        ...product,
      }));
      setProducts(newProducts);
    }

    loadCategories();
    loadProducts();
  }, []);

  useEffect(() => {
    const queryParams = new URLSearchParams(location.search);
    const categoryIdFromUrl = parseInt(queryParams.get('categoria'));

    if (categoryIdFromUrl) {
      setActiveCategory(categoryIdFromUrl);
    } else {
      setActiveCategory(0); 
    }
  }, [location.search]);

  useEffect(() => {
    if (activeCategory === 0) {
      setFilteredProducts(products); 
    } else {
      const filtered = products.filter(
        (product) => product.category_id === activeCategory
      );
      setFilteredProducts(filtered); 
    }
  }, [activeCategory, products]);

  const handleCategoryClick = (categoryId) => {
    setActiveCategory(categoryId);
  };

  return (
    <main>
      <Container>
        <Banner>
          <h1>
            O MELHOR <br />
            HAMBURGER <br />
            ESTÁ AQUI! <br />
            <span>Esse cardápio está irresistível!!</span>
          </h1>
        </Banner>

        <CategoryMenu>
          {categories.map((category) => (
            <CategoryButton
              key={category.id}
              $isActiveCategory={category.id === activeCategory}
              onClick={() => handleCategoryClick(category.id)} 
            >
              {category.name}
            </CategoryButton>
          ))}
        </CategoryMenu>

        <ProductsContainer>
          {filteredProducts.map((product) => (
            <CardProduct product={product} key={product.id} />
          ))}
        </ProductsContainer>
      </Container>
    </main>
  );
}

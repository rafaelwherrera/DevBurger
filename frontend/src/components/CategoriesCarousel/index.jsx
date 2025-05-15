import { useState, useEffect } from 'react';
import { api } from "../../services/api";
import Carousel from 'react-multi-carousel';
import 'react-multi-carousel/lib/styles.css';
import { useNavigate } from 'react-router-dom';
import { Container, ContainerItems, Title, CategoryButton } from './styles';
import React from 'react';

export function CategoriesCarousel() {
  const [categories, setCategories] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    async function loadCategories() {
      const response = await api.get('/categories');
      setCategories(response.data);
    }
    loadCategories();
  }, []);

  const responsive = {
    superLargeDesktop: {
      breakpoint: { max: 4000, min: 1280 },
      items: 4,
    },
    desktop: {
      breakpoint: { max: 1280, min: 1024 },
      items: 4,
      slidesToSlide: 1,
    },
    tablet: {
      breakpoint: { max: 1024, min: 768 },
      items: 3,
      slidesToSlide: 1,
    },
    mobile: {
      breakpoint: { max: 768, min: 0 },
      items: 2,
      slidesToSlide: 1,
    },
  };

  return (
    <Container>
      <Title>Categorias</Title>

      {categories.length > 0 ? (
        <Carousel
          responsive={responsive}
          infinite
          partialVisible={false}
          itemClass='carousel-item'
        >
          {categories.map((category) => (
            <ContainerItems
              key={category.id}
              aria-label={`Categoria ${category.name}`}
              $imageUrl={category.url}
            >
              <CategoryButton
                onClick={() => {
                  console.log(`Clicou na categoria ${category.name} com ID: ${category.id}`);
                  window.location.href = `/cardapio?categoria=${category.id}`;
                }}
              >
                {category.name}
              </CategoryButton>
            </ContainerItems>
          ))}
        </Carousel>
      ) : (
        <p>Carregando categorias...</p>
      )}
    </Container>
  );
}
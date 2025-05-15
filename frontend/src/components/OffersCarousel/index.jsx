import { useState, useEffect } from 'react';
import { api } from "../../services/api";
import Carousel from 'react-multi-carousel';
import 'react-multi-carousel/lib/styles.css';
import { Container, Title } from './styles';
import { CardProduct } from '../CardProduct';
import { formatPrice } from '../../utils/formatPrice'
import React from 'react';

export function OffersCarousel() {
  const [offers, setOffers] = useState([]);

  useEffect(() => {
    async function loadProducts() {
      const response = await api.get('/products');
      const onlyOffers = response.data
      .filter(product =>
        product.offer)
      .map(product =>({
        currencyValue: formatPrice(product.price),
        ...product,
      }));
      setOffers(onlyOffers);
    }
    loadProducts();
  }, []);

  const responsive = {
    superLargeDesktop: {
      breakpoint: { max: 4000, min: 1280 },
      items: 4,
    },
    desktop: {
      breakpoint: { max: 1280, min: 1024 },
      items: 4,
      slidesToSlide: 1
    },
    tablet: {
      breakpoint: { max: 1024, min: 768 },
      items: 3,
      slidesToSlide: 1 
    },
    mobile: {
      breakpoint: { max: 768, min: 0 },
      items: 2,
      slidesToSlide: 1 
    },
  };

  return (
    <Container>
      <Title>Ofertas do Dia</Title>

      {offers.length > 0 ? (
        <Carousel
          responsive={responsive}
          infinite
          partialVisible={false}
          itemClass='carousel-item'
        >
          {offers.map((product) => (
            <CardProduct
              key={product.id}
              product={product}
            />
          ))}
        </Carousel>
      ) : (
        <p>Carregando ofertas...</p>
      )}
    </Container>
  );

}

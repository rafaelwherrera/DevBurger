import Cart from '../../assets/cart.svg'
import { ContainerButton } from './styles'
import React from 'react';

export function CartButton({...props}) {
    return (
        <ContainerButton {...props}>
            <img src={Cart} alt='carrinho-de-compras' />
        </ContainerButton>
    );
}
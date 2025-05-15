import Logo from "../../assets/logo.svg" 
import {CartItems, CartResume} from "../../components"
import {
    Container,
    Banner,
    Title,
    Content,
} from './styles';
import React from "react";

export function Cart (){

    return(
        <Container>
            <Banner>
                <img src={Logo} alt="logo" />
            </Banner>
            <Title>Pedido</Title>
            <Content>
                <CartItems />
                <CartResume />
            </Content>
        </Container>
    );
}
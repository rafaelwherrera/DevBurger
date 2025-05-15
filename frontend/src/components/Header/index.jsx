import { UserCircle, ShoppingCart } from "@phosphor-icons/react";
import { useNavigate, useResolvedPath } from "react-router-dom";
import { useUser } from "../../hooks/UserContext";
import React from "react";
import { useCart } from "../../hooks/CartContext"; 
import {
    Container,
    Navigation,
    HeaderLink,
    Options,
    Profile,
    Logout,
    LinkContainer,
    Content,
    CartBadge,
} from './styles';


export function Header() {
    const navigate = useNavigate();
    const { logout, userInfo } = useUser();
    const { pathname } = useResolvedPath();
    const { cartProducts } = useCart();
    const cartItemsCount = cartProducts?.length || 0;
    function logoutUser() {
        logout();
        navigate('/login');
    }

    return (
        <Container>
            <Content>
                <Navigation>
                    <div>
                        <HeaderLink to="/" $isActive={pathname === '/'}> Home </HeaderLink>
                        <hr />
                        <HeaderLink to="/cardapio" $isActive={pathname === '/cardapio'}> Cardápio </HeaderLink>
                    </div>
                </Navigation>
                <Options>
                    <Profile>
                        <UserCircle color='#f7a53d' size={24} />
                        <div>
                            <p>Olá, <span>{userInfo?.name}</span></p>
                            <Logout onClick={logoutUser}>Sair</Logout>
                        </div>
                    </Profile>
                    <LinkContainer>
                        <ShoppingCart color='#f7a53d' size={24} />
                        {cartItemsCount > 0 && (
                            <CartBadge>{cartItemsCount}</CartBadge>
                        )}
                        <HeaderLink to="/carrinho">Carrinho</HeaderLink>
                    </LinkContainer>
                </Options>
            </Content>
        </Container>
    );
}
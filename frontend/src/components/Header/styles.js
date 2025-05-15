import styled from "styled-components";
import { Link } from "react-router-dom";

export const Container = styled.div`
    background-color: #1f1f1f;
    width: 100%;
    height: 72px;
    padding: 0 56px;
`;

export const Content = styled.div`
    display: flex;
    align-items: center;
    justify-content: space-between;
    width: 100%;
    max-width: 1280px;
    margin: 0 auto;
`;

export const Navigation = styled.nav`
    display: flex;
    align-items: center;
    justify-content: center;
    height: 72px;

    div {
        display: flex;
        justify-content: center;
        align-items: center;
        gap: 20px;
    }

    hr {
        height: 24px;
        border: 1px solid #f7a53d;
    }
`;

export const HeaderLink = styled(Link)`
    color: ${(props) => (props.$isActive ? '#f7a53d' : '#ffff')};
    border-bottom: ${ (props) => (props.$isActive ? '1px solid #f7a53d' : 'none')} ;
    padding-bottom: 5px;
    text-decoration: none;
    font-size: 14px;
    transition: color 200ms;
    cursor: pointer;

    &:hover{
        color: #f7a53d;
    }
`;

export const Options = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 48px;
`;

export const Profile = styled.div`
    display: flex;
    align-items: center;
    gap: 12px;
    font-size: 14px;

    p{
        color: white;
        line-height: 90%;
        font-weight: 300;

        span {
            font-weight: 700;
            color: #f50a06;
        }
    }
`;

export const LinkContainer = styled.div`
    display: flex;
    align-items: center;
    gap: 10px;
`;

export const Logout = styled.button`
    color: #f7a53d;
    text-decoration: none;
    font-weight: 700;
    background-color: transparent;
    border: none;
    cursor: pointer;
`;

export const CartBadge = styled.span`
    background-color: #f7a53d;
    color: #fff;
    font-size: 15px;
    width: 25px;
    height: 25px;
    font-weight: bold;
    border-radius: 50%;
    padding: 2px 5px;
    display: flex; /* Ativa o flexbox */
    align-items: center; /* Alinha verticalmente ao centro */
    justify-content: center; /* Alinha horizontalmente ao centro */
`;
import styled from "styled-components";
import BannerHamburguer from '../../assets/bannermenu.svg'
import Background from '../../assets/fundo.svg'
import { Link as ReactLink } from "react-router-dom";

export const Link = styled(ReactLink)`
  text-decoration: none;
  color:  #f7a53d;
`;

export const Container = styled.div`
    width: 100%;
    min-height: 100vh;
    background-color: #f0f0f0;
    background: url('${Background}');
`;

export const Banner = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    height: 480px;
    width: 100%;
    position: relative;
    background: url('${BannerHamburguer}') no-repeat;
    background-color: #1f1f1f;
    background-position: center;
    background-size: cover;

    h1 {
        font-family: 'burguer', sans-serif;
        font-size: 80px;
        line-height: 65px;
        position: absolute;
        color: #f7a53d;
        right: 20%;
        top: 30%;
    }
    span {
        display: block;
        color: #fff;
        font-size: 20px;
    }
`;

export const CategoryMenu = styled.div`
    display: flex;
    justify-content: center;
    gap: 50px;
    margin-top: 30px;
`;

export const CategoryButton = styled(ReactLink)`
    text-decoration: none;
    cursor: pointer;
    background: none;
    color: ${(props) => props.$isActiveCategory ? '#f7a53d' : '#696969'};
    font-size: 18px;
    font-weight: 500;
    padding-bottom: 5px;
    line-height: 20px;
    border: none;
    border-bottom: ${(props) => props.$isActiveCategory && '3px solid'};
`;

export const ProductsContainer = styled.div`
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    padding: 40px;
    justify-content: center;
    max-width: 1280px;
    gap: 60px;
    margin: 50px auto;
`;
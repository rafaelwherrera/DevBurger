import styled from "styled-components";
import { Link as ReactLink } from "react-router-dom";
import BannerHome from "../../assets/BannerHome.svg"
import Background from '../../assets/fundo.svg'


export const Link = styled(ReactLink)`
  text-decoration: none;
  color:  #f7a53d;
`;

export const Banner = styled.div`
    background: url('${BannerHome}');
    background-size: cover;
    background-position: center;
    height: 450px;

    h1{
        font-family: 'burguer', sans-serif;
        font-size: 80px;
        color: #f7a53d;
        position: absolute;
        right: 20%;
        top: 10%;
    }
`;

export const Container = styled.section`
    background: url('${Background}');
`;
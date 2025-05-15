import styled from 'styled-components';
import { Link } from 'react-router-dom';

export const Container = styled.div`
    .carousel-item {
        padding-right: 40px;
        padding-left: 40px;
        cursor: grab;
    }
    .react-multiple-carousel__arrow--left {
    left: 15px;
    top: 10px;
    }

    .react-multiple-carousel__arrow--right {
        top: 10px;
        right: 15px;
    }
`;

export const Title = styled.h2`
    font-size: 32px;
    font-weight: 800;
    color: #780c08;
    padding-bottom: 12px;
    position: relative;
    text-align: center;
    margin-top: 20px;
    margin-bottom: 40px;

    &::after{
        content: '';
        position: absolute;
        bottom: 0;
        width: 56px;
        height: 4px;
        background-color: #780c08;
        left: calc(50% - 28px);
    }
`;

export const Carousel = styled.div`

`;

export const ContainerItems = styled.div`
    background: url(${props => props.$imageUrl});
    background-position: center;
    background-size: cover;
    display: flex;
    align-items: center;
    padding-left: 5px;
    width: 110%;
    height: 190px;
    border-radius: 20px;
`;

export const CategoryButton = styled(Link)`
        color: white;
        background-color: rgba(0,0,0, 0.5);
        padding: 10px 30px;
        border-radius: 30px;
        font-size: 18.5px;
        font-weight: 500;
        margin-top: 50px;
        text-decoration: none;

        &:hover{
            background-color: #780c08;
        }
`;

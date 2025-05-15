import styled from "styled-components";
import background from '../../assets/teste.png'
import wallpaper from '../../assets/fundo.svg'

export const Container = styled.div`
    width: 100%;
    background-color: #f0f0f0;
    background: url('${wallpaper}');
    min-height: 100vh;
`;
export const Banner = styled.div`
    background: url('${background}');
    background-color: #1f1f1f;
    background-size: auto;
    display: flex;
    align-items: center;
    justify-content: center;
    position: relative;
    height: 193px;

    img {
        height: 170px;
    }
`;
export const Title = styled.div`
    font-size: 32px;
    font-weight: 800;
    padding-bottom: 12px;
    color: #780c08;
    text-align: center;
    position: relative;

    &::after {
        position: absolute;
        left: calc(50%  -  28px);
        bottom: 0;
        content: '';
        width: 56px;
        height: 4px;
        background-color: #780c08;
    }
`;
export const Content = styled.div`
    display: grid;
    grid-template-columns: 1fr 28%;
    gap: 40px;
    width: 100%;
    max-width: 1280px;
    padding: 40px;
    margin: 0 auto;
`;  
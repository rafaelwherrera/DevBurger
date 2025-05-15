import styled from "styled-components";
import Bg1 from '../../assets/Bg1.svg';
import background from '../../assets/teste.png';
import { Link as ReactLink } from "react-router-dom";

export const Container = styled.div`
    display: flex;
    height: 100vh;
    width: 100vw;
    position: relative;
    background-color: #212121;
    background-size: auto;
    background-position: center;

    &::before {
  content: '';
  position: absolute;
  inset: 0;
  background: url(${background});
  background-size: cover;
  background-position: center;
  opacity: 0.2;
  z-index: 0; /* Adicionado */
}
`;

export const LeftContainer = styled.div`
    height: 100%;
    width: 100%;
    max-width: 50%;

    display: flex;
    align-items: center;
    justify-content: center;
    z-index: 2;

    img {
        width: 60%;
    }
`;

export const RightContainer = styled.div`
  height: 100%;
  width: 100%;
  max-width: 50%;

  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;

  p {
    color: #f7a53d;
    font-size: 18px;
    font-weight: 800;
    z-index: 2;

    a {
      text-decoration: underline;
      cursor: pointer;

      &:hover {
        color: #780c08;
      }
    }
  }
`;


export const Title = styled.h2`
    font-family: 'burguer', sans-serif;
    font-size: 34px;
    letter-spacing: 3px;
    color: white;
    text-align: center;
    z-index: 2;
    
    span {
        color: #f7a53d;
        font-family: 'burguer', sans-serif;
    }
`;

export const Form = styled.form`
    display: flex;
    flex-direction: column;
    gap: 20px;
    padding: 20px;
    width: 100%;
    max-width: 400px;
    z-index: 2;
`;

export const InputContainer = styled.div`
    display: flex;
    flex-direction: column;
    gap: 5px;
    width: 100%;

    input {
    width: 100%;
    border: none;
    height: 52px;
    border-radius: 5px;
    padding: 0 16px;
    };

    p{
      font-size: 12px;
      line-height: 100%;
      font-weight: 600;
      height: 10px;
    }

    label {
        font-size: 18px;
        font-weight: 600;
        color: white; 
    }
    z-index: 2;
`;

export const Link = styled(ReactLink)`
  text-decoration: none;
  color:  #f7a53d;
`;
import styled from "styled-components";
import background from '../../assets/teste.png';

export const Container = styled.div`
  display: flex;
  width: 100vw;
  position: relative;
  background-color: #212121;
  background-size: cover; /* Troque de auto para cover */
  background-position: center;
  background-attachment: fixed; /* Adicione essa linha */

  &::before {
    content: '';
    position: absolute;
    inset: 0;
    background: url(${background});
    background-size: cover;
    background-position: center;
    background-attachment: fixed; /* Isso evita o movimento */
    opacity: 0.2;
    z-index: 0;
  }
`;


export const Card = styled.div`
  margin: 0 auto;
  background: white;
  padding: 3rem 2rem;
  border-radius: 1rem;
  max-width: 500px;
  width: 100%;
  box-shadow: 0 10px 25px rgba(0, 0, 0, 0.1);
  z-index: 1;
`;

export const Title = styled.h2`
  font-size: 1.8rem;
  font-weight: bold;
  text-align: center;
  margin-bottom: 2rem;
  color: #780c08;
`;

export const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

export const InputGroup = styled.div`
  display: flex;
  flex-direction: column;
`;

export const Label = styled.label`
  font-weight: 500;
  margin-bottom: 0.3rem;
`;

export const Input = styled.input`
  padding: 0.8rem;
  border: 1px solid #d1d5db;
  border-radius: 0.5rem;
  font-size: 1rem;
  transition: border 0.2s ease;

  &:focus {
    border-color: #2563eb;
    outline: none;
  }
`;

export const Error = styled.span`
  font-size: 0.875rem;
  color: #dc2626;
  margin-top: 0.25rem;
`;

export const SubmitButton = styled.button`
  margin-top: 1rem;
  background-color: #2563eb;
  color: white;
  font-size: 1rem;
  font-weight: 600;
  padding: 0.9rem;
  border: none;
  border-radius: 0.5rem;
  cursor: pointer;
  transition: background 0.2s ease;

  &:hover {
    background-color: #1e40af;
  }
`;

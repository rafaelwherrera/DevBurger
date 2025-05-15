import styled from "styled-components";
import { Button } from "../../../components";

export const Wrapper = styled.div`
  margin-left: ${(props) => (props.$collapsed ? '80px' : '250px')};
  transition: margin-left 0.3s ease;
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;
  overflow-y: auto;
`;

export const Container = styled.div`
  max-width: 480px;
  width: 100%;
  padding: 32px 24px;
  background-color: #1f1f2e;
  border-radius: 16px;
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.2);
  color: #ffffff;

  h2 {
    text-align: center;
    margin-bottom: 24px;
    font-size: 22px;
    color: #f1f1f1;
  }
`;

export const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 20px;
`;

export const InputGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: 6px;
`;

export const Label = styled.label`
  font-weight: 500;
  font-size: 14px;
  color: #f1f1f1;
`;

export const Input = styled.input`
  padding: 12px;
  background-color: #2a2a3d;
  color: #fff;
  border: 1px solid #444;
  border-radius: 8px;
  font-size: 15px;
  transition: box-shadow 0.2s ease;

  &:focus {
    outline: none;
    border-color: #4c9aff;
    box-shadow: 0 0 0 2px rgba(76, 154, 255, 0.3);
  }

  &::placeholder {
    color: #ccc;
  }
`;

export const SubmitButton = styled(Button)`
  margin-top: 12px;

`;

export const ErrorMessage = styled.span`
  color: #ffcc00;
  font-size: 13px;
  font-weight: 600;
  margin-top: 2px;
`;

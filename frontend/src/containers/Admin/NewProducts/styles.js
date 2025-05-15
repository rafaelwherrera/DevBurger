import styled from "styled-components";
import ReactSelect from "react-select";
import { Button } from "../../../components";

export const Container = styled.div`
  margin-left: ${(props) => (props.$collapsed ? '80px' : '250px')};
  transition: margin-left 0.3s ease;
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;
  overflow-y: auto;
`;

export const Form = styled.form`
  background-color: #1f1f2e;
  border-radius: 16px;
  padding: 32px 24px;
  width: 100%;
  max-width: 400px;
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.3);
  display: flex;
  flex-direction: column;
  gap: 16px;
`;

export const InputGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: 6px;
`;

export const Label = styled.label`
  color: #f1f1f1;
  font-size: 14px;
  font-weight: 500;
`;

export const Input = styled.input`
  width: 100%;
  height: 48px;
  border-radius: 8px;
  padding: 0 14px;
  border: none;
  background-color: #2a2a3d;
  color: #fff;
  transition: box-shadow 0.2s ease;

  &:focus {
    outline: none;
    box-shadow: 0 0 0 2px #4c9aff;
  }
`;

export const LabelUpload = styled.label`
  cursor: pointer;
  border: 2px dashed #4c9aff;
  border-radius: 8px;
  padding: 12px;
  display: flex;
  align-items: center;
  gap: 8px;
  color: #fff;
  background-color: #2a2a3d;
  transition: background-color 0.2s ease;

  &:hover {
    background-color: #32324a;
  }

  > svg {
    width: 24px;
    height: 24px;
    color: #4c9aff;
  }

  input {
    display: none;
  }
`;

export const Select = styled(ReactSelect).attrs({
    styles: {
        control: (base) => ({
            ...base,
            backgroundColor: '#2a2a3d',
            borderColor: '#4c9aff',
            color: '#fff',
            borderRadius: '8px',
            padding: '2px',
        }),
        singleValue: (base) => ({
            ...base,
            color: '#fff',
        }),
        menu: (base) => ({
            ...base,
            backgroundColor: '#2a2a3d',
        }),
        option: (base, state) => ({
            ...base,
            backgroundColor: state.isFocused ? '#4c9aff' : '#2a2a3d',
            color: state.isFocused ? '#fff' : '#f1f1f1',
        }),
    },
})``;

export const SubmitButton = styled(Button)`
  margin-top: 24px;
  height: 48px;
  font-weight: 600;
  border-radius: 8px;
`;

export const ErrorMessage = styled.span`
  color: #ffcc00;
  font-size: 13px;
  font-weight: 600;
  margin-top: 2px;
`;

export const ContainerCheckbox = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
  cursor: pointer;
  margin-top: 6px;

  input {
    width: 16px;
    height: 16px;
    accent-color: #4c9aff;
    cursor: pointer;
  }

  label {
    color: #f1f1f1;
    font-size: 14px;
  }
`;

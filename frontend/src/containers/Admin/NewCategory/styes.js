import styled from "styled-components";
import ReactSelect from "react-select"
import { Button } from "../../../components";

export const Container = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    min-height: 100vh;
`;

export const Form = styled.form`
    border-radius: 20px;
    background-color: #1f1f2e;
    box-shadow: 2px 0 10px rgba(0, 0, 0, 0.15);
    padding: 32px;
    width: 100%;
    max-width: 380px;
    display: flex;
    flex-direction: column;
    gap: 12px;
`;

export const InputGroup = styled.div`
    display: flex;
    flex-direction: column;
    gap: 4px;
`;

export const Label = styled.label`
    color: #ffffff;
    font-size: 14px;
`;

export const Input = styled.input`
    width: 100%;
    height: 48px;
    border-radius: 5px;
    padding: 0 12px;
    border: none;
`;

export const LabelUpload = styled.label`
    cursor: pointer;
    border: 1px dashed #ffff;
    border-radius: 5px;
    padding: 10px;
    display: flex;
    color: #ffff;
    margin: 20px 0;

    > svg{
        width: 20px;
        height: 20px;
        fill: #ffff;
        margin-right: 4px;
    }

    input {
        display: none;
    }

`;

export const Select = styled(ReactSelect)``;

export const SubmitButton = styled(Button)`
    margin-top: 20px;
`;

export const ErrorMessage = styled.span`
    color: #f7a53d;
    font-size: 14px;
    line-height: 80%;
    font-weight: 600;
`;
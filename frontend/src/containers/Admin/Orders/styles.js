import styled from "styled-components";
import Select from 'react-select';

export const Container = styled.div`
  margin-left: ${(props) => (props.$collapsed ? '80px' : '250px')};
  transition: margin-left 0.3s ease;
  padding: 24px;
  height: 100vh;
  overflow-y: auto;
`;

export const ProductImage = styled.img`
    height: 90px;
    padding: 12px;
    border-radius: 16px;
`;

export const SelectStatus = styled(Select)`
    width: 240px;
`;

export const Filter = styled.div`
    display: flex;
    justify-content: center;
    margin: 28px 0;
    gap: 50px;
`;

export const FilterOption = styled.button`
    cursor: pointer;
    background: none;
    border: none;
    color: ${(props) =>
        props.$isActiveStatus ? '#780c08' : '#625e4e'};
    border-bottom: ${(props) => props.$isActiveStatus ? `2px solid #780c08` : 'none'};
    transition: border-bottom 0.2s ease-in-out;
    font-size: 13px;
    line-height: 20px;
    padding-bottom: 5px;   
`;

export const TableHead = styled.table`
    background-color: rebeccapurple;
    margin-left: ${props => (props.$collapsed ? '80px' : '250px')};
    transition: margin-left 0.3s ease;
    padding: 24px;
`;
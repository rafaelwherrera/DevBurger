import styled from 'styled-components';

export const TableWrapper = styled.div`
  max-height: 400px;
  overflow-y: auto;
  border-radius: 8px;
  box-shadow: inset 0 0 0 1px #e5e7eb;
  margin-bottom: 16px;
`;

export const ProductImage = styled.img`
    height: 80px;
    width: 80px;
    border-radius: 12px;
    object-fit: cover;
    transition: transform 0.3s ease-in-out;

    &:hover {
        transform: scale(1.1);
    }
`;

export const ButtonGroup = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 90px; /* largura fixa */
  padding: 0 4px;
  background-color: #f5f5f5;
  border-radius: 8px;
  font-size: 14px;

  button {
    display: flex;
    align-items: center;
    justify-content: center;
    height: 30px;
    width: 30px;
    color: #fff;
    border-radius: 4px;
    background-color: #780c08;
    border: none;
    cursor: pointer;
    transition: all 0.4s;

    &:hover {
      background-color: rgb(88, 8, 5);
    }
  }
`;


export const EmptyCart = styled.p`
    font-size: 20px;
    text-align: center;
    font-weight: bold;
    color: #7a7a7a;
`;

export const ProductTotalPrice = styled.td`
  font-weight: bold;
  text-align: center;
  vertical-align: middle;
  color: #2e2e2e;
  white-space: nowrap;
`;


export const TrashImage = styled.img`
    width: 24px;
    height: 24px;
    cursor: pointer;
    transition: transform 0.3s ease, filter 0.3s ease;
    
    &:hover {
        transform: scale(1.2);
        filter: brightness(0.8);
    }

    &:focus {
        outline: 2px solid #000;
        border-radius: 4px;
    }
`;

export const TableRoot = styled.table`
  width: 100%;
  border-collapse: collapse;
  table-layout: fixed;
  border-radius: 8px;
  overflow: hidden;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
`;


export const TableHeader = styled.thead`
    background-color: #f8f8f8;
    text-align: left;
    color: #484848;
    font-weight: 700;
`;

export const TableTr = styled.tr`
  border-bottom: 1px solid #e0e0e0;
  min-height: 80px;
  height: 80px;
`;

export const TableTh = styled.th`
  padding: 12px;
  text-align: left;
  font-size: 16px;
  color: #555;

  &:nth-child(1) { width: 90px; }     /* imagem */
  &:nth-child(3) { width: 100px; }    /* preço */
  &:nth-child(4) { width: 130px; }    /* quantidade */
  &:nth-child(5) { width: 120px; }    /* total */
  &:nth-child(6) { width: 50px; }     /* lixeira */
`;

export const TableTd = styled.td`
  padding: 12px;
  font-size: 16px;
  color: #666;
  vertical-align: middle;
  height: 100px;
  box-sizing: border-box;
`;

import styled from "styled-components";

export const Container = styled.div`
  margin-left: ${(props) => (props.$collapsed ? '80px' : '250px')};
  transition: margin-left 0.3s ease;
  padding: 24px;
  height: 100vh;
  overflow-y: auto;
`;

export const EditButton = styled.button`
    cursor: pointer;
    border: none;
    background-color: rgb(226, 226, 226);
    height: 32px;
    width: 32px;
    border-radius: 8px;
    margin: 0 auto;
    display: flex;
    align-items: center;
    justify-content: center;

    svg {
        height: 15px;
        width: 15px;
    }

    &:hover {
        background-color: #f7a53d;

        svg {
            fill: white;
        }
    }
`;

export const ProductImage = styled.img`
    height: 80px;
    padding: 12px;
    border-radius: 16px;
`;


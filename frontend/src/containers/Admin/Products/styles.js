import styled from "styled-components";

export const Container = styled.div``;

export const ProductImage = styled.img`
    height: 80px;
    padding: 12px;
    border-radius: 16px;
`;

export const EditButton = styled.button`
    cursor: pointer;
    border: none;
    background-color:rgb(226, 226, 226);
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

export const FilterContainer = styled.div`
    display: flex;
    align-items: center;
    gap: 12px;
    margin-bottom: 16px;

    label {
        font-weight: 500;
        font-size: 16px;
    }

    select {
        padding: 8px 12px;
        border-radius: 8px;
        border: 1px solid #ccc;
        background-color: #fff;
        font-size: 14px;
        cursor: pointer;
        transition: all 0.3s;

        &:hover {
            border-color: #f7a53d;
        }

        &:focus {
            outline: none;
            border-color: #f7a53d;
            box-shadow: 0 0 0 2px rgba(247, 165, 61, 0.3);
        }
    }
`;
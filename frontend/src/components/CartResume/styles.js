import styled from "styled-components";

export const Container = styled.div`
  background-color: #ffffff;
  border-radius: 16px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.06);
  padding: 24px;
  margin-bottom: 24px;
  display: flex;
  flex-direction: column;
  gap: 24px;
  font-family: "Poppins", sans-serif;

  * {
    color: #2d2d2d;
    font-weight: 500;
  }

  .container-top {
    display: grid;
    gap: 12px 20%;
    grid-template-areas:
      'title title'
      'items items-price'
      'delivery-tax delivery-tax-price';
    align-items: center;

    .title {
      grid-area: title;
      font-size: 1.25rem;
      font-weight: 700;
      background-color: #1f2937;
      color: #ffffff;
      padding: 16px;
      border-radius: 12px;
      text-align: center;
    }

    .items {
      grid-area: items;
      padding-left: 8px;
    }

    .items-price {
      grid-area: items-price;
      padding-right: 8px;
      text-align: right;
    }

    .delivery-tax {
      grid-area: delivery-tax;
      padding-left: 8px;
    }

    .delivery-tax-price {
      grid-area: delivery-tax-price;
      padding-right: 8px;
      text-align: right;
    }
  }

  .container-cep {
    margin-top: 1.5rem;
    margin-bottom: 1.5rem;
    display: flex;
    flex-direction: column;
    gap: 8px;

    label {
      font-size: 0.9rem;
      font-weight: 600;
    }

    input {
      padding: 0.8rem;
      border: 1px solid #d1d5db;
      border-radius: 0.5rem;
      font-size: 1rem;
      transition: border 0.2s ease;

      &:focus {
        border-color: #6366f1;
        outline: none;
      }
    }
  }

  .delivery-options {
    display: flex;
    flex-direction: column;
    gap: 12px;

    h3 {
      font-size: 1rem;
      font-weight: 600;
      margin-bottom: 4px;
    }

    label {
      margin-left: 8px;
    }

    input[type='radio'] {
      accent-color: #6366f1;
    }
  }

  .ButtonCart {
    display: flex;
    justify-content: space-between;
    align-items: center;
    font-size: 1.125rem;
    font-weight: 700;
    margin-top: 16px;
    padding: 16px;
    background-color: #f9fafb;
    border-radius: 12px;

    p {
      margin: 0;
    }
  }
`;

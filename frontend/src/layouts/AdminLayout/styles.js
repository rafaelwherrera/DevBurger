import styled from "styled-components";


export const Container = styled.div`
    display: grid;
    grid-template-columns: ${({ $collapsed }) => ($collapsed ? '80px 1fr' : 'minmax(220px, 280px) 1fr')};
    transition: grid-template-columns 0.3s ease;
        
        main {
            background-color: red;
            align-items: center;
            display: flex;
            flex-direction: column;
            flex: 1;
            background-color: #f0f0f0;
            overflow-y: auto;
        }

        section {
            align-items: center;
            margin: 0 auto;
            height: 100vh;
            width: 100%;
            padding: 40px 20px;
            max-width: 1200px;
        }
        `;
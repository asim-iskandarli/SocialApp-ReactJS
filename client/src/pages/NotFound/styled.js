import styled from 'styled-components';

export const Container = styled.div`
    width: 100%;
    height: 90vh;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
    gap: 10px;
    h1 {
        font-size: 12rem;
        color: #ccc;
    }
    a {
        width: 200px;
        margin-top: 10px;
        
    }
`;


export const Btn = styled.button`
    width: 100%;
    height: 40px;
    border: none;
    font-size: 14px;
    border: 1px solid #da5555;
    border-radius: 5px;
    background: none;
    color: #da5555;
    font-weight: 600;
    transition: all 0.3s ease;
    cursor: pointer;
    &:hover {
        color: #ac4242;
        background-color: #ac42421f;
        border: 1px solid #ac4242;
    }
`;
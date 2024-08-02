import { createGlobalStyle } from 'styled-components';
import styled from 'styled-components';

const GlobalStyle = createGlobalStyle`
    *, *::after, *::before {
        box-sizing: border-box;
        outline: none;
        margin: 0;
        padding: 0;
    }
    :root {
      --width-screen: 45%;
      --navbar-width: 85%;
      --font-size: 24px;
      --input-font-size: 14px;

      --primary: #55c2da;
      --primary-hover: #45a1b6;
      --primary-hover-bg: #45a1b631;
      --danger: #f04c4c;
      --danger-hover: #ce4242;
      --danger-hover-bg: #ce42421e;
      --body-bg: #eee;

      
      @media only screen and (max-width: 1024px) {
        --width-screen: 65%;
        --navbar-width: 95%;
        --font-size: 18px;
      }
      @media only screen and (max-width: 768px) {
        --width-screen: 85%;
        --font-size: 16px;
      }
      @media only screen and (max-width: 512px) {
        --width-screen: 95%;
      }
    }
    a {
        text-decoration: none;
        color: #3d3d3d;
    }
    body {
        font-family: Open-Sans, Helvetica, Sans-Serif;
        background-color: var(--body-bg);
        overflow-y: scroll;
    }
    input {
        width: 100%;
        height: 40px;
        border: 1px solid #eee;
        border-radius: 5px;
        padding-left: 10px;
        font-size: var(--input-font-size);
    }
`;

export default GlobalStyle;


export const Button = styled.button`
    width: 80%;
    height: 40px;
    border: none;
    font-size: 14px;
    border: 1px solid var(--primary);
    border-radius: 5px;
    background: none;
    color: var(--primary);
    font-weight: 600;
    transition: all 0.3s ease;
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    &:hover {
        color: var(--primary-hover);
        background-color: var(--primary-hover-bg);
        border: 1px solid var(--primary-hover);
    }
`;

export const Icon = styled.div`
    cursor: pointer;
    color: #65676B;
    border-radius: 50%;
    border: none;
    width: 35px;
    height: 35px;
    display: flex;
    align-items: center;
    justify-content: center;
    transition: all 0.3s ease;
    &:hover {
        background-color: #f3f3f3;
    }
    a {
        display: flex;
        align-items: center;
        justify-content: center;
        width: 35px;
        height: 35px;
        color: #65676B;
    }
`;

export const ModalBox = styled.div`
  width: 400px;
  padding: 1rem;
  border-radius: 1rem;
  background-color: #fff;
  box-shadow: rgba(0, 0, 0, 0.24) 0px 3px 8px;
`;


export const ModalHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  h3 {
    margin-left: 1rem;
    color: #353535;
  }
`;

export const ModalBody = styled.div`
  form {
    margin-top: 1rem;
  display: flex;
  flex-direction: column;
  padding: 1rem;
  align-items: center;
  gap: 1rem;
  button {
    width: 100%;
  }
  }
`;
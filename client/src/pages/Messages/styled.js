import styled from 'styled-components';

export const Container = styled.div`
    width: 85%;
    margin: 0 auto;
    display: flex;
    flex-direction: row;

    @media only screen and (max-width: 1024px) {
        width: 95%;
    }
    @media only screen and (max-width: 768px) {
        width: 100%;
    }
`;

export const SideBar = styled.div`
    width: 500px;
    height: 90.5vh;
    overflow-y: auto;
    background-color: #fff;
    border-right: 1px solid #ddd;

    @media only screen and (max-width: 768px) {
        width: 300px;
    }
    @media only screen and (max-width: 512px) {
        width: 200px;
        height: 94vh;
    }
`;

export const StartConversation = styled.div`
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    border-top: 1px solid #fff;
    border-right: 1px solid #fff;
    h1 {
        color: #636363;
    }
`;

export const SearchUser = styled.div`
    padding: 10px;
`;

export const Users = styled.div`
    padding: 10px;
`;
export const User = styled.div`
border-radius: 5px;
cursor: pointer;
transition: all 0.3s ease;
    &:hover {
        background-color: #fff;
    }
`;

export const MessagesScreen = styled.div`
    width: 100%;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    border-right: 1px solid #fff;
`;

export const Messages = styled.div`
    padding: 10px 20px;
    height: 468px;
    display: flex;
    flex-direction: column;
    background-color: #fff;
    overflow-y: auto;
    .me {
        width: 100%;    
        display: flex;
        justify-content: flex-end;
        div {
            background-color: #55c2da;
            border-radius: 20px 20px 0 20px;
        }
    }
    .other {
        width: 100%;
        display: flex;
        justify-content: flex-start; 
        div {
            background-color: #ccc;
            border-radius: 0 20px 20px 20px;
        }
    }

    @media only screen and (max-width: 512px) {
        height: 82.5vh;
    }
`;

export const MessageBox = styled.div`
    width: max-content;
    color: #fff;
    padding: 10px;
`;

export const MessageText = styled.div`
    width: max-content;
    color: #fff;
    padding: 10px;
    display: flex;
    flex-direction: column;
    gap: 10px;
    p {
        font-size: 10px;
    }
`;

export const Header = styled.div`
    border-bottom: 2px solid #ddd;
    display: flex;
    background-color: #fff;
    justify-content: space-between;
    align-items: center;
    padding: 0 20px;
`;

export const RightButtons = styled.div`
`;

export const Body = styled.div`
    width: 100%;
    height: 220px;
    flex: 1;
`;

export const Footer = styled.div`
    background-color: #fff;
    padding: 5px;
    form {
        display: flex;
        align-items: center;
        gap: 5px;
        input {
            width: 100%;
            border: 1px solid #ddd;
        }
    }
    button {
        width: 200px;
    }
`;

export const NoMessageBox = styled.div`
    width: 100%;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    h2 {
        color: #ccc;
    }
`;

export const LoadUser = styled.div`
    width: 100%;
    height: 200px;
    display: flex;
    align-items: center;
    justify-content: center;
`;

export const LoadConversation = styled.div`
    width: 100%;
    height: 500px;
    display: flex;
    align-items: center;
    justify-content: center;
`;
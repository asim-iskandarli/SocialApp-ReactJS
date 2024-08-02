import styled from 'styled-components';

export const Container = styled.div`
    width: 100%;
    height: 100vh;
    background-color: #eee;
    display: flex;
    align-items: center;
    justify-content: center;
    form{
        width: 50%;
        background-color: #fff;
        display: flex;
        flex-direction: column;
        align-items: center;
        padding: 3rem 0.5rem;
        border-radius: 10px;
        gap: 15px;
        h2 {
            margin-bottom: 3rem;
            color: #bbb;
        }
        a {
            font-weight: 600;
            color: #636363;
            margin-top: 15px;
        }
        p {
            font-size: 14px;
            a {
                font-weight: 600;
                color: #3293b9;
            }
        }

        @media only screen and (max-width: 1024px) {
            width: 65%;
        }
        @media only screen and (max-width: 768px) {
            width: 75%;
        }
        @media only screen and (max-width: 512px) {
            width: 95%;
        }
    }

`;

export const InputFiled = styled.div`
    width: 80%;
    label {
        color: #505050;
        font-weight: 600;
        margin-left: 5px;
    }
    input{
        width: 100%;
        height: 40px;
        padding-left: 10px;
        border: 1px solid #ccc;
        border-radius: 5px;
        margin-top: 5px;
    }
`;

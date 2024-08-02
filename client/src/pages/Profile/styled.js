import styled from 'styled-components';
import { Button } from '../../globalStyles';

export const ProfileContainer = styled.div`
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    margin-top: 1.5rem;
`;

export const Header = styled.div`
    width: var(--width-screen);
    min-height: 240px;
    padding: 2rem;
    background-color: #fff;
    border-radius: 1rem;
    margin-bottom: 1rem;
    box-shadow: rgba(0, 0, 0, 0.24) 0px 3px 8px;
`;

export const Top = styled.div`
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-bottom: 2rem;
`;

export const Bottom = styled.div`
    display: flex;
    align-items: flex-end;
    justify-content: space-between;
    p {
         font-size: 12px;
         color: #363636;
         display: flex;
         align-items: flex-end;
         gap: 5px;
    }
`;

export const HeaderLeft = styled.div`
    display: flex;
    align-items: center;
    gap: 5px;
`;

export const HeaderRight = styled.div`
    button {
        width: 150px;
    }
`;

export const Body = styled.div`
    width: var(--width-screen);
`;


export const UserInfo = styled.div`
    h3{
        color: #353535;
        margin-bottom: 3px;
    }
    h5 {
        color: #808080;
    }
`;

export const UserPosts = styled.div`
    width: 100%;
`;

export const NoPost = styled.div`
    height: 200px;
    display: flex;
    align-items: center;
    justify-content: center;
    h1 {
        color: #8f8f8f;
        font-size: 2rem;
    }
`;

export const UserLoad = styled.div`
    width: 100%;
    height: 25vh;
    display: flex;
    align-items: center;
    justify-content: center;
`
export const EditButton = styled(Button)`
    @media only screen and (max-width: 768px) {
        width: 70px !important;
    }
`
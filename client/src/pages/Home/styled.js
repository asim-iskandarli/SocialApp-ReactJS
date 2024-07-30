import styled from 'styled-components';


export const Container = styled.div`
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 1rem;
`;

export const PostsBox = styled.div`
    width: 100%;
    display: flex;
    justify-content: center;
    gap: 10px;
    flex-wrap: wrap;
`;

export const PostLoad = styled.div`
    width: 100%;
    height: 300px;
    display: flex;
    align-items: center;
    justify-content: center;
`;

export const HomePosts = styled.div`
    width: var(--width-screen);
`;
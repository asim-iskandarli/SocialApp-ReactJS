import React from 'react'
import styled from 'styled-components'

const OfflineModal = () => {
  return (
    <Container>
        <img src='https://www.computerhope.com/jargon/o/offline-300.png' alt='offline'/>
        <h1>You are offline now</h1>
    </Container>
  )
}

const Container = styled.div`
    position: fixed;
    top: 0;
    left: 0;
    background-color: #eeeeeeb9;
    width: 100%;
    height: 100vh;
    display: flex;
    flex-direction: column;
    gap: 1rem;
    align-items: center;
    justify-content: center;
    z-index: 90;
    img {
        width: 80px;
    }
    h1 {
        color: #3d3d3d;
    }
`;

export default OfflineModal
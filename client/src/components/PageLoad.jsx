import React from 'react'
import {BounceLoader} from "react-spinners";
import styled from 'styled-components'

const PageLoad = () => {
  return (
    <LoadingPage>
        <BounceLoader
            color={"#55c2da"}
      />
    </LoadingPage>
  )
}

export default PageLoad

const LoadingPage = styled.div`
    position: fixed;
    width: 100%;
    height: 100vh;
    left: 0;
    top: 0;
    z-index: 99;
    display: flex;
    align-items: center;
    justify-content: center;
`;
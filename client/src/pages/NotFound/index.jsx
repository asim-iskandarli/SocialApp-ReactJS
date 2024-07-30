import React from 'react'
import { Btn, Container } from './styled'
import { Link } from 'react-router-dom'

const NotFoundPage = () => {
  return (
    <Container>
      <h1>404</h1>
      <h4>Oops! This page could not be found.</h4>
      <Link to="/"><Btn>Go Home</Btn></Link>
    </Container>
  )
}

export default NotFoundPage
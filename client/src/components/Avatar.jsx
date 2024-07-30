import React from 'react'
import styled from 'styled-components'

const AvatarComponent = ({ avatar, width, height }) => {
    return (
        <Avatar width={width} height={height}>
            <img style={{width: '100%', height: '100%'}} src={avatar} alt='avatar'/>
        </Avatar>
    )
}

export default AvatarComponent

const Avatar = styled.div((props) => ({
    width: props.width,
    height: props.height,
}))
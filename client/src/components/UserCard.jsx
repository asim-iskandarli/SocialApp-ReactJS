import React from 'react'
import styled from 'styled-components';

const userCard = ({ user, width, height }) => {
    return (
        <UserCard $width={width} $height={height}>
            <img src={user?.avatar} alt='avatar' />
            <strong>{user?.username || 'Guest'}</strong>
        </UserCard>
    )
}

export default userCard

export const UserCard = styled.div`
    width: 100%;
    display: flex;
    align-items: center;
    gap: 10px;
    padding: 2px;
        img {
            width: ${({$width}) => $width ? `${$width}px` : '50px' };
            height: ${({$height}) => $height ? `${$height}px` : '50px' };
        }
`;
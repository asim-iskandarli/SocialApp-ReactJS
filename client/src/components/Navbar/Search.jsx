import React, { useState } from 'react'
import styled from 'styled-components';
import { useLazyQuery } from '@apollo/client';
import { SEARCH_USER } from '../../graphql/queries/userQueries';
import UserCard from '../UserCard';
import { Link } from 'react-router-dom';
import { IoSearchOutline } from "react-icons/io5";

const SearchComponent = () => {
    const [search, setSearch] = useState('');
    const [searchBox, setSearchBox] = useState(false)
    const [searchList, setSearchList] = useState([])
    const [searchUser, { loading }] = useLazyQuery(SEARCH_USER, {
        onCompleted: (data) => {
            setSearchList(data.searchUser)
        },
        onError: (error) => {
            console.log(error)
        }
    })

    const hanleClickButton = () => {
        if (search.trim().length === 0) return;
        setSearchBox(true)
        searchUser({ variables: { name: search } })
    }
    const closeSearchList = () => {
        setSearchList([])
        setSearchBox(false)
        setSearch('')
    }

    return (
        <Search>
            <input type='text' placeholder='Search users' onChange={(e) => setSearch(e.target.value)} value={search} />
            <SearchBtn style={{ width: 100 }} onClick={hanleClickButton}><IoSearchOutline /></SearchBtn>
            {
                searchBox > 0 &&
                <SearchList>
                    {
                        loading ?
                            <h5>Loading...</h5> :
                            searchList.length > 0 ?
                                searchList.map(user => (
                                    <User key={user.id} onClick={closeSearchList}>
                                        <Link to={`/profile/${user.id}`}><UserCard user={user} width={35} height={35} /></Link>
                                    </User>
                                )) :
                                <p>User not found.</p>
                    }
                    <CloseBtn onClick={closeSearchList}>Close</CloseBtn>
                </SearchList>
            }
        </Search>
    )
}

export default SearchComponent


const Search = styled.div`
    position: relative;
    width: 40%;
    display: flex;
    align-items: center;
    gap: 5px;
    input {
        width: 100%;
    }

`;

const SearchList = styled.div` 
    top: 40px;
    background-color: #fff;
    position: absolute;
    width: 360px;
    min-height: 50px;
    padding: 10px;
    box-shadow: rgba(0, 0, 0, 0.24) 0px 3px 8px;
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 5px;

    @media only screen and (max-width: 768px) {
        width: 250px;
    }
`;

const User = styled.div`
    width: 100%;
    border-radius: 5px;
    background-color: #f7f7f7;
    transition: all 0.3s ease;

    &:hover {
        background-color: #f1f1f1;
    }
`

const CloseBtn = styled.button`
    width: 95%;
    height: 2rem;
    margin-top: 10px;
    border: none;
    font-size: 12px;
    border: 1px solid #f04c4c;
    border-radius: 5px;
    background: none;
    color: var(--danger);
    font-weight: 600;
    transition: all 0.3s ease;
    cursor: pointer;
    &:hover {
        color: var(--danger-hover);
        background-color: var(--danger-hover-bg);
    }
`

export const SearchBtn = styled.button`
    width: 10px;
    height: 40px;
    border: none;
    font-size: 14px;
    border: 1px solid var(--primary);
    border-radius: 5px;
    color: var(--primary);
    background: none;
    font-weight: 600;
    transition: all 0.3s ease;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 22px;
    cursor: pointer;
    &:hover {
        color: var(--primary-hover);
        background-color: var(--primary-hover-bg);
        border: 1px solid var(--primary-hover);
    }

    @media only screen and (max-width: 768px) {
        width: 50px !important;
        font-size: 14px;
        align-items: center;
        justify-content: center;
        transition: all 0.3s ease;
    }
`;
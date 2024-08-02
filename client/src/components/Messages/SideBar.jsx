import React from 'react'
import UserCard from '../UserCard'
import { LoadUser, SearchUser, SideBar, User, Users } from '../../pages/Messages/styled'
import { useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { useQuery } from '@apollo/client'
import { GET_ALL_USERS } from '../../graphql/queries/userQueries'
import { getAllUsers } from '../../redux/slices/messageSlice'
import { PuffLoader } from 'react-spinners'

const SideBarComponent = () => {
    const navigate = useNavigate();
    const { users } = useSelector(state => state.messageReducer);
    const dispatch = useDispatch();

    const { loading } = useQuery(GET_ALL_USERS, {
        onCompleted: (data) => {
            dispatch(getAllUsers(data.users));
        },
        onError: (error) => {
            console.log(error);
        }
    });

    return (
        <SideBar>
            <SearchUser>
                <input placeholder='Search' />
            </SearchUser>
            <Users>
                {
                    loading ?
                        <LoadUser>
                            <PuffLoader color='#36d7b7' size={40} />
                        </LoadUser> :
                        users?.map(user => (
                            <User key={user.id} onClick={() => navigate(`/messages/${user.id}`)}>
                                <UserCard user={user} width={30} height={30} />
                            </User>
                        ))
                }
            </Users>
        </SideBar>

    )
}

export default SideBarComponent
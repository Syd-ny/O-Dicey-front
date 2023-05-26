import { useSelector } from 'react-redux';
import { useRef, useCallback, useState, useEffect } from "react";
import { useNavigate } from 'react-router-dom';
import axios from "axios";

import './User.scss';
import Frame from '../Frame/Frame';
import PageWrapper from '../PageWrapper/PageWrapper';

const User = () => {

    const navigate = useNavigate();

    const userId = useSelector((state) => state.user.user_id);
    const userToken = useSelector((state) => state.user.token);
    const apiUrl = import.meta.env.VITE_API_URL;

    const [user, setUser] = useState([]);

    const fetchUser = useCallback( async () => {

        // axios => get data (user data from userId)
        await axios.get(
            `api/users/${userId}`,
            {
                method: 'get',
                baseURL: `${apiUrl}/`,
                headers: {
                    Authorization: `Bearer ${userToken}`,
                    Accept: 'application/json',
                }, 
            }
        ).then((response) => {
            // add user data in "user"
            setUser(response.data);
        })
    }, [userId, userToken, apiUrl]);

    // do it when new render
    const firstRender = useRef(true);
    useEffect(() => {
        if (firstRender.current) {
            fetchUser();
            firstRender.current = false;
        } 
    }, [fetchUser]);


    const deleteA = () => { 
        if (confirm("Êtes-vous sûr de vouloir supprimer votre profil ?")) {
            axios.delete(
                `api/users/${userId}`,
                {
                    method: 'delete',
                    baseURL: `${apiUrl}/`,
                    headers: {
                        Authorization: `Bearer ${userToken}`,
                    }, 
                }
            ).then(
                navigate("/")
            )
        }
    }

    return (
      <PageWrapper>
        <Frame title="Profil">
            <h3 className='user-title'>Email</h3>
            <p className='user-info'>{user.email}</p>
            <h3 className='user-title'>Pseudo</h3>
            <p className='user-info'>{user.login}</p>
            <button onClick={() => navigate("/profile/edit")} className='user-button' type="submit">Modifier</button>
            <button onClick={() => navigate("/profile/pwd")} className='user-button' type="submit">Changer de mot de passe</button>
            <button 
                className='user-button' 
                type="submit"
                onClick={deleteA}>
                    Supprimer
            </button>
        </Frame>
      </PageWrapper>
    );
};

export default User;
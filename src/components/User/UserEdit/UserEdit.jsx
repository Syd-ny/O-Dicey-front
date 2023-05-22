import PropTypes from 'prop-types';
import { useSelector } from 'react-redux';
import { useRef, useCallback, useState, useEffect } from "react";
import axios from "axios";

import './UserEdit.scss';
import Frame from '../../Frame/Frame';
import PageWrapper from '../../PageWrapper/PageWrapper';
import { useNavigate } from 'react-router-dom';

const UserEdit = ({ formType }) => {

    const navigate = useNavigate();

    const changeField = (initialValue, setValue) => {
        return (name, value) => {
            const newValue = {...initialValue, [name]: value};
            setValue(newValue);
        }
    };
    
    const handleChangeField = (event) => {
        changeField(user, setUser)(event.target.id, event.target.value);
    }
    
    
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
    
    const changeUserInfo = async () => {
        const apiUrl = import.meta.env.VITE_API_URL;
        try {
            const res = await axios.put(
                `${apiUrl}/api/users/${userId}`,
                user, 
                {
                    headers: {
                        'Authorization': `Bearer ${userToken}`,
                        'Content-Type': 'application/json',
                    }
                }
            );
            setUser(res.data);
            navigate("/profile");
          }
          catch (err) {
            console.error(err);
          }
    }

    const saveUserChange = (event) => {
        event.preventDefault();
        changeUserInfo();
    };

    if (formType === "userEdit") {
        return (
            <PageWrapper>
                <Frame title="Profil">
                    <form className="userform-form" 
                    // onSubmit={saveUserChange} 
                    >
                        <label htmlFor="avatar">Avatar :</label>
                        <input 
                            type="text" 
                            id="picture" 
                            placeholder="URL image de profil" 
                            defaultValue={user.picture} 
                            onChange={handleChangeField} 
                        />

                        <label htmlFor="email">E-mail :</label>
                        <input 
                            type="email" 
                            id="email"
                            placeholder="Adresse e-mail" 
                            defaultValue={user.email} 
                            onChange={handleChangeField}
                        />

                        <label htmlFor="pseudo">Pseudo :</label>
                        <input 
                            type="text" 
                            id="login" 
                            placeholder="Pseudo" 
                            defaultValue={user.login} 
                            onChange={handleChangeField} 
                        />

                        <button onClick={saveUserChange} 
                        // type="submit"
                        >Envoyer</button>
                    </form>
                </Frame>
            </PageWrapper>
        );
    } else if (formType === "userPwd") {
        return (
            <PageWrapper>
                <Frame title="Mot de passe">
                    <form className="userform-form">
                        <label htmlFor="password">Ancien mot de passe :</label>
                        <input className='pwd-old' type="password" id="password" placeholder="Mot de passe" />
    
                        <label htmlFor="password">Nouveau mot de passe :</label>
                        <input type="password" id="password" placeholder="Mot de passe" />
    
                        <label htmlFor="password">Confirmez le nouveau mot de passe :</label>
                        <input type="password" id="password" placeholder="Confirmez le mot de passe" />
    
                        <button type="submit">Envoyer</button>
                    </form>
                </Frame>
            </PageWrapper>
        );
    }
};
    
UserEdit.propTypes = {
    formType: PropTypes.string.isRequired,
};
    
export default UserEdit;
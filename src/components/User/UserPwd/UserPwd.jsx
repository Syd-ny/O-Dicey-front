import PropTypes from 'prop-types';
import { useDispatch, useSelector } from 'react-redux';
import { useRef, useCallback, useState, useEffect } from "react";
import axios from "axios";

import './UserPwd.scss';
// import edit from '../../assets/edit-icon.svg';
import Frame from '../../Frame/Frame';
import { actionSubmitLoginForm, actionUpdateFormField } from '../../../actions/user';
// import { Navigate } from 'react-router-dom';
import PageWrapper from '../../PageWrapper/PageWrapper';

const UserPwd = ({ formType }) => {

    const changeField = (name, value) => {
        dispatch(actionUpdateFormField(name, value));
    };
    
    const handleChangeField = (event) => {
        return changeField(event.target.id, event.target.value);
    }
    
    const handleLogin = (event) => {
        event.preventDefault();
        dispatch(actionSubmitLoginForm());
    };
    
    
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
    console.log(user)
    
    // do it when new render
    const firstRender = useRef(true);
    useEffect(() => {
        if (firstRender.current) {
            fetchUser();
            firstRender.current = false;
        } 
    }, [fetchUser]);
    
    
    
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
};
    
UserPwd.propTypes = {
    formType: PropTypes.string.isRequired,
};
    
export default UserPwd;
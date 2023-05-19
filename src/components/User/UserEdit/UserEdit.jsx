import PropTypes from 'prop-types';
import { useDispatch, useSelector } from 'react-redux';
import { useRef, useCallback, useState, useEffect } from "react";
import axios from "axios";

import './UserEdit.scss';
// import edit from '../../assets/edit-icon.svg';
import Frame from '../../Frame/Frame';
import { actionSubmitLoginForm, actionUpdateFormField } from '../../../actions/user';
// import { Navigate } from 'react-router-dom';
import PageWrapper from '../../PageWrapper/PageWrapper';

const UserEdit = ({ formType }) => {

    const dispatch = useDispatch();

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
            <Frame title="Profil">
                <form className="userform-form" onChange={handleChangeField} >
                    <label htmlFor="avatar">Avatar :</label>
                    <input type="text" id="avatar" placeholder="URL image de profil" defaultValue={user.email} onChange={handleChangeField} />

                    <label htmlFor="email">E-mail :</label>
                    <input type="email" id="email" placeholder="Adresse e-mail" defaultValue={user.email} onChange={handleChangeField} />

                    <label htmlFor="pseudo">Pseudo :</label>
                    <input type="text" id="pseudo" placeholder="Pseudo" defaultValue={user.login} onChange={handleChangeField} />

                    <button type="submit">Envoyer</button>
                </form>
            </Frame>
        </PageWrapper>
    );
};
    
UserEdit.propTypes = {
    formType: PropTypes.string.isRequired,
};
    
export default UserEdit;
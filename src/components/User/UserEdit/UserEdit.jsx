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
    const [signUpError, setError] = useState([""]);
    const [user, setUser] = useState([]);
    const [updatedUserData, setUpdatedUserData] = useState({});

    const userId = useSelector((state) => state.user.user_id);
    const userToken = useSelector((state) => state.user.token);
    const apiUrl = import.meta.env.VITE_API_URL;

    
    // ===============================
    // ===== DETECT CHANGE FIELD =====
    // ===============================

    const changeField = (initialValue, setValue) => {
        return (name, value) => {
            const newValue = {...initialValue, [name]: value};
            setValue(newValue);
        }
    };
    
    const handleChangeField = (event) => {
        changeField(updatedUserData, setUpdatedUserData)(event.target.id, event.target.value);
    }
    
    
    // =========================
    // ===== GET USER DATA =====
    // =========================
    
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


    // =========================
    // ===== PUT USER DATA =====
    // =========================
    
    const changeUserInfo = async () => {

        const apiUrl = import.meta.env.VITE_API_URL;
        try {
            const res = await axios.put(
                `${apiUrl}/api/users/${userId}`,
                updatedUserData, 
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


    // ======================================
    // ===== DETECT ANY ERROR FROM FORM =====
    // ======================================

    const saveUserChange = (event) => {
        event.preventDefault();
        let error = false;
        const errorList = [];
        // if it's a password change
        if (updatedUserData.password) {
            if (updatedUserData.password === undefined || updatedUserData.password === "") {
                errorList.push("Le mot de passe doit être rempli")
                error = true;
            }
            if (updatedUserData.password != updatedUserData.passwordcheck) {
                errorList.push("Les mots de passe ne sont pas identiques")
                error = true;
            }
        }
        if (error) {
            setError(errorList);
            return;
        }
        changeUserInfo();
    };

        
    // ====================================
    // ===== RENDER OF USER INFO EDIT =====
    // ====================================

    if (formType === "userEdit") {
        return (
            <PageWrapper>
                <Frame title="Profil">
                    <form className="user-edit-form" 
                    // onSubmit={saveUserChange} 
                    >
                        <label 
                            className="user-edit-label" htmlFor="avatar">Avatar :</label>
                        <input 
                            type="text" 
                            id="picture" 
                            className="user-edit-input"
                            placeholder="URL image de profil" 
                            defaultValue={user.picture} 
                            onChange={handleChangeField} 
                        />

                        <label className="user-edit-label" htmlFor="email">E-mail :</label>
                        <input 
                            type="email" 
                            id="email"
                            className="user-edit-input"
                            placeholder="Adresse e-mail" 
                            defaultValue={user.email} 
                            onChange={handleChangeField}
                        />

                        <label className="user-edit-label" htmlFor="pseudo">Pseudo :</label>
                        <input 
                            type="text" 
                            id="login" 
                            className="user-edit-input"
                            placeholder="Pseudo" 
                            defaultValue={user.login} 
                            onChange={handleChangeField} 
                        />

                        <button className="user-edit-button" onClick={saveUserChange} type="submit">Envoyer</button>
                        <button className="user-edit-button user-edit-button-back" onClick={() => navigate("/profile")}>Retour</button>
                    </form>
                </Frame>
            </PageWrapper>
        );


    // ==============================
    // ===== RENDER OF PSW EDIT =====
    // ==============================

    } else if (formType === "userPwd") {
        return (
            <PageWrapper>
                <Frame title="Mot de passe">
                    <form className="userform-form">
                        {/* <label htmlFor="password">Ancien mot de passe :</label>
                        <input className='pwd-old' type="password" id="password" placeholder="Mot de passe" /> */}
    
                        <label className="user-edit-label" htmlFor="password">Nouveau mot de passe :</label>
                        <input 
                            type="password" 
                            id="password" 
                            className="user-edit-input"
                            placeholder="Mot de passe" 
                            value={updatedUserData.password}
                            onChange={handleChangeField} 
                        />
    
                        <label className="user-edit-label" htmlFor="password">Confirmez le nouveau mot de passe :</label>
                        <input 
                            type="password" 
                            id="passwordcheck" 
                            className="user-edit-input"
                            placeholder="Confirmez le mot de passe" 
                            value={updatedUserData.passwordCheck}
                            onChange={handleChangeField}
                        />

                        <div className="userform-form-error">
                            {signUpError.map((e, i) => <p key={`error-${i}`}>{e}</p>)}
                        </div>
                        <button className="user-edit-button" onClick={saveUserChange} type="submit">Envoyer</button>
                        <button className="user-edit-button user-edit-button-back" onClick={() => navigate("/profile")}>Retour</button>
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
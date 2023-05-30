import PropTypes from 'prop-types';
import { useDispatch, useSelector } from 'react-redux';

import './UserForm.scss';
import edit from '../../assets/edit-icon.svg';
import Frame from '../Frame/Frame';
import { actionGetCharacterList, actionGetGameList, actionSubmitLoginForm, actionUpdateFormField } from '../../actions/user';
import { Link, Navigate } from 'react-router-dom';
import { useState } from 'react';
import axios from 'axios';
import PageWrapper from '../PageWrapper/PageWrapper';

const UserForm = ({ formType }) => {
  const dispatch = useDispatch();
  const email = useSelector((state) => state.user.email);
  const password = useSelector((state) => state.user.password);
  const isLogged = useSelector((state) => state.user.logged);
  const [signUpForm, setSignUpForm] = useState({
    email: "",
    pseudo: "",
    avatar: "",
    password: "",
    checkpassword: ""
  });

  const [signUpError, setSignUpError] = useState([""]);

  const handleSignUpChangeField = (event) => {
    if (signUpError.length > 0) setSignUpError([]); // bad error handling
    setSignUpForm({ ...signUpForm, [event.target.id]: event.target.value });
  };

  const submitSignUpForm = async () => {
    const apiUrl = import.meta.env.VITE_API_URL;
    try {
      await axios.post(`${apiUrl}/api/users`,
      {
          email: signUpForm.email,
          login: signUpForm.pseudo,
          password: signUpForm.password,
          picture: signUpForm.avatar,
      });
      setSignUpError(["Utilisateur créé. Vous pouvez vous connecter."]);
      setSignUpForm({
        email: "",
        pseudo: "",
        avatar: "",
        password: "",
        checkpassword: ""
      });
    }
    catch (err) {
      setSignUpError([...signUpError, err.message]);
    }
  }

  const handleSignUp = (event) => {
    event.preventDefault();
    let error = false;
    const errorList = [];
    if (signUpForm.pseudo === ""){
      errorList.push("Le pseudo doit être rempli");
      error = true;
    }
    if (signUpForm.password !== signUpForm.checkpassword){
      errorList.push("Les mots de passe ne sont pas identiques");
      error = true;
    }
    if (error) {
      setSignUpError(errorList);
      return;
    }

    submitSignUpForm();
  };

  if (isLogged) {
    // not perfect, should be done elsewhere
    dispatch(actionGetCharacterList());
    dispatch(actionGetGameList());
    return <Navigate to="/" />
  }

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

  if (formType === 'signup') {
    return (
      <PageWrapper>
      <Frame title="Inscription">
        {/* 
          autocomplete="off" does not work in Chrome because Chrome does not respect standards
          cf. https://bugs.chromium.org/p/chromium/issues/detail?id=370363
        */}
        <form className="userform-form" autoComplete="off" onSubmit={handleSignUp}>
          <label htmlFor="email">E-mail :</label>
          <input type="email" id="email" placeholder="Adresse e-mail" value={signUpForm.email} onChange={handleSignUpChangeField} />

          <label htmlFor="pseudo">Pseudo :</label>
          <input type="text" id="pseudo" placeholder="Pseudo" value={signUpForm.pseudo} onChange={handleSignUpChangeField} />

          <label htmlFor="avatar" className="userform-form-avatar-upload" id="avatar-label">Avatar :</label>
          <input type="url" id="avatar" name="avatar" placeholder="URL de votre avatar" value={signUpForm.avatar} onChange={handleSignUpChangeField} />

          <label htmlFor="password">Mot de passe :</label>
          <input type="password" id="password" placeholder="Mot de passe" value={signUpForm.password} onChange={handleSignUpChangeField} />

          <label htmlFor="checkpassword">Confirmez le mot de passe :</label>
          <input type="password" id="checkpassword" placeholder="Confirmez le mot de passe" value={signUpForm.checkpassword} onChange={handleSignUpChangeField} />

          <div className="userform-form-error">
            {signUpError.map((e, i) => <p key={`error-${i}`}>{e}</p>)}
          </div>
          <button type="submit">Envoyer</button>
        </form>
      </Frame>
      </PageWrapper>
    );
  }
  else if (formType === 'login') {
    return (
      <PageWrapper>
        <Frame title="Login">
          <form className="userform-form" onSubmit={handleLogin}>

            <label htmlFor="email">E-mail :</label>
            <input type="email" id="email" placeholder="Adresse e-mail" value={email} onChange={handleChangeField} />

            <label htmlFor="password">Mot de passe :</label>
            <input type="password" id="password" placeholder="Mot de passe" value={password} onChange={handleChangeField} />

            <button type="submit">Envoyer</button>
            <Link to="/signup" id="signup" className="signup-button">Inscription</Link>
          </form>
        </Frame>
      </PageWrapper>
    );
  }
};

UserForm.propTypes = {
  formType: PropTypes.string.isRequired,
};

export default UserForm;
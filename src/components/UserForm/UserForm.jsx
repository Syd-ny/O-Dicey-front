import PropTypes from 'prop-types';
import { useDispatch, useSelector } from 'react-redux';

import './UserForm.scss';
import edit from '../../assets/edit-icon.svg';
import Frame from '../Frame/Frame';
import { actionSubmitLoginForm, actionUpdateFormField } from '../../actions/user';
import { Navigate } from 'react-router-dom';

const UserForm = ({ formType }) => {
  const dispatch = useDispatch();
  const email = useSelector((state) => state.user.email);
  const password = useSelector((state) => state.user.password);
  const isLogged = useSelector((state) => state.user.logged);

  if (isLogged) {
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

  if (formType === 'subscribe') {
    return (
      <Frame title="Inscription">
        <form className="userform-form">
          <label htmlFor="avatar" className="userform-form-avatar-upload" id="avatar-label">
            <img src={edit} />
          </label>
          <input type="file" id="avatar" name="avatar" accept=".jpg .jpeg .png" />

          <label htmlFor="email">E-mail :</label>
          <input type="email" id="email" placeholder="Adresse e-mail" />

          <label htmlFor="pseudo">Pseudo :</label>
          <input type="text" id="pseudo" placeholder="Pseudo" />

          <label htmlFor="password">Mot de passe :</label>
          <input type="password" id="password" placeholder="Mot de passe" />

          <label htmlFor="password">Confirmez le mot de passe :</label>
          <input type="password" id="password" placeholder="Confirmez le mot de passe" />

          <button type="submit">Envoyer</button>
        </form>
      </Frame>
    );
  }
  else if (formType === 'login') {
    return (
      <Frame title="Login">
        <form className="userform-form" onSubmit={handleLogin}>

          <label htmlFor="email">E-mail :</label>
          <input type="email" id="email" placeholder="Adresse e-mail" value={email} onChange={handleChangeField} />

          <label htmlFor="password">Mot de passe :</label>
          <input type="password" id="password" placeholder="Mot de passe" value={password} onChange={handleChangeField} />

          <button type="submit">Envoyer</button>
        </form>
      </Frame>
    );
  }
};

UserForm.propTypes = {
  formType: PropTypes.string.isRequired,
};

export default UserForm;
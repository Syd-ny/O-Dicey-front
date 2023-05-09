import PropTypes from 'prop-types';

import './UserForm.scss';
import edit from '../../assets/edit-icon.svg';
import Frame from '../Frame/Frame';

const UserForm = ({ formType }) => {

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
        <form className="userform-form">

          <label htmlFor="email">E-mail :</label>
          <input type="email" id="email" placeholder="Adresse e-mail" />

          <label htmlFor="password">Mot de passe :</label>
          <input type="password" id="password" placeholder="Mot de passe" />

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
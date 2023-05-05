import PropTypes from 'prop-types';

import './UserForm.scss';
import edit from '../../assets/edit-icon.svg';

const UserForm = ({ formType }) => {

  if (formType === 'subscribe') {
    return (
      <section className="subscribe">
        <h2>Inscription</h2>
        <form className="subscribe-form">
          <label htmlFor="avatar" className="subscribe-form-avatar-upload">
            <img src={edit} />
          </label>
          <input type="file" id="avatar" name="avatar" accept=".jpg .jpeg .png" />
          <input type="email" placeholder="Adresse e-mail" />
          <input type="text" placeholder="Pseudo" />
          <input type="password" placeholder="Mot de passe" />
          <input type="password" placeholder="Confirmez le mot de passe" />
          <button type="submit">Envoyer</button>
        </form>
      </section>
    );
  }
  else if (formType === 'login') {
    return (
      <section className="subscribe">
        <h2>Login</h2>
        <form className="subscribe-form">
          <input type="email" placeholder="Adresse e-mail" />
          <input type="password" placeholder="Mot de passe" />
          <button type="submit">Envoyer</button>
        </form>
      </section>
    );
  }
};

UserForm.propTypes = {
  formType: PropTypes.string.isRequired,
};

export default UserForm;
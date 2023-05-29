import PropTypes from 'prop-types';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { actionPopError } from '../../actions/user';

import './ErrorToaster.scss';

const ErrorToaster = ({ children }) => {
  const dispatch = useDispatch();
  const { errors } = useSelector((state) => state.user);

  useEffect(() => {
    // errors are kept displayed for 3 seconds
    const timer = setInterval(() => {
      if(errors.length > 0) dispatch(actionPopError());
    }, 3000);

    return () => clearInterval(timer);
  }, [errors, dispatch])

  return (
    <>
      {children}
      <ul className="error-toaster">
        {errors.map((e, i) => <li key={`errors-${i}`} className="error-toaster-item">{e}</li>)}
      </ul>
    </>
  );
};

ErrorToaster.propTypes = {
  children: PropTypes.node
};

export default ErrorToaster;
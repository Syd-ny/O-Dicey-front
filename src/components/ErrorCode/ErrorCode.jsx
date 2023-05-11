import PropTypes from 'prop-types';

import './ErrorCode.scss';
import Frame from '../Frame/Frame';

const ErrorCode = ({ code, message }) => {
  const codeChars = [...code];

  return (
      <div className="error-code">
        <section className="error-code-status">
          {codeChars.map((c, i) => <span key={i} style={{ animationDelay: `${i * 200 + 200}ms` }} className="error-code-status-number">{c}</span>)}
        </section>
        <section className="error-code-message">
          {message}
        </section>
      </div>
  );
};

ErrorCode.propTypes = {
  code: PropTypes.string.isRequired,
  message: PropTypes.string.isRequired,
};

export default ErrorCode;
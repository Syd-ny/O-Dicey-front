import PropTypes from 'prop-types';

import './Frame.scss';

const Frame = ({ title, children }) => {
  return (
    <section className="frame">
      <h2>{title}</h2>
      <div className="frame-content">{children}</div>
    </section>
  );
};

Frame.propTypes = {
  title: PropTypes.string.isRequired,
  children: PropTypes.node.isRequired,
};

export default Frame;
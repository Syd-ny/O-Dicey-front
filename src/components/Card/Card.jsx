import PropTypes from 'prop-types';
import './Card.scss';

const Card = ({
    cardClass,
    title,
    titleClass,
    content,
    contentClass,
  }) => (
    <div className={`card ${cardClass}`}>
        <h2 className={titleClass}>{title}</h2>
        <p className={contentClass}>{content}</p>
    </div>
  );
  
  Card.propTypes = {
    cardClass: PropTypes.string,
    title: PropTypes.string.isRequired,
    titleClass: PropTypes.string,
    content: PropTypes.string.isRequired,
    contentClass: PropTypes.string,
  };
  
  export default Card;
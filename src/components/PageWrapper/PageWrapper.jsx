import PropTypes from 'prop-types';

import Footer from "../Footer/Footer";
import Header from "../Header/Header";

import './PageWrapper.scss'

const PageWrapper = ({ children }) => {
  return (
    <>
      <Header />
      <div className='main'>{children}</div>
      <Footer />
    </>
  );
};

PageWrapper.propTypes = {
  children: PropTypes.node,
};

export default PageWrapper;
import PropTypes from 'prop-types';

import Footer from "../Footer/Footer";
import Header from "../Header/Header";

const PageWrapper = ({ children }) => {
  return (
    <>
      <Header />
      {children}
      <Footer />
    </>
  );
};

PageWrapper.propTypes = {
  children: PropTypes.node,
};

export default PageWrapper;
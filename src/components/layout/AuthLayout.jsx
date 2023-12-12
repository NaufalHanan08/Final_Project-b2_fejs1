import Navbar from '../Navbar';
import Footer from '../Footer';

const AuthLayout = ({ children }) => {
  return (
    <div>
      <Navbar />
      <div>{children}</div>
      <Footer />
    </div>
  );
};

export default AuthLayout;

import PropTypes from 'prop-types';
import { FaArrowLeft } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';

const AuthLayout = ({ children }) => {
  const navigate = useNavigate('');

  return (
    <div>
      <div>
        <button onClick={() => navigate('/')} className="bg-gray-800 py-2 px-6 rounded-full hover:bg-white border border-gray-800 hover:text-gray-800 transition-all text-white text-2xl absolute left-10 top-10">
          <FaArrowLeft />
        </button>
      </div>
      <div>{children}</div>
    </div>
  );
};

AuthLayout.propTypes = {
  children: PropTypes.node.isRequired,
};

export default AuthLayout;

import { useState } from 'react';
import { Link } from 'react-router-dom';

function ForgotPasswordPage() {
  const [email, setEmail] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const handleEmailChange = (e) => {
    const emailValue = e.target.value;
    console.log('email :', emailValue);

    setEmail(emailValue);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch('http://byteacademy.as.r.appspot.com/api/v1/auth/forgot-password-email', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Something went wrong');
      }

      setSuccess('Password reset instructions sent. Check your email.');
      setError('');
    } catch (error) {
      console.log('Server response:', error);
      setError(error.message || 'Something went wrong');
      setSuccess('');
    }
  };

  return (
    <main id="content" role="main" className="flex items-center justify-center min-h-screen">
      <div className="w-full max-w-md bg-white rounded-xl shadow-lg dark:bg-gray-800 dark:border-gray-700 p-4 sm:p-7">
        <div className="text-center">
          <h1 className="block text-2xl font-bold text-gray-800 dark:text-white">Forgot password?</h1>
          <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">
            Remember your password?{' '}
            <Link to="/login" className="text-teal-600 font-semibold leading-6 text-teal-600 hover:text-gray-800">
              Login here
            </Link>
          </p>
        </div>

        <div className="mt-5" onSubmit={handleSubmit}>
          <form>
            <div className="grid gap-y-4">
              <div>
                <label htmlFor="email" className="block text-sm font-bold ml-1 mb-2 dark:text-white">
                  Email address
                </label>
                <div className="relative">
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={email}
                    onChange={handleEmailChange}
                    className="py-3 px-4 block w-full border-2 border-gray-200 rounded-md text-sm focus:border-blue-500 focus:ring-blue-500 shadow-sm"
                    required
                    aria-describedby="email-error"
                  />
                </div>
                <p className={`text-xs ${error ? 'text-red-600' : 'text-green-600'} mt-2`} id="email-error">
                  {error || success}
                </p>
              </div>
              <button
                type="submit"
                className="py-3 px-4 inline-flex justify-center items-center gap-2 rounded-md border border-transparent font-semibold bg-teal-600 text-white hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-all text-sm dark:focus:ring-offset-gray-800"
              >
                Reset password
              </button>
            </div>
          </form>
        </div>
      </div>
    </main>
  );
}

export default ForgotPasswordPage;

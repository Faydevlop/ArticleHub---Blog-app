import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { clearError, loginAuth } from '../../redux/feature/userAuthSlice';

const Login = () => {
  const dispatch = useDispatch();

  // State variables for form fields and validation messages
  const [emailOrPhone, setEmailOrPhone] = useState('');
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState({ emailOrPhone: '', password: '' });
  const { user, loading, error } = useSelector((state) => state.auth);
  const navigate = useNavigate();

  // Form validation function
  const validateForm = () => {
    const newErrors = { emailOrPhone: '', password: '' };
    let isValid = true;

    if (!emailOrPhone) {
      newErrors.emailOrPhone = 'Phone or email is required';
      isValid = false;
    }

    if (!password || password.length < 6) {
      newErrors.password = 'Password must be at least 6 characters';
      isValid = false;
    }

    setErrors(newErrors);
    return isValid;
  };

  useEffect(() => {
    // Clear error when component unmounts or form is submitted successfully
    return () => {
      dispatch(clearError());
    };
  }, [dispatch]);

  // Handle form submission
  const handleSubmit = async(e) => {
    e.preventDefault();
  
    if (validateForm()) {
      const userData = { emailOrPhone, password };
      const resultAction = await dispatch(loginAuth(userData)).unwrap();
      navigate('/dashboard')
    }
  
  };

  return (
    <div className="grid w-full min-h-screen grid-cols-1 lg:grid-cols-2">
      <div className="flex items-center justify-center bg-muted p-6 lg:p-10">
        <div className="mx-auto w-full max-w-md space-y-6">
          <div className="space-y-2 text-center">
            <h1 className="text-3xl font-bold">Welcome back</h1>
            <p className="text-muted-foreground">Enter your phone or email and password to sign in.</p>
          </div>
          <form className="space-y-4" onSubmit={handleSubmit}>
            <div className="space-y-2">
              <label className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70" htmlFor="email-or-phone">
                Phone or Email
              </label>
              <input
                className={`flex h-10 w-full rounded-md border px-3 py-2 text-sm ${
                  errors.emailOrPhone ? 'border-red-500' : 'border-input'
                } bg-background ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2`}
                id="email-or-phone"
                type="text"
                placeholder="Enter your phone or email"
                value={emailOrPhone}
                onChange={(e) => setEmailOrPhone(e.target.value)}
              />
              {errors.emailOrPhone && <span className="text-red-500 text-sm">{errors.emailOrPhone}</span>}
            </div>
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <label className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70" htmlFor="password">
                  Password
                </label>
              </div>
              <input
                className={`flex h-10 w-full rounded-md border px-3 py-2 text-sm ${
                  errors.password ? 'border-red-500' : 'border-input'
                } bg-background ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2`}
                id="password"
                type="password"
                placeholder="Enter your password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              {errors.password && <span className="text-red-500 text-sm">{errors.password}</span>}
            </div>
            <button
              className="inline-flex items-center justify-center rounded-md text-sm font-medium bg-black text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 h-10 w-full px-4 py-2"
              type="submit"
            >
              Sign in
            </button>
          </form>
          {error && (
        <div className="p-4 mb-4 text-red-600 bg-red-100 border border-red-400 rounded-md">
          <p>{error}</p>
        </div>
      )}
          <p className="text-center text-sm text-muted-foreground">
            Don't have an account?{' '}
            <Link to="/signup">
              <span className="font-medium underline">Sign up</span>
            </Link>
          </p>
        </div>
      </div>
      <div
        className="flex items-center justify-center bg-cover bg-center p-6 lg:p-10"
        style={{
          backgroundImage: `url(https://images.pexels.com/photos/3205539/pexels-photo-3205539.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1)`,
          backgroundSize: 'cover',
        }}
      >
        <div className="bg-black bg-opacity-50 p-6 rounded-md">
          <div className="mx-auto w-full max-w-md space-y-6">
            <blockquote className="text-lg font-semibold leading-snug text-white lg:text-xl lg:leading-normal xl:text-3xl">
              “Every great article starts with a spark of interest; ignite yours and let your words flow.“
            </blockquote>
            <div>
              <div className="font-semibold text-white">Emma Smith</div>
              <div className="text-sm text-gray-300">Senior Writer, Insight Journal</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;

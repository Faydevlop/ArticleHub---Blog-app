import React, { useState } from 'react';
import SignupForm from '../../components/user/forms/SignupForm';
import CategorySelection from '../../components/user/forms/CategorySelection';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { registerAuth } from '../../redux/feature/userAuthSlice';

const Signin = () => {
  const [formData, setFormData] = useState(null);
  const dispatch = useDispatch();
  const { user, loading, error } = useSelector((state) => state.auth);

  const handleFormSubmit = (data) => {
    setFormData(data); // Store form data
  
    dispatch(registerAuth(data)); // Trigger registration
  };

  const handleCategorySubmit = (categories) => {
    const completeData = { ...formData, categories };
   
    // Make an API call here with completeData
  };

  // Determine if we should show the CategorySelection component
  const showCategorySelection = user && !loading && !error;

  return (
    <div className="grid w-full min-h-screen grid-cols-1 lg:grid-cols-2">
      <div className="flex items-center justify-center bg-muted p-6 lg:p-10">
        <div className="mx-auto w-full max-w-md space-y-6">
          <div className="space-y-2 text-center">
            <h1 className="text-3xl font-bold">
              {showCategorySelection ? 'Select Your Interests' : 'Create an account'}
            </h1>
            {!formData && (
              <p className="text-muted-foreground">
                Already have an account?{' '}
                <Link to={'/login'}>
                  <a className="underline">Sign in</a>
                </Link>
              </p>
            )}
          </div>
          {/* Show the Signup Form or Category Selection based on the state */}
          {!showCategorySelection ? (
            <SignupForm onFormSubmit={handleFormSubmit} />
          ) : (
            <CategorySelection onCategorySubmit={handleCategorySubmit} />
          )}
        </div>
      </div>

      {/* Right Side: Static Quote */}
      <div
        className="flex items-center justify-center bg-cover bg-center p-6 lg:p-10"
        style={{
          backgroundImage: `url(https://images.pexels.com/photos/7657622/pexels-photo-7657622.jpeg)`,
          backgroundSize: 'cover',
        }}
      >
        <div className="bg-black bg-opacity-50 p-6 rounded-md">
          <div className="mx-auto w-full max-w-md space-y-6">
            <blockquote className="text-lg font-semibold leading-snug text-white lg:text-xl lg:leading-normal xl:text-3xl">
              “The key to writing great articles is to find a unique perspective and share it with the world.“
            </blockquote>
            <div>
              <div className="font-semibold text-white">Jane Doe</div>
              <div className="text-sm text-gray-300">Editor-in-Chief, Article Magazine</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Signin;

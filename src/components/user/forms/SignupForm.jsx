import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { clearError } from '../../../redux/feature/userAuthSlice';

const SignupForm = ({ onFormSubmit }) => {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    phone: '',
    email: '',
    dateOfBirth: '',
    password: '',
    confirmPassword: '',
  });


  const [errors, setErrors] = useState({});
  const {user,error,loading} = useSelector((state)=>state.auth)
  const [validationError,setValidationError] = useState()
  const dispatch = useDispatch();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
    setErrors({ ...errors, [e.target.id]: '' }); // Clear error on input change
  };

  const validateForm = () => {
    const newErrors = {};
    const { firstName, lastName, phone, email, dateOfBirth, password, confirmPassword } = formData;
  
    // First name validation: only letters
    if (!firstName) {
      newErrors.firstName = 'First Name is required.';
    } else if (!/^[A-Za-z]+$/.test(firstName)) {
      newErrors.firstName = 'First Name can only contain letters.';
    }
  
    // Last name validation: only letters
    if (!lastName) {
      newErrors.lastName = 'Last Name is required.';
    } else if (!/^[A-Za-z]+$/.test(lastName)) {
      newErrors.lastName = 'Last Name can only contain letters.';
    }
  
    // Phone number validation: no repetitive numbers like "0000000000"
    if (!phone) {
      newErrors.phone = 'Phone number is required.';
    } else if (!/^\d{10}$/.test(phone)) {
      newErrors.phone = 'Phone number must be exactly 10 digits.';
    } else if (/^(\d)\1{9}$/.test(phone)) {
      newErrors.phone = 'Phone number cannot be repetitive numbers (e.g., 0000000000).';
    }
  
    // Email validation
    if (!email) newErrors.email = 'Email is required.';
  
    // Date of birth validation: must be a past date
    if (!dateOfBirth) {
      newErrors.dateOfBirth = 'Date of Birth is required.';
    } else if (new Date(dateOfBirth) >= new Date()) {
      newErrors.dateOfBirth = 'Date of Birth must be in the past.';
    }
  
    // Password validation: minimum 6 characters
    if (!password) {
      newErrors.password = 'Password is required.';
    } else if (password.length < 6) {
      newErrors.password = 'Password must be at least 6 characters long.';
    } else if (!/(?=.*[0-9])(?=.*[!@#$%^&*])/.test(password)) {
      newErrors.password = 'Password must include at least one number and one special character.';
    }
  
    // Confirm password validation
    if (password !== confirmPassword) newErrors.confirmPassword = 'Passwords do not match.';
  
    return newErrors;
  };
  

  useEffect(() => {
    // Clear error when component unmounts or form is submitted successfully
    return () => {
      dispatch(clearError());
    };
  }, [dispatch]);

  const handleSubmit = (e) => {
    e.preventDefault();
    const formErrors = validateForm();
    setErrors(formErrors);

    if (Object.keys(formErrors).length === 0) {
      // Pass form data to the parent component on successful submission
      onFormSubmit(formData);
    }
  };

  return (
    <form className="grid gap-4" onSubmit={handleSubmit}>
      
      <div className="grid grid-cols-2 gap-4">
       
        <div className="space-y-2">
          <label className="text-sm font-medium" htmlFor="firstName">First Name</label>
          <input
            className="flex h-10 w-full rounded-md border bg-background px-3 py-2 text-sm"
            id="firstName"
            placeholder="John"
            value={formData.firstName}
            onChange={handleChange}
            
          />
          {errors.firstName && <p className="text-red-500 text-sm">{errors.firstName}</p>}
        </div>
        <div className="space-y-2">
          <label className="text-sm font-medium" htmlFor="lastName">Last Name</label>
          <input
            className="flex h-10 w-full rounded-md border bg-background px-3 py-2 text-sm"
            id="lastName"
            placeholder="Doe"
            value={formData.lastName}
            onChange={handleChange}
            
          />
          {errors.lastName && <p className="text-red-500 text-sm">{errors.lastName}</p>}
        </div>
      </div>
      <div className="space-y-2">
        <label className="text-sm font-medium" htmlFor="phone">Phone</label>
        <input
          className="flex h-10 w-full rounded-md border bg-background px-3 py-2 text-sm"
          id="phone"
          placeholder="+1 (555) 555-5555"
          type="tel"
          value={formData.phone}
          onChange={handleChange}
          
        />
        {errors.phone && <p className="text-red-500 text-sm">{errors.phone}</p>}
      </div>
      <div className="space-y-2">
        <label className="text-sm font-medium" htmlFor="email">Email</label>
        <input
          className="flex h-10 w-full rounded-md border bg-background px-3 py-2 text-sm"
          id="email"
          placeholder="m@example.com"
          type="email"
          value={formData.email}
          onChange={handleChange}
          
        />
        {errors.email && <p className="text-red-500 text-sm">{errors.email}</p>}
      </div>
      <div className="space-y-2">
        <label className="text-sm font-medium" htmlFor="dateOfBirth">Date of Birth</label>
        <input
          className="flex h-10 w-full rounded-md border bg-background px-3 py-2 text-sm"
          id="dateOfBirth"
          type="date"
          value={formData.dateOfBirth}
          onChange={handleChange}
          
        />
        {errors.dateOfBirth && <p className="text-red-500 text-sm">{errors.dateOfBirth}</p>}
      </div>
      <div className="space-y-2">
        <label className="text-sm font-medium" htmlFor="password">Password</label>
        <input
          className="flex h-10 w-full rounded-md border bg-background px-3 py-2 text-sm"
          id="password"
          type="password"
          value={formData.password}
          onChange={handleChange}
          
        />
        {errors.password && <p className="text-red-500 text-sm">{errors.password}</p>}
      </div>
      <div className="space-y-2">
        <label className="text-sm font-medium" htmlFor="confirmPassword">Confirm Password</label>
        <input
          className="flex h-10 w-full rounded-md border bg-background px-3 py-2 text-sm"
          id="confirmPassword"
          type="password"
          value={formData.confirmPassword}
          onChange={handleChange}
          
        />
        {errors.confirmPassword && <p className="text-red-500 text-sm">{errors.confirmPassword}</p>}
      </div>
      {error && (
        <div className="p-4 mb-4 text-red-600 bg-red-100 border border-red-400 rounded-md">
          <p>{error}</p>
        </div>
      )}
      <button
        className="inline-flex bg-black text-white text-primary-foreground items-center justify-center rounded-md text-sm h-10 px-4 py-2 w-full"
        type="submit"
      >
        Sign Up
      </button>
    </form>
  );
};

export default SignupForm;

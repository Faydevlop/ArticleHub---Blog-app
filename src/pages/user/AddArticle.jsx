import axios from 'axios';
import React, { useState } from 'react';
import toast from 'react-hot-toast';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom'; // Add this import

const AddArticle = () => {
  const categories = [
    'Technology',
    'Health',
    'Business',
    'Sports',
    'Lifestyle',
    'Education',
    'Travel',
    'Food & Drink',
    'Entertainment',
    'Science',
    'Politics',
    'Finance',
    'Fashion',
    'Home & Garden',
    'Gaming',
  ];
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    images: [], // Change this to an array
    categories: [],
  });

  const [errors, setErrors] = useState({});
  
  const {user,error,loading} = useSelector((state)=>state.auth)
  const handleChange = (e) => {
    const { name, value, type, files } = e.target;
    if (type === 'file') {
      const selectedFiles = Array.from(files);
      const maxSize = 2 * 1024 * 1024; // 2 MB limit
      const validFiles = selectedFiles.filter(file => file.size <= maxSize);
  
      if (validFiles.length !== selectedFiles.length) {
        toast.error('Some files exceed the maximum size of 2 MB');
      }
  
      setFormData((prevData) => ({
        ...prevData,
        images: [...prevData.images, ...validFiles], // Only valid files
      }));
    }
    // ... rest of the code
  };
  

  const removeImage = (index) => {
    const updatedImages = Array.from(formData.images);
    updatedImages.splice(index, 1);
    setFormData({ ...formData, images: updatedImages });
  };
  

  const validateForm = () => {
    const newErrors = {};
    if (!formData.name) {
      newErrors.name = 'Article Name is required';
    }
    if (!formData.description) {
      newErrors.description = 'Description is required';
    }
    if (formData.images && formData.images.length > 0) {
      // Validate image types here if needed
    }
    if (formData.categories.length === 0) {
      newErrors.categories = 'At least one category must be selected';
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (validateForm()) {
      const formDataToSend = new FormData();
      formDataToSend.append('name', formData.name);
      formDataToSend.append('description', formData.description);
  
      // Append each image file to FormData
      formData.images.forEach((image) => formDataToSend.append('images', image));
  
      // Convert categories array to comma-separated string
      formDataToSend.append('categories', formData.categories.join(','));
  
      toast.promise(
        axios.post(
          `https://articlehub.moon-cart.shop/user/addarticles/${user._id}`,
          formDataToSend,
          {
            headers: {
              'Content-Type': 'multipart/form-data',
            },
          }
        ),
        {
          loading: 'Submitting article...',
          success: 'Article submitted successfully!',
          error: 'Error submitting data!',
        }
      ).then(() => {
        // Delay navigation to show the success message before redirecting
        // setTimeout(() => {
        //   navigate('/dashboard');
        // }, 2000); // 2 seconds delay before redirecting to /dashboard
      });
    }
  };
  
  

  return (
    <>
      <div className="container mx-auto max-w-4xl px-4 py-8 sm:px-6 lg:px-8">
        
        <div className="mb-8">
          <h1 className="text-3xl font-bold">Add New Article</h1>
        </div>
        <form className="space-y-6" onSubmit={handleSubmit}>
          {/* Article Name Input */}
          <div>
            <label htmlFor="name" className="block text-sm font-medium text-gray-700">
              Article Name
            </label>
            <div className="mt-1">
              <input
                id="name"
                placeholder="Enter article name"
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                className={`block w-full rounded-md h-[35px] p-5 border-gray-300 shadow-sm focus:border-primary focus:ring-primary sm:text-sm ${errors.name ? 'border-red-500' : ''}`}
              />
              {errors.name && <p className="text-red-500 text-sm">{errors.name}</p>}
            </div>
          </div>

          {/* Description Textarea */}
          <div>
            <label htmlFor="description" className="block text-sm font-medium text-gray-700">
              Description
            </label>
            <div className="mt-1">
              <textarea
                id="description"
                name="description"
                rows="4"
                placeholder="Write a detailed description"
                value={formData.description}
                onChange={handleChange}
                className={`block w-full p-5 rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring-primary sm:text-sm ${errors.description ? 'border-red-500' : ''}`}
              ></textarea>
              {errors.description && <p className="text-red-500 text-sm">{errors.description}</p>}
            </div>
          </div>

          {/* Images Upload Section */}
          <div>
            <label className="block text-sm font-medium text-gray-700">Images</label>
            <div className="mt-1 flex justify-center rounded-md border-2 border-dashed border-gray-300 px-6 pt-5 pb-6">
              <div className="space-y-1 text-center">
                <div className="flex text-sm text-gray-600">
                  <label
                    htmlFor="file-upload"
                    className="relative cursor-pointer rounded-md bg-white font-medium text-primary focus-within:outline-none focus-within:ring-2 focus-within:ring-primary focus-within:ring-offset-2 hover:text-primary-dark"
                  >
                    <span>Upload a file</span>
                    <input id="file-upload" className="sr-only" multiple type="file" name="file-upload" onChange={handleChange} />
                  </label>
                  <p className="pl-1">or drag and drop</p>
                </div>
                <p className="text-xs text-gray-500">PNG, JPG, GIF</p>
                {errors.images && <p className="text-red-500 text-sm">{errors.images}</p>}
              </div>
            </div>
          </div>

          {/* Display Uploaded Images */}
          {/* Display Uploaded Images */}
<div className="mt-4 grid grid-cols-6 ">
  {formData.images.map((image, index) => (
    <div key={index} className="relative">
     <img src={URL.createObjectURL(image)} alt="Image preview" className="h-24 w-24 rounded-md object-cover" />

      <button
        type="button"
        onClick={() => removeImage(index)} // Remove the image when clicked
        className="absolute top-1 left-1 inline-flex items-center justify-center rounded-full bg-red-500 p-1 text-white shadow-sm hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2"
      >
        <svg
          className="h-4 w-4"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          aria-hidden="true"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path>
        </svg>
        <span className="sr-only">Remove image</span>
      </button>
    </div>
  ))}
</div>



          {/* Category Selection */}
          <div>
            <label className="block text-sm font-medium text-gray-700">Category</label>
            <div className="mt-2 grid grid-cols-2 gap-4">
              {categories.map((category, index) => (
                <div key={index} className="flex items-center">
                  <input
                    id={category}
                    name="categories"
                    type="checkbox"
                    value={category}
                    checked={formData.categories.includes(category)}
                    onChange={handleChange}
                    className="h-4 w-4 border-gray-300 rounded text-primary focus:ring-primary"
                  />
                  <label htmlFor={category} className="ml-2 block text-sm text-gray-800">
                    {category}
                  </label>
                </div>
              ))}
            </div>
            {errors.categories && <p className="text-red-500 text-sm">{errors.categories}</p>}
          </div>

          {/* Submit Button */}
          <div className="flex justify-end">
            <button
              type="submit"
              className="inline-flex bg-black justify-center py-2 px-4 border border-transparent rounded-md shadow-3xl text-sm font-medium text-white bg-primary hover:bg-primary-dark focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary"
            >
              Add Article
            </button>
          </div>
        </form>
      </div>
    </>
  );
};

export default AddArticle;

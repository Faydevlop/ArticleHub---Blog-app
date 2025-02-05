import axios from 'axios';
import React, { useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import { useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';

const EditArticle = () => {
  const categories = [
    'Technology', 'Health', 'Business', 'Sports', 'Lifestyle',
    'Education', 'Travel', 'Food & Drink', 'Entertainment',
    'Science', 'Politics', 'Finance', 'Fashion', 'Home & Garden', 'Gaming',
  ];

  const { articleId } = useParams(); // Get the article ID from the URL
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    images: [],
    categories: [],
  });

  const [existingImages, setExistingImages] = useState([]); // To handle existing images
  const [errors, setErrors] = useState({});
  const { user,token } = useSelector((state) => state.auth);

  // Fetch existing article data based on articleId
  useEffect(() => {
    const fetchArticleData = async () => {
      try {
        const { data } = await axios.get(`https://art.fayisnambiyath.in/user/article/${articleId}`,{
          headers: {
              Authorization: `Bearer ${token}`, // Attach token
          },
      });
        setFormData({
          name: data.article.articleName,
          description: data.article.description,
          categories: data.article.category, // assuming categories is an array
          images: [], // New images, empty initially
        });
        setExistingImages(data.article.images || []); // Load existing images
      } catch (error) {
        console.error('Error fetching article data:', error);
      }
    };

    if (articleId) {
      fetchArticleData();
    }
  }, [articleId]);

  const handleChange = (e) => {
    const { name, value, type, files } = e.target;
    if (type === 'file') {
      const selectedFiles = Array.from(files);
      setFormData((prevData) => ({
        ...prevData,
        images: [...prevData.images, ...selectedFiles],
      }));
    } else if (type === 'checkbox') {
      const newCategories = formData.categories.includes(value)
        ? formData.categories.filter((category) => category !== value)
        : [...formData.categories, value];
      setFormData({ ...formData, categories: newCategories });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const removeImage = (index, isNewImage = true) => {
    if (isNewImage) {
      const updatedImages = Array.from(formData.images);
      updatedImages.splice(index, 1);
      setFormData({ ...formData, images: updatedImages });
    } else {
      const updatedExistingImages = Array.from(existingImages);
      updatedExistingImages.splice(index, 1);
      setExistingImages(updatedExistingImages);
    }
  };

  const validateForm = () => {
    const newErrors = {};
    if (!formData.name) {
      newErrors.name = 'Article Name is required';
    }
    if (!formData.description) {
      newErrors.description = 'Description is required';
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

        // Append new images
        formData.images.forEach((image) => formDataToSend.append('images', image));

        // Append updated existing images (after removal)
        formDataToSend.append('existingImages', JSON.stringify(existingImages));

        // Convert categories array to a comma-separated string
        formDataToSend.append('categories', formData.categories.join(','));

        toast.promise(
            axios.put(
                `https://art.fayisnambiyath.in/user/editarticle/${articleId}/${user._id}`,
                formDataToSend,
                {
                    headers: {
                        'Content-Type': 'multipart/form-data',
                        Authorization: `Bearer ${token}`, // Attach token
                    },
                }
            ),
            {
                loading: 'Updating article...',
                success: 'Article updated successfully!',
                error: 'Error updating data!',
            }
        ).then(() => {
            setTimeout(() => {
                navigate('/dashboard');
            }, 2000);
        });
    }
};
  return (
    <>
      <div className="container mx-auto max-w-4xl px-4 py-8 sm:px-6 lg:px-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold">Edit Article</h1>
        </div>
        <form className="space-y-6" onSubmit={handleSubmit}>
          {/* Article Name */}
          <div>
            <label htmlFor="name" className="block text-sm font-medium text-gray-700">Article Name</label>
            <div className="mt-1">
              <input
                id="name"
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                className={`block w-full rounded-md h-[35px] p-5 border-gray-300 shadow-sm focus:border-primary focus:ring-primary sm:text-sm ${errors.name ? 'border-red-500' : ''}`}
              />
              {errors.name && <p className="text-red-500 text-sm">{errors.name}</p>}
            </div>
          </div>

          {/* Description */}
          <div>
            <label htmlFor="description" className="block text-sm font-medium text-gray-700">Description</label>
            <div className="mt-1">
              <textarea
                id="description"
                name="description"
                rows="4"
                value={formData.description}
                onChange={handleChange}
                className={`block w-full p-5 rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring-primary sm:text-sm ${errors.description ? 'border-red-500' : ''}`}
              ></textarea>
              {errors.description && <p className="text-red-500 text-sm">{errors.description}</p>}
            </div>
          </div>

          {/* Existing Images */}
          <div>
            <label className="block text-sm font-medium text-gray-700">Existing Images</label>
            <div className="mt-4 grid grid-cols-6 gap-2">
              {existingImages.map((image, index) => (
                <div key={index} className="relative">
                  <img src={image} alt="Existing image" className="h-24 w-24 rounded-md object-cover" />
                  <button
                    type="button"
                    onClick={() => removeImage(index, false)}
                    className="absolute top-1 left-1 inline-flex items-center justify-center rounded-full bg-red-500 p-1 text-white shadow-sm hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2"
                  >
                    <svg className="h-4 w-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </button>
                </div>
              ))}
            </div>
          </div>

          {/* New Images Upload */}
          {/* New Images Upload */}
<div>
  <label className="block text-sm font-medium text-gray-700">New Images</label>
  <div className="mt-1 flex justify-center rounded-md border-2 border-dashed border-gray-300 px-6 pt-5 pb-6">
    <div className="space-y-1 text-center">
      <div className="flex text-sm text-gray-600">
        <label
          htmlFor="file-upload"
          className="relative cursor-pointer rounded-md bg-white font-medium text-primary focus-within:outline-none focus-within:ring-2 focus-within:ring-primary focus-within:ring-offset-2 hover:text-primary-dark"
        >
          <span>Upload a file</span>
          <input
            id="file-upload"
            multiple
            type="file"
            name="file-upload"
            onChange={handleChange}
            className="sr-only"
          />
        </label>
        <p className="pl-1">or drag and drop</p>
      </div>
    </div>
  </div>
  
  {/* Preview New Images */}
  <div className="mt-4 grid grid-cols-6 gap-2">
    {formData.images.map((image, index) => (
      <div key={index} className="relative">
        <img
          src={URL.createObjectURL(image)}
          alt="Uploaded preview"
          className="h-24 w-24 rounded-md object-cover"
        />
        <button
          type="button"
          onClick={() => removeImage(index, true)}
          className="absolute top-1 left-1 inline-flex items-center justify-center rounded-full bg-red-500 p-1 text-white shadow-sm hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2"
        >
          <svg className="h-4 w-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
      </div>
    ))}
  </div>
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
                  <label htmlFor={category} className="ml-2 block text-sm font-medium text-gray-700">
                    {category}
                  </label>
                </div>
              ))}
            </div>
            {errors.categories && <p className="text-red-500 text-sm">{errors.categories}</p>}
          </div>

          {/* Submit Button */}
          <div>
            <button type="submit" className="w-full bg-black inline-flex justify-center rounded-md border border-transparent bg-primary px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-primary-dark focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2">
              Update Article
            </button>
          </div>
        </form>
      </div>
    </>
  );
};

export default EditArticle;

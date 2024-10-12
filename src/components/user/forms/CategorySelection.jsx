import axios from 'axios';
import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import ReactiveButton from 'reactive-button';

const CategorySelection = () => {
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [state, setState] = useState('idle');

    const {user,error,loading} = useSelector((state)=>state.auth)

  const navigate = useNavigate()

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

  const handleCategoryChange = (category) => {
    setSelectedCategories((prev) =>
      prev.includes(category) ? prev.filter((cat) => cat !== category) : [...prev, category]
    );
  };

  const onClickHandler = async() => {
    setState('loading');

    try {
      const response = await axios.post(`${import.meta.env.VITE_BASE_URL}/user/setintrest/${user._id}`,{interests:selectedCategories})
      navigate('/login')
      
    } catch (error) {
      console.log(error);
      
    }

    

    
  };

  return (
    <div className="space-y-6">
      <p className="text ">Dive into the topics that ignite your passion , your interests are the gateway to endless exploration!</p>
      <hr />
      <div className="grid grid-cols-2 gap-4">
        {categories.map((category) => (
          <div key={category} className="flex items-center">
            <input
              type="checkbox"
              id={category}
              checked={selectedCategories.includes(category)}
              onChange={() => handleCategoryChange(category)}
            />
            <label className="ml-2" htmlFor={category}>{category}</label>
          </div>
        ))}
      </div>
      <hr />
      {/* Center the button using flex */}
      <div className="flex justify-center">
        <ReactiveButton
          buttonState={selectedCategories.length === 0 ? 'idle' : state} // Change state based on selected categories
          idleText="Submit"
          loadingText="Loading"
          successText="Done"
          onClick={selectedCategories.length > 0 ? onClickHandler : null}
          style={{ backgroundColor: selectedCategories.length > 0 ? 'black' : '#A1A1A1', borderRadius: '10px', width: '200px', height: '40px' }} // Disable click if no categories are selected
          className={`transition-all duration-300 ease-in-out ${selectedCategories.length === 0 ? 'bg-gray-400 cursor-not-allowed' : 'bg-black hover:bg-gray-800 hover:rounded-xl'}`}
        />
      </div>
    </div>
  );
}

export default CategorySelection;

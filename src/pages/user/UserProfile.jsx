    import React, { useEffect, useState } from 'react';
    import Header from '../../components/user/Header';
    import { Link } from 'react-router-dom';
    import { useSelector } from 'react-redux';
    import axios from 'axios';
    import { toast } from 'react-hot-toast'; // Import toast

    const categories = [
        'Technology', 'Health', 'Business', 'Sports', 'Lifestyle',
        'Education', 'Travel', 'Food & Drink', 'Entertainment',
        'Science', 'Politics', 'Finance', 'Fashion', 'Home & Garden', 'Gaming',
      ];

    const UserProfile = () => {
        const { user } = useSelector((state) => state.auth);
        const [isDropdownOpen, setIsDropdownOpen] = useState(false);
        const [isEditing, setIsEditing] = useState(false);
        const [oldPassword, setOldPassword] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');
        const [formData, setFormData] = useState({
            firstName:'',
            lastName: '',
            phone: '',
            email: '',
            dateOfBirth: '',
            profilePicture: null, // For the uploaded profile picture
            interests: [],
        });

        const fecthUserdata = async()=>{
            try {

                const response = await axios.get(`${import.meta.env.VITE_BASE_URL}/user/getuser/${user._id}`)
                setFormData({
                    firstName: response.data.user.firstName,
            lastName: response.data.user.lastName,
            phone: response.data.user.phone,
            email: response.data.user.email,
            dateOfBirth: response.data.user.dateOfBirth,
            profilePicture: response.data.user.profileUrl,
            interests: response.data.user.interests || [], // For the uploaded profile picture
                })
                
            } catch (error) {
                console.log(error);
                
            }
        }

        useEffect(()=>{
            fecthUserdata()
        },[])

        const validatePasswords = () => {
            if (!oldPassword || !newPassword || !confirmPassword) {
                setError('All fields are required.');
                return false;
            }
            if (newPassword.length < 6) {
                setError('New password must be at least 6 characters long.');
                return false;
            }
            if (newPassword !== confirmPassword) {
                setError('New password and confirm password do not match.');
                return false;
            }
            setError('');
            return true;
        };
    
        const handleChangePassword = async () => {
            if (validatePasswords()) {
                try {
                    const response = await axios.post(`${import.meta.env.VITE_BASE_URL}/user/changePass/${user._id}`, {
                        oldPass:oldPassword,
                        newPass:newPassword,
                    });
                    setSuccess('Password changed successfully!');
                    toast.success('Password changed successfully!')
                    setError('')
                } catch (error) {
                    console.error('Error changing password:', error);
                    setError('Failed to change password. Please try again.');
                    toast.error('Error changing password',{
                        position:'top-center'
                    })
                    setSuccess('')
                }
            }
        };
      

        const toggleDropdown = () => {
            setIsDropdownOpen(!isDropdownOpen);
        };

        const handleOptionClick = (option) => {
            console.log(option); // Handle option selection here
            setIsDropdownOpen(false); // Close the dropdown after selection
        };

        const handleEditProfile = () => {
            setIsEditing(true);
        };

        const handleSaveChanges = async () => {
            console.log("Saving changes..."); // Check if the function is triggered
        
            const formDataToSend = new FormData();
            formDataToSend.append('firstName', formData.firstName);
            formDataToSend.append('lastName', formData.lastName);
            formDataToSend.append('phone', formData.phone);
            formDataToSend.append('email', formData.email);
            formDataToSend.append('dateOfBirth', formData.dateOfBirth);
            formDataToSend.append('interests', JSON.stringify(formData.interests));
            
            if (formData.profilePicture) {
                formDataToSend.append('profilePicture', formData.profilePicture);
            }
        
            toast.promise(
                axios.post(
                    `${import.meta.env.VITE_BASE_URL}/user/update/${user._id}`, 
                    formDataToSend,
                    {
                        headers: {
                            'Content-Type': 'multipart/form-data',
                        },
                    }
                ),
                {
                    loading: 'Updating profile...',
                    success: (response) => {
                        console.log('Profile updated successfully:', response.data);
                        setIsEditing(false);
                        return 'Profile updated successfully!';
                    },
                    error: (error) => {
                        console.error('Error updating profile:', error);
                        return 'An error occurred while updating the profile.';
                    },
                }
            );
            fecthUserdata()
        };

         // Handle checkbox change for interests
  const handleInterestChange = (interest) => {
    const updatedInterests = formData.interests.includes(interest)
      ? formData.interests.filter((i) => i !== interest)
      : [...formData.interests, interest];
    setFormData({ ...formData, interests: updatedInterests });
  };

        
        const handleFileChange = (e) => {
            setFormData({
                ...formData,
                profilePicture: e.target.files[0],
            });
        };

        return (
            <>
                <Header toggleDropdown={toggleDropdown} />
                {isDropdownOpen && (
                    <div className="absolute right-0 mt-1 w-48 rounded-md shadow-lg bg-white/25 backdrop-blur-0 hover:bg-white/40 text-white ring-1 ring-black ring-opacity-5 z-20">
                        <div className="py-1" role="menu" aria-orientation="vertical" aria-labelledby="options-menu">
                            <Link to={'/dashboard'}>
                                <button className="block px-4 py-2 text-sm text-black hover:bg-gray-100 hover:text-black w-full text-left">
                                    Go to Dashboard
                                </button>
                            </Link>
                            <button
                                onClick={() => handleOptionClick('New Post')}
                                className="block px-4 py-2 text-sm text-black hover:bg-gray-100 hover:text-black w-full text-left"
                            >
                                New Post
                            </button>
                            <button
                                onClick={() => handleOptionClick('My Articles')}
                                className="block px-4 py-2 text-sm text-black hover:bg-gray-100 hover:text-black w-full text-left"
                            >
                                My Articles
                            </button>
                        </div>
                    </div>
                )}
                <main className="container mx-auto bg-gray-200 px-4 md:px-6 py-12 md:py-20">
                    <div className="max-w-3xl mx-auto">
                        <header className="mb-8">
                            <h1 className="text-3xl font-bold">Profile</h1>
                            <p className="text-muted-foreground">Update your personal information.</p>
                        </header>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                            <div className="space-y-6">
                                <div className="grid grid-cols-2 gap-4">
                                    <div className="space-y-2">
                                        <label className="text-sm font-medium leading-none" htmlFor="firstName">
                                            First Name
                                        </label>
                                        <input
                                            className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
                                            id="firstName"
                                            value={formData.firstName}
                                            onChange={(e) => setFormData({ ...formData, firstName: e.target.value })}
                                            disabled={!isEditing}
                                        />
                                    </div>
                                    <div className="space-y-2">
                                        <label className="text-sm font-medium leading-none" htmlFor="lastName">
                                            Last Name
                                        </label>
                                        <input
                                            className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
                                            id="lastName"
                                            value={formData.lastName}
                                            onChange={(e) => setFormData({ ...formData, lastName: e.target.value })}
                                            disabled={!isEditing}
                                        />
                                    </div>
                                </div>
                                <div className="space-y-2">
                                    <label className="text-sm font-medium leading-none" htmlFor="phone">
                                        Phone Number
                                    </label>
                                    <input
                                        className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
                                        id="phone"
                                        value={formData.phone}
                                        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                                        disabled={!isEditing}
                                    />
                                </div>
                                <div className="space-y-2">
                                    <label className="text-sm font-medium leading-none" htmlFor="email">
                                        Email Address
                                    </label>
                                    <input
                                        className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
                                        id="email"
                                        value={formData.email}
                                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                                        type="email"
                                        disabled={!isEditing}
                                    />
                                </div>
                                <div className="space-y-2">
                                    <label className="text-sm font-medium leading-none" htmlFor="dob">
                                        Date of Birth
                                    </label>
                                    <input
                                        className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
                                        id="dob"
                                        type="date"
                                        value={formData.dateOfBirth}
                                        onChange={(e) => setFormData({ ...formData, dateOfBirth: e.target.value })}
                                        disabled={!isEditing}
                                    />
                                </div>
                                <div className="space-y-2">
                <label className="text-sm font-medium leading-none">Interests</label>
                <div className="flex flex-wrap gap-2">
                  {categories.map((category) => (
                    <label key={category} className="flex items-center gap-2">
                      <input
                        type="checkbox"
                        checked={formData.interests.includes(category)}
                        onChange={() => handleInterestChange(category)}
                        disabled={!isEditing}
                      />
                      {category}
                    </label>
                  ))}
                </div>
              </div>
                     
                            </div>
                            <div className="space-y-6">
                                <div className="space-y-2">
                                    <label className="text-sm font-medium leading-none">
                                        Profile Picture
                                    </label>
                                    <div className="flex items-center gap-4">
                                        <span className="relative flex shrink-0 overflow-hidden rounded-full h-20 w-20">
                                            <img 
                                                src={user.profileUrl} 
                                                alt="Profile" 
                                                className="h-full w-full object-cover rounded-full"
                                            />
                                        </span>
                                        <input 
                                            type="file" 
                                            onChange={handleFileChange} 
                                            accept="image/*" 
                                            disabled={!isEditing}
                                        />
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="mt-6 flex items-center gap-4">
                            {isEditing ? (
                                <>
                                    <button 
                                        className="inline-flex h-10 items-center justify-center rounded-md bg-blue-600 px-4 py-2 text-sm font-medium text-white"
                                        onClick={handleSaveChanges} // Save changes button
                                    >
                                        Save Changes
                                    </button>
                                    <button 
                                        className="inline-flex h-10 items-center justify-center rounded-md bg-red-600 px-4 py-2 text-sm font-medium text-white"
                                        onClick={() => setIsEditing(false)} // Cancel button
                                    >
                                        Cancel
                                    </button>
                                </>
                            ) : (
                                <button 
                                    className="inline-flex h-10 items-center justify-center rounded-md bg-green-600 px-4 py-2 text-sm font-medium text-white"
                                    onClick={handleEditProfile} // Edit profile button
                                >
                                    Edit Profile
                                </button>
                            )}
                        </div>
                        <div className="space-y-2">
            <label className="text-sm font-medium leading-none" htmlFor="oldPassword">
                Old Password
            </label>
            <input
                className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
                id="oldPassword"
                placeholder="Old Password"
                type="password"
                value={oldPassword}
                onChange={(e) => setOldPassword(e.target.value)}
            />
            <label className="text-sm font-medium leading-none" htmlFor="newPassword">
                New Password
            </label>
            <input
                className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
                id="newPassword"
                placeholder="New Password"
                type="password"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
            />
            <label className="text-sm font-medium leading-none" htmlFor="confirmPassword">
                Confirm Password
            </label>
            <input
                className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
                id="confirmPassword"
                placeholder="Confirm Password"
                type="password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
            />
            {error && <p className="text-red-500 text-sm">{error}</p>}
            {success && <p className="text-green-500 text-sm">{success}</p>}
            <button
                className="inline-flex bg-black text-white items-center justify-center whitespace-nowrap rounded-md text-sm font-medium h-10 px-4 py-2"
                onClick={handleChangePassword}
            >
                Change Pass
            </button>
        </div>
                    </div>
                </main>
            </>
        );
    };

    export default UserProfile;

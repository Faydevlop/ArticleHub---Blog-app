import React, { lazy, useEffect, useState } from 'react'

import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { logout } from '../../redux/feature/userAuthSlice';
import axios from 'axios';
import { persistor } from '../../redux/store';


const Dashboard = () => {
    const { user,token } = useSelector((state) => state.auth);
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    const [articles,setMyArticles] = useState([])
    const dispath = useDispatch()
    const Navigate = useNavigate()
   

    const toggleDropdown = () => {
        setIsDropdownOpen(!isDropdownOpen);
    };

    const handleOptionClick = (option) => {
        console.log(option); 
        setIsDropdownOpen(false); 
    };

    const fetchArticles = async()=>{
      try {

          const response = await axios.get(`https://url.fayisnambiyath.in/user/listarticles/${user._id}`,{
            headers: {
                Authorization: `Bearer ${token}`, // Attach token
            },
        })
          setMyArticles(response.data.articles)
          console.log(response.data.articles);
          
        
      } catch (error) {
        console.log(error);
        
        
      }
    }

    useEffect(()=>{
      fetchArticles()
      fetchArticles()
    },[])

    const Logout = ()=>{
      persistor.purge()
      dispath(logout())
      Navigate('/login')
    }


  return (
    <div className="flex flex-col min-h-screen bg-black">
       <header className="sticky top-0 z-50 bg-black/30 backdrop-blur-lg text-white px-4 md:px-6 py-4 flex items-center justify-between shadow-lg transition duration-300 ease-in-out">
            <div className="flex items-center gap-4">
                <a className="flex items-center gap-2" href="/">
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        className="w-6 h-6 text-primary-foreground"
                    >
                        <path d="m8 3 4 8 5-5 5 15H2L8 3z" />
                    </svg>
                    <span className="text-lg font-semibold text-primary-foreground">Article Hub</span>
                </a>
            </div>
            <div className="relative flex items-center gap-4">
                <span 
                    onClick={toggleDropdown} 
                    className="flex h-10 w-10 shrink-0 overflow-hidden rounded-full cursor-pointer"
                >
                    <img 
                        className="aspect-square h-full w-full object-cover" 
                        alt={user.firstName} 
                        src={user.profileUrl} 
                    />
                </span>
              
               
            </div>
            
            
        </header>
        

    <main className="flex-1 relative">
    {isDropdownOpen && (
        <div className="absolute right-0 mt-1 w-48 rounded-md shadow-lg bg-white/25 backdrop-blur-0 hover:bg-white/40 text-white ring-1 ring-black ring-opacity-5 z-20"> {/* Set a higher z-index */}
            <div className="py-1" role="menu" aria-orientation="vertical" aria-labelledby="options-menu">
                <Link to={'/profile'}>
                <button 
                   
                   className="block px-4 py-2 text-sm  text-white hover:bg-gray-100 hover:text-black  w-full text-left"
               >
                   Profile
               </button>
                </Link>
               <Link to={'/add'}>
               <button 
                    onClick={() => handleOpenModal()} 
                    className="block px-4 py-2 text-sm  text-white hover:bg-gray-100 hover:text-black w-full text-left"
                >
                    New Post
                </button>
               </Link>

                <Link to={'/myArticles'}>
                <button 
                   
                    className="block px-4 py-2 text-sm  text-white hover:bg-gray-100 hover:text-black  w-full text-left"
                >
                    My Articles
                </button>
                <hr />
                </Link>
             
                <button 
                  onClick={Logout}
                   
                    className="block px-4 py-2 text-sm  text-red-600 hover:bg-red-600 hover:text-white  w-full text-left"
                >
                    Log Out
                </button>
                
                
            </div>
        </div>
    )}
    <section className="relative w-full h-screen overflow-hidden">
      {/* Video Background */}
      <video
        className="absolute top-0 left-0 w-full h-full object-cover"
        src={'https://cdn.pixabay.com/video/2017/01/26/7529-201118756_large.mp4'}
        autoPlay
        loop
        muted
      ></video>

      {/* Content Overlay */}
      <div className="container px-4 md:px-6 py-12 md:py-16 relative z-10 text-white">
        <div className="grid gap-6 md:grid-cols-2 items-center">
        <div className="space-y-4">
  <h1 className="text-3xl md:text-4xl font-bold tracking-tight">
    Discover the Latest Insights and Trends
  </h1>
  <p className="md:text-lg">
    Explore our collection of thought-provoking articles, written by industry
    experts and visionaries.
  </p>
  {/* Buttons Section */}
  <div className="space-x-4 mt-6">
  <button className="px-6 py-3 rounded-full bg-white/15 backdrop-blur-0 hover:bg-white/40 text-white font-semibold shadow-md transition-all duration-300 ease-in-out">
  Explore More
</button>
    <Link to={'/add'}>
    <button className="px-6 py-3 rounded-full backdrop-blur-0 bg-white/70  hover:bg-gray-300 text-black font-semibold shadow-md transition-all duration-300 ease-in-out">
      Upload Post
    </button>
    </Link>
  </div>
</div>

          <img
            src="https://images.pexels.com/photos/7014337/pexels-photo-7014337.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
            width="600"
            height="400"
            alt="Hero"
            className="rounded-lg object-cover relative z-10"
            style={{ aspectRatio: "600 / 400", objectFit: "cover" }}
          />
        </div>
      </div>

      {/* Overlay Layer for Video Dim Effect */}
      <div className="absolute top-0 left-0 w-full h-full bg-black opacity-50"></div>
    </section>


      <section className="container px-4 md:px-6 py-12 md:py-16 bg-gray-200">
      <div className="mb-8 text-center">
    <h2 className="text-3xl md:text-4xl font-bold">Latest Blogs</h2>
    <p className="text-muted-foreground md:text-lg mt-2">
      Stay updated with our latest articles and trends in industrys.
    </p>
  </div>
  {
    articles.length == 0 ? (<p className="text-muted-foreground text-center md:text-lg mt-2">
      Stay tunded for latest articles 
    </p>) : ''
  }
        <div className="grid gap-6 lg:gap-6 md:grid-cols-2 lg:grid-cols-4 ">
          {
            articles.map((art)=>(
              <div className="max-w-sm bg-white border overflow-hidden   border-gray-200 rounded-lg shadow dark:bg-black dark:border-gray-700">
              <a href="/">
                  <img className="rounded-t-lg transition-all duration-300 ease-in-out hover:scale-105" src={art?.images.length > 0 ? art.images[0] : 'https://usbforwindows.com/storage/img/images_3/function_set_default_image_when_image_not_present.png'} alt="" />
              </a>
              <div className="p-5">
                  <a href="/">
                      <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">{art.articleName}</h5>
                  </a>
                  <p className="mb-3 font-normal text-gray-700 dark:text-gray-400 line-clamp-3">
                    {art.description}
                  </p>
              <Link to={`/Article/${art._id}`}>
              <a className="inline-flex transition-all duration-300 ease-in-out rounded-full items-center px-3 py-2 text-sm font-medium text-center  hover:bg-gray-500 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-white text-black dark:hover:bg-gray-300 dark:focus:ring-blue-800">
                      Read more
                      <svg className="rtl:rotate-180 w-3.5 h-3.5 ms-2" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 10">
                          <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M1 5h12m0 0L9 1m4 4L9 9" />
                      </svg>
                  </a>
              </Link>
                
              </div>
          </div>
            ))
          }
      
        
          
       
        </div>
      </section>
    </main>
    <footer className="bg-muted px-4 md:px-6 py-6 text-sm text-muted-foreground">
      <div className="container flex items-center justify-between">
        <p>© 2024 Article Hub. All rights reserved.</p>
      </div>
    </footer>
    
  </div>
  )
}

export default Dashboard

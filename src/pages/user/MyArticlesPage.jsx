import axios from 'axios';
import React, { useEffect, useState } from 'react'
import toast from 'react-hot-toast';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

const MyArticlesPage = () => {
    const { user } = useSelector((state) => state.auth);
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    const [myArticles,setMyArticles] = useState([])
   

    const toggleDropdown = () => {
        setIsDropdownOpen(!isDropdownOpen);
    };

    const handleOptionClick = (option) => {
        console.log(option); // Handle option selection here
        setIsDropdownOpen(false); // Close the dropdown after selection
    };


    const getUserArticles = async()=>{
        try {
            const response = await axios.get(`https://articlehub.moon-cart.shop/user/getarticles/${user._id}`)
            console.log(response.data);
            setMyArticles(response.data.userArticles)
            



        } catch (error) {
            
        }
    }

    useEffect(()=>{
        getUserArticles()
    },[])

    const likeArticle = async(artId)=>{
      try {

        const response = await axios.post(`https://articlehub.moon-cart.shop/user/like/${artId}/${user._id}`);
        console.log(response.data.message);
        getUserArticles()
        
        

        
      } catch (error) {
        console.log(error);
        
        
      }
    }
    const dislikeArticle = async(artId)=>{
      try {

        const response = await axios.post(`https://articlehub.moon-cart.shop/user/dislike/${artId}/${user._id}`);
        console.log(response.data.message);
        getUserArticles()
    
        
       

        
      } catch (error) {
        console.log(error);
        
        
      }
    }

    const deleteArticle = async(artId)=>{
      try {

        const response = await axios.post(`https://articlehub.moon-cart.shop/user/delete/${artId}`);
        getUserArticles()
        toast.success('article deleted',{
          duration:2000,
          position:'top-center'
        })
        
      } catch (error) {
        
      }
    }


  return (
    <>
     <header className="sticky top-0 z-50 bg-black text-white px-4 md:px-6 py-4 flex items-center justify-between shadow-lg transition duration-300 ease-in-out">
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
    <main className="container    sm:px-6 ">
    {isDropdownOpen && (
        <div className="absolute right-0 mt-1 w-48 rounded-md shadow-lg bg-white hover:bg-white/40 text-white ring-1 ring-black ring-opacity-5 z-20"> {/* Set a higher z-index */}
            <div className="py-1" role="menu" aria-orientation="vertical" aria-labelledby="options-menu">
                <Link to={'/profile'}>
                <button 
                   
                   className="block px-4 py-2 text-sm  text-black hover:bg-gray-100 hover:text-black  w-full text-left"
               >
                   Profile
               </button>
                </Link>
               <Link to={'/add'}>
               <button 
                    onClick={''} 
                    className="block px-4 py-2 text-sm text-black  hover:bg-gray-100 hover:text-black w-full text-left"
                >
                    New Post
                </button>
               </Link>

                <Link to={'/dashboard'}>
                <button 
                   
                    className="block px-4 py-2 text-sm  text-black hover:bg-gray-100 hover:text-black  w-full text-left"
                >
                    Go to Dasboard
                </button>
                </Link>
                
            </div>
        </div>
    )}
        
        <section className="container px-4 md:px-6 py-12 md:py-16 bg-white">
      <div className="mb-8 text-center">
    <h2 className="text-3xl md:text-4xl font-bold">My Blogs</h2>
    <p className="text-muted-foreground md:text-lg mt-2">
      Stay updated with our latest articles and trends in the tech industry.
    </p>
  </div>
        <div className="grid gap-6 lg:gap-6 md:grid-cols-2 lg:grid-cols-3 ">
    {
        myArticles.map((art)=>(
            <div className="bg-background bg-gray-200   rounded-lg shadow-lg overflow-hidden">
            <img
  alt="Article Image"
  width="600"
  height="400"
  src={art?.images.length > 0 ? art.images[0] : 'https://usbforwindows.com/storage/img/images_3/function_set_default_image_when_image_not_present.png'}
  style={{ aspectRatio: "600 / 400", objectFit: "cover" }}
  className="w-full h-48 object-cover"
/>

            <div className="p-6">
              <h2 className="text-2xl font-bold mb-2">{art.articleName}</h2>
              <p className="text-muted-foreground mb-4">
              {art.description}
              </p>
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center">
                  <img src={art?.createdBy?.profileUrl} alt="Author Avatar" className="w-8 h-8 rounded-full mr-2"  />
                  <span className="text-muted-foreground">   {art?.createdBy?.firstName}{art?.createdBy?.lastName}</span>
                </div>
                <span className="text-muted-foreground">Created By: {new Date(art?.createdAt).toLocaleDateString()}</span>
              </div>
              <hr className='mb-3' />

              <div className="flex items-center  justify-between">
                <div onClick={()=>likeArticle(art._id)} className="flex bg-black/25 hover:bg-black/80 p-1 rounded-lg hover:text-white  items-center">
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
                    className="w-5 h-5 mr-2 text-primary"
                  >
                    <path d="M7 10v12"></path>
                    <path d="M15 5.88 14 10h5.83a2 2 0 0 1 1.92 2.56l-2.33 8A2 2 0 0 1 17.5 22H4a2 2 0 0 1-2-2v-8a2 2 0 0 1 2-2h2.76a2 2 0 0 0 1.79-1.11L12 2h0a3.13 3.13 0 0 1 3 3.88Z"></path>
                  </svg>
                  <span>{art?.likes}</span>
                </div>
                <div onClick={()=>dislikeArticle(art._id)} className="flex bg-black/25 hover:bg-black/80 p-1 rounded-lg hover:text-white  items-center">
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
                    className="w-5 h-5 mr-2 text-muted"
                  >
                    <path d="M17 14V2"></path>
                    <path d="M9 18.12 10 14H4.17a2 2 0 0 1-1.92-2.56l2.33-8A2 2 0 0 1 6.5 2H20a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2h-2.76a2 2 0 0 0-1.79 1.11L12 22h0a3.13 3.13 0 0 1-3-3.88Z"></path>
                  </svg>
                  <span>{art?.dislikes}</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Link to={`/edit/${art._id}`}>
                  <button className="inline-flex bg-black/25 hover:bg-black/80 hover:text-white items-center justify-center whitespace-nowrap text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 border border-input bg-background hover:bg-accent hover:text-accent-foreground h-9 rounded-md px-3">
                    Edit
                  </button>
                  </Link>
                  
                  <button onClick={()=>deleteArticle(art._id)} className="inline-flex bg-black/25 hover:bg-black/80 hover:text-white items-center justify-center whitespace-nowrap text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 border border-input bg-background hover:bg-accent hover:text-accent-foreground h-9 rounded-md px-3">
                    Delete
                  </button>
             
                </div>
              </div>
            </div>
          </div>  
             
        ))

    }
       
        </div>
      </section>
 
</main>
<footer className="bg-muted bg-black text-white px-4 md:px-6 py-6 text-sm text-muted-foreground">
      <div className="container flex items-center justify-between">
        <p>© 2024 Article Hub. All rights reserved.</p>
      </div>
    </footer>
    </>
  )
}

export default MyArticlesPage

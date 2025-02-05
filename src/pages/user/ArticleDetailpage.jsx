import axios from 'axios'
import React, { useDebugValue, useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { Link, Navigate, useNavigate, useParams } from 'react-router-dom'
import Swal from 'sweetalert2'


const ArticleDetailpage = () => {
    const {artId} = useParams()
    const { user,token } = useSelector((state) => state.auth);
  
    const [article,setArticle] = useState({})
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    const Navigate = useNavigate()
    const toggleDropdown = () => {
        setIsDropdownOpen(!isDropdownOpen);
    };
    

    const fetchDetails = async()=>{
        try {

            const response = await axios.get(`https://url.fayisnambiyath.in/user/article/${artId}`,{
              headers: {
                  Authorization: `Bearer ${token}`, // Attach token
              },
          });
            setArticle(response.data.article)
            
        } catch (error) {
            console.log(error);
            
        }
    }

    useEffect(()=>{
        fetchDetails()
    },[])

    const [currentIndex, setCurrentIndex] = useState(0);

    // Handler to go to the next image
    const handleNext = () => {
      if (article.images && currentIndex < article.images.length - 1) {
        setCurrentIndex(currentIndex + 1);
      }
    };
  
    // Handler to go to the previous image
    const handlePrev = () => {
      if (article.images && currentIndex > 0) {
        setCurrentIndex(currentIndex - 1);
      }
    };


    const likeArticle = async()=>{
      try {

        const response = await axios.post(`https://url.fayisnambiyath.in/user/like/${artId}/${user._id}`,{
          headers: {
              Authorization: `Bearer ${token}`, // Attach token
          },
      });
        console.log(response.data.message);
        
        fetchDetails()

        
      } catch (error) {
        console.log(error);
        
        
      }
    }
    const dislikeArticle = async()=>{
      try {

        const response = await axios.post(`https://url.fayisnambiyath.in/user/dislike/${artId}/${user._id}`,{
          headers: {
              Authorization: `Bearer ${token}`, // Attach token
          },
      });
        console.log(response.data.message);
    
        
        fetchDetails()

        
      } catch (error) {
        console.log(error);
        
        
      }
    }

    const reportArticle = async()=>{
      Swal.fire({
        title: "Are you sure?",
        text: "You won't be able to see this!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes, Report it!"
      }).then( async(result) => {
        if (result.isConfirmed) {

          const response = await axios.post(`https://url.fayisnambiyath.in/user/report/${artId}/${user._id}`,{
            headers: {
                Authorization: `Bearer ${token}`, // Attach token
            },
        })
          Swal.fire({
            title: "Blocked!",
            text: "Article is Blocked",
            icon: "success"
          });

          setTimeout(() => {
              Navigate('/dashboard')
          }, 2000);

        }
      });
    }



  return (
    <>
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
        
    <div className="flex flex-col lg:px-10 min-h-[100dvh]">
    {isDropdownOpen && (
        <div className="absolute right-0 mt-1 w-48 rounded-md shadow-lg bg-white/55 backdrop-blur-0 hover:bg-white/40 text-white ring-1 ring-black ring-opacity-5 z-20"> {/* Set a higher z-index */}
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
                    onClick={() => handleOpenModal()} 
                    className="block px-4 py-2 text-sm  text-black hover:bg-gray-100 hover:text-black w-full text-left"
                >
                    New Post
                </button>
               </Link>
               <Link to={'/dashboard'}>
               <button 
                    onClick={() => handleOpenModal()} 
                    className="block px-4 py-2 text-sm  text-black hover:bg-gray-100 hover:text-black w-full text-left"
                >
                    Go to Dashboard
                </button>
               </Link>

                <Link to={'/myArticles'}>
                <button 
                   
                    className="block px-4 py-2 text-sm  text-black hover:bg-gray-100 hover:text-black  w-full text-left"
                >
                    My Articles
                </button>
                </Link>
                
            </div>
        </div>
    )}
  <header className="w-full bg-muted py-12 md:py-24 bg-gray-200 lg:py-32">
    <div className="container px-4 md:px-6">
      <div className="mx-auto max-w-3xl space-y-4 text-center">
      {article?.category?.map((cat)=>(
        <div className="inline-block bg-blue-200 rounded-full m-1 bg-primary px-3 py-1 text-sm font-medium text-primary-foreground">
         {cat}
        </div>
      ))}
        
        <h1 className="text-4xl font-bold tracking-tighter sm:text-5xl md:text-6xl">{article.articleName}</h1>
      </div>
      <div className="relative mx-auto mt-8 aspect-[2/1] w-full max-w-5xl overflow-hidden rounded-xl">
      {/* Image Container */}
      <img
        src={
          article.images?.length > 0
            ? article.images[currentIndex]
            : 'https://usbforwindows.com/storage/img/images_3/function_set_default_image_when_image_not_present.png'
        }
        width="1200"
        height="600"
        alt="Hero Image"
        className="w-full h-full object-cover rounded-xl"
      />

      {/* Previous Button */}
      {article.images?.length > 1 && (
        <button
          onClick={handlePrev}
          className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-gray-700 text-white p-2 px-3 rounded-full hover:bg-gray-900"
        >
          &lt;
        </button>
      )}

      {/* Next Button */}
      {article.images?.length > 1 && (
        <button
          onClick={handleNext}
          className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-gray-700 text-white p-2 px-3 rounded-full hover:bg-gray-900"
        >
          &gt;
        </button>
      )}
    </div>
  

    </div>
  </header>
  <main className="container grid grid-cols-1 gap-8 px-4 py-12 md:grid-cols-[3fr_1fr] md:gap-12 md:px-6 md:py-24">
    <div className="space-y-8">
      <div>
        <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl"> {article?.articleName}</h2>
        <p className="mt-4 text-muted-foreground ">
          {article?.description}
        </p>
      </div>
      
      <div>
       
       
      </div>
    </div>
    
    <div className="space-y-8">
      <div className="rounded-lg border bg-card text-card-foreground shadow-sm" data-v0-t="card">
        <div className="flex flex-col space-y-1.5 p-6">
          <h3 className="whitespace-nowrap text-2xl font-semibold leading-none tracking-tight">Article Details</h3>
        </div>
        <div className="p-6">
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-muted-foreground">Tags</span>
             
            </div>
            <div className="flex items-center justify-between">
              
              <div className="flex flex-wrap gap-2">
                {
                    article?.category?.map((cat)=>(
                        <div
                        className="inline-flex bg-green-500 w-fit items-center whitespace-nowrap rounded-full border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 border-transparent bg-secondary text-secondary-foreground hover:bg-secondary/80"
                        data-v0-t="badge"
                      >
                       {cat}
                      </div>
                    ))
                }
               
               
              
              </div>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-muted-foreground">Author</span>
              <span>{article?.createdBy?.firstName} {article?.createdBy?.lastName}</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-muted-foreground">Published</span>
              <span>{new Date(article?.createdAt).toLocaleDateString()}</span>
            </div>
          </div>
        </div>
      </div>
      <div className="space-y-8">
  <div className="rounded-lg border bg-card text-card-foreground shadow-sm" data-v0-t="card">
    <div className="flex flex-col space-y-1.5 p-6">
      <h3 className="whitespace-nowrap text-2xl font-semibold leading-none tracking-tight">Article Actions</h3>
    </div>
    <div className="p-6">
      <div className="space-y-4">
        {/* Button Container */}
        <div className="flex items-center justify-around">
          {/* Like Button */}
          <button
          onClick={likeArticle}
            className="inline-flex items-center p-3 rounded-full text-white bg-green-500 hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
            aria-label="Like"
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-thumbs-up">
              <path d="M7 10v12" />
              <path d="M15 5.88 14 10h5.83a2 2 0 0 1 1.92 2.56l-2.33 8A2 2 0 0 1 17.5 22H4a2 2 0 0 1-2-2v-8a2 2 0 0 1 2-2h2.76a2 2 0 0 0 1.79-1.11L12 2a3.13 3.13 0 0 1 3 3.88Z" />
            </svg>
            {article?.likes}
          </button>

          {/* Dislike Button */}
          <button
            onClick={dislikeArticle}
            className="inline-flex items-center p-3 rounded-full text-white bg-gray-500 hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
            aria-label="Dislike"
          >
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
              className="lucide lucide-thumbs-down"
            >
              <path d="M17 14V2" />
              <path d="M9 18.12 10 14H4.17a2 2 0 0 1-1.92-2.56l2.33-8A2 2 0 0 1 6.5 2H20a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2h-2.76a2 2 0 0 0-1.79 1.11L12 22a3.13 3.13 0 0 1-3-3.88Z" />
            </svg>
            {article?.dislikes}
          </button>

          {/* Block Button */}
          <button
          onClick={reportArticle}
            className="inline-flex items-center p-3 rounded-full text-white bg-red-500 hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500"
            aria-label="Block"
          >
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
              className="lucide lucide-circle-alert"
            >
              <circle cx="12" cy="12" r="10" />
              <line x1="12" x2="12" y1="8" y2="12" />
              <line x1="12" x2="12.01" y1="16" y2="16" />
            </svg>
          </button>
        </div>
      </div>
    </div>
  </div>
</div>

      
    </div>
  </main>
  <footer className="flex flex-col gap-2 sm:flex-row py-6 w-full shrink-0 items-center px-4 md:px-6 border-t">
    <p className="text-xs text-muted-foreground">© 2024 Acme Inc. All rights reserved.</p>
    <nav className="sm:ml-auto flex gap-4 sm:gap-6"></nav>
  </footer>
</div>
    </>
  )
}

export default ArticleDetailpage

import React from 'react'
import { useSelector } from 'react-redux';


const header = ({ toggleDropdown }) => {
    const { user } = useSelector((state) => state.auth);
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
    </>
  )
}

export default header

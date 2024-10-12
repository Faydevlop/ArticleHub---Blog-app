import React,{Suspense,lazy} from "react";
import { useSelector } from "react-redux";
import {Routes,Route,Navigate} from 'react-router-dom'
import EditArticle from "../pages/user/EditArticle";


const UserSignupPage = lazy(()=>import('../pages/user/Signin'))
const UserLoginpage = lazy(()=>import('../pages/user/Login'))
const UserDashboard = lazy(()=>import('../pages/user/Dashboard'))
const UserProfile = lazy(()=>import('../pages/user/UserProfile'))
const AddArticle = lazy(()=>import('../pages/user/AddArticle'))
const MyArticlesPage = lazy(()=>import('../pages/user/MyArticlesPage'))
const ArticleDetailpage = lazy(()=>import('../pages/user/ArticleDetailpage'))






const UserRoutes = () => {
  const { isAuthenticated } = useSelector((state) => state.auth);
  return (
    <Suspense fallback={<div>Loading...</div>} >
        <Routes>
            <Route path='signup' element={<UserSignupPage />} />  
            <Route path='login' element={<UserLoginpage />} />  
            <Route path='dashboard' element={isAuthenticated ? <UserDashboard /> : <Navigate to='/login' />} />  
            <Route path='profile' element={isAuthenticated ? <UserProfile /> : <Navigate to='/login' />} />  
            <Route path='add' element={isAuthenticated ? <AddArticle /> : <Navigate to='/login' />} />  
            <Route path='myArticles' element={isAuthenticated ? <MyArticlesPage /> : <Navigate to='/login' />} />  
            <Route path='Article/:artId' element={isAuthenticated ? <ArticleDetailpage /> : <Navigate to='/login' />} />  
            <Route path='edit/:articleId' element={isAuthenticated ? <EditArticle /> : <Navigate to='/login' />} />  


         
        </Routes>
    </Suspense>
  )
}

export default UserRoutes

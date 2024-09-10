import { Navigate, Route, Routes, useLocation } from 'react-router-dom';
import HomePage from '../pages/HomePage';
import DashboardPage from '../pages/DashboardPage';
import AuthPage from '../pages/AuthPage';
import AdminPage from '../pages/AdminPage';
import PageNotFound from '../pages/404';
import AdminUpdateUserPage from '../components/templates/AdminUpdateUserPage';
import AllUsersPage from '../components/templates/AllUsersPage'; 
import UserDetailsPage from '../components/templates/UserDetailsPage';
import UserProfilePage from '../components/templates/UserProfilePage';
import { useQuery } from '@tanstack/react-query';
import { getProfile } from '../services/user';
import Loader from '../components/modules/Loader';
import { useUser } from './UserContext';
import CategoryForm from '../components/templates/CategoryForm';
import AddPost from '../components/templates/AddPost';
import PostList from '../components/templates/PostList';
import DetailsPost from '../components/templates/DeatailsPost';
import SurveyPage from '../components/templates/SurveyPage';
import QuestionPage from '../components/templates/QuestionPage';
import SurveyDetailPage from '../components/templates/SurveyDetailPage';
import SurveysPage from '../components/templates/SurveysPage';
import ServicesPage from '../components/templates/ServicesPage';
import CartPage from '../components/templates/CartPage';

function Router() {
  const {data, isLoading, error} = useQuery(["profile"], getProfile)
  console.log({data, isLoading, error});
/*   if(isLoading === true) return <Loader />
 */ 
 const { userRole } = useUser();
 const location = useLocation();
 const showLoader = isLoading && location.pathname !== "/auth"
 if(showLoader){
  return <Loader />
 }


  return (
    <Routes>
    <Route path="/" element={data? <HomePage /> : <Navigate to="/auth" />} />
    <Route path="/services" element={data? <ServicesPage /> : <Navigate to="/auth" />} />
    <Route path="/surveys" element={data? <SurveysPage /> : <Navigate to="/auth" />} />
    <Route path="/auth" element={data ? <Navigate to="/" /> : <AuthPage />} /> 
    <Route path="/dashboard" element={data && data.data.role === "ADMIN" ? <DashboardPage /> : <Navigate  to="/" />} />
    <Route path="/admin" element={data && data?.data?.role === "ADMIN" ? <AdminPage /> : <Navigate to= "/" />} />
    <Route path="/admin/all-users" element={data?.data?.role === "ADMIN" ? <AllUsersPage /> : <Navigate to= "/" />} /> 
    <Route path="/admin/create-category" element={data?.data?.role === "ADMIN" ? <CategoryForm /> : <Navigate to= "/" />} /> 
    <Route path="/admin/create-post" element={data?.data?.role === "ADMIN" ? <AddPost />  : <Navigate to="/" />} />
    <Route path="/admin/post-list" element={data?.data?.role ==="ADMIN" ? <PostList /> : <Navigate to="/" /> } />
    <Route path="/admin/update-user/:userId" element={ data?.data?.role === "ADMIN" ? <AdminUpdateUserPage /> : <Navigate to= "/" /> } />
    <Route path="/profile" element={<UserProfilePage />} />
    <Route path="/user/:userId" element={data?.data?.role === "ADMIN" ? <UserDetailsPage /> : <Navigate to= "/" />} />
    <Route path= "/admin/survey-list" element={data?.data?.role === "ADMIN" ? <SurveyPage/> : <Navigate to = "/" />}/>
    <Route path= "/survey/:surveyId/questions" element={data?.data?.role === "ADMIN" ? <QuestionPage/> : <Navigate to = "/" />}/>
    <Route path= "/survey/:surveyId" element={data?.data?.role === "ADMIN" ? <SurveyDetailPage /> : <Navigate to = "/" />}/>
    <Route path="/post/:postId" element={<DetailsPost />} />
    <Route path="/cart" element={<CartPage />} />
    <Route path="*" element={<PageNotFound />} />
  </Routes>
  )
}

export default Router
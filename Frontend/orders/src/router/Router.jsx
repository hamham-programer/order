import { Navigate, Route, Routes } from 'react-router-dom';
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
function Router() {
  const {data, isLoading, error} = useQuery(["profile"], getProfile)
  console.log({data, isLoading, error});
  if(isLoading === true) return <Loader />
  const { userRole } = useUser();

  return (
    <Routes>
    <Route path="/" element={<HomePage />} />
    <Route path="/dashboard" element={data ? <DashboardPage /> : <Navigate  to="/auth" />} />
    <Route path="/auth" element={ <AuthPage />} />

 {/*    <Route path="/auth" element={data ? <Navigate to="/dashboard" /> : <AuthPage />} />  */}
    <Route path="/admin" element={data && data?.data?.role === "ADMIN" ? <AdminPage /> : <Navigate to= "/" />} />
    <Route path="/admin/all-users" element={data?.data?.role === "ADMIN" ? <AllUsersPage /> : <Navigate to= "/" />} /> 
    <Route path="/profile" element={<UserProfilePage />} />
    <Route path="/admin/update-user/:userId" element={ data?.data?.role === "ADMIN" ? <AdminUpdateUserPage /> : <Navigate to= "/" /> } />
    <Route path="/user/:userId" element={data?.data?.role === "ADMIN" ? <UserDetailsPage /> : <Navigate to= "/" />} />
    <Route path="*" element={<PageNotFound />} />
  </Routes>
  )
}

export default Router
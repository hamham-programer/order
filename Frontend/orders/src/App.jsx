import { BrowserRouter, Route, Routes } from 'react-router-dom';
import HomePage from './pages/HomePage';
import DashboardPage from './pages/DashboardPage';
import AuthPage from './pages/AuthPage';
import AdminPage from './pages/AdminPage';
import PageNotFound from './pages/404';
import AdminUpdateUserPage from './components/templates/AdminUpdateUserPage';
import AllUsersPage from './components/templates/AllUsersPage'; // اضافه کردن صفحه جدید
import UserDetailsPage from './components/templates/UserDetailsPage ';
import UserProfilePage from './components/templates/UserProfilePage ';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/dashboard" element={<DashboardPage />} />
        <Route path="/auth" element={<AuthPage />} />
        <Route path="/admin" element={<AdminPage />} />
        <Route path="/admin/all-users" element={<AllUsersPage />} /> 
        <Route path="/profile" element={<UserProfilePage />} />
        <Route path="/admin/update-user/:userId" element={<AdminUpdateUserPage />} />
        <Route path="/user/:userId" element={<UserDetailsPage />} />
        <Route path="*" element={<PageNotFound />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;

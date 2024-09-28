import { createContext, useContext, useState, useEffect } from 'react';
import { useQuery } from '@tanstack/react-query';
import { getProfile } from '../services/user';
import Loader from '../components/modules/Loader';

const UserContext = createContext();

export function UserProvider({ children }) {
  const { data } = useQuery(['profile'], getProfile);
  const [userRole, setUserRole] = useState(null);
  const [userId, setUserId] = useState(null);

  useEffect(() => {
    if (data) {
      setUserRole(data.data.role);
       setUserId(data.data.userId)
    }
  }, [data]);
  return (
    <UserContext.Provider value={{ userRole, userId }}>
      {children}
    </UserContext.Provider>
  );
}

export function useUser() {
  return useContext(UserContext);
}

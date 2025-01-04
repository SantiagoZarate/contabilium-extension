import { contabiliumApi } from '@/api/contabilium/api';
import React, { createContext, useState, useEffect, PropsWithChildren } from 'react';

type AuthContextState = {
  accessToken : string;
  getAccessToken : () => void,
  isLoggedIn : boolean
}

const AuthContext = createContext<AuthContextState | null>(null);

export const AuthProvider = ({ children } : PropsWithChildren) => {
  const [accessToken, setAccessToken] = useState<string>('');

  // Load token from localStorage on mount
  useEffect(() => {
    const storedToken = localStorage.getItem('access_token');
    if (storedToken) {
      setAccessToken(storedToken);
    } else {
      getAccessToken()
    }
  }, []);

  const getAccessToken = () => {
    contabiliumApi.getAccessToken().then(response => {
      if(response){
        setAccessToken(response)
      }
    });
  }

  return (
    <AuthContext.Provider value={{ accessToken, getAccessToken, isLoggedIn : accessToken !== null }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => React.useContext(AuthContext);

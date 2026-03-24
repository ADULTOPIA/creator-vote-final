import React, { createContext, useContext } from 'react';

export type AuthState = {
  /** Get the current auth token */
  getToken: () => string | null;
  /** Set the auth token (for testing/debugging) */
  setToken: (token: string | null) => void;
};

const AuthContext = createContext<AuthState | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const getToken = React.useCallback(() => {
    return localStorage.getItem('authToken');
  }, []);

  const setToken = React.useCallback((token: string | null) => {
    if (token) {
      localStorage.setItem('authToken', token);
    } else {
      localStorage.removeItem('authToken');
    }
  }, []);

  return (
    <AuthContext.Provider value={{ getToken, setToken }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = (): AuthState => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within AuthProvider');
  }
  return context;
};

import { createContext, useState, useEffect } from 'react';

export const AuthContext = createContext({
  isLoggedIn: false,
  login: () => {},
  logout: () => {},
});

// eslint-disable-next-line react/prop-types
export const AuthProvider = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(
    !!localStorage.getItem('userInfo')
  );

  useEffect(() => {
    setIsLoggedIn(!!localStorage.getItem('userInfo'));
  }, []);

  // user is entire user object. when user logs in, we store the user object in local storage
  const login = (user) => {
    localStorage.setItem('userInfo', JSON.stringify(user));
    localStorage.setItem(
      'summonerDetails',
      JSON.stringify(user.summonerDetails)
    );
    setIsLoggedIn(true);
  };

  const logout = () => {
    localStorage.removeItem('userInfo');
    localStorage.removeItem('followingStats');
    localStorage.removeItem('summonerDetails');
    setIsLoggedIn(false);
  };

  const userInfo = JSON.parse(localStorage.getItem('userInfo'));

  return (
    <AuthContext.Provider value={{ isLoggedIn, login, logout, userInfo }}>
      {children}
    </AuthContext.Provider>
  );
};

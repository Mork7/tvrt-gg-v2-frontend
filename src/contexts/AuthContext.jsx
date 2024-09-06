import { createContext, useState, useEffect } from 'react';

export const AuthContext = createContext({
  isLoggedIn: false,
  login: () => {},
  logout: () => {},
  isAdmin: false,
});

// eslint-disable-next-line react/prop-types
export const AuthProvider = ({ children }) => {
  // isLoggedIn is a boolean that checks if the user is logged in or not
  const [isLoggedIn, setIsLoggedIn] = useState(
    !!localStorage.getItem('userInfo')
  );
  // isAdmin is a boolean that checks if the user is an admin or not
  const [isAdmin, setIsAdmin] = useState(false);

  // useEffect is a hook that runs after the first render and after every update
  useEffect(() => {
    setIsLoggedIn(!!localStorage.getItem('userInfo'));
    const adminStatus = localStorage.getItem('isAdmin');
    setIsAdmin(adminStatus === 'true');
  }, []);

  // user is entire user object. when user logs in, we store the user object in local storage
  const login = (user) => {
    const { isAdmin, _id, ...rest } = user;
    localStorage.setItem('userInfo', JSON.stringify(rest));
    localStorage.setItem(
      'summonerDetails',
      JSON.stringify(user.summonerDetails)
    );

    // This is secure, only set isAdmin if user is admin, so no other users can see that they are admin or not. Unless they get hold of the JavaScript code.
    if (isAdmin) {
      localStorage.setItem('isAdmin', JSON.stringify(user.isAdmin));
    }

    // if user is logged in, set isLoggedIn to true
    setIsLoggedIn(true);
    // if user is admin, set isAdmin to true
    setIsAdmin(user.isAdmin);
  };

  // when user logs out, we remove the user object from local storage
  const logout = () => {
    localStorage.removeItem('userInfo');
    localStorage.removeItem('followingStats');
    localStorage.removeItem('summonerDetails');
    localStorage.removeItem('isAdmin');
    setIsLoggedIn(false);
    setIsAdmin(false);
  };

  // get the user object from local storage
  const userInfo = JSON.parse(localStorage.getItem('userInfo'));

  return (
    <AuthContext.Provider
      value={{ isLoggedIn, login, logout, userInfo, isAdmin }}
    >
      {children}
    </AuthContext.Provider>
  );
};

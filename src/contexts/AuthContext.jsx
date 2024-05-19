import { createContext, useState, useEffect } from 'react';
import SummonerDetails from '../components/SummonerDetails';

export const AuthContext = createContext({
  isLoggedIn: false,
  login: () => {},
  logout: () => {}
});

// eslint-disable-next-line react/prop-types
export const AuthProvider = ({ children }) => {
    const [isLoggedIn, setIsLoggedIn] = useState(!!localStorage.getItem('userInfo'));

    useEffect(() => {
        setIsLoggedIn(!!localStorage.getItem('userInfo'));
    }, []);

    const login = (data) => {
        localStorage.setItem('userInfo', JSON.stringify(data));
        localStorage.setItem('summonerDetails', JSON.stringify(data.summonerDetails));
        setIsLoggedIn(true);
    };

    const logout = () => {
        localStorage.removeItem('userInfo');
        localStorage.removeItem('followingStats');
        setIsLoggedIn(false);
    };

    const userInfo = JSON.parse(localStorage.getItem('userInfo'));

    return (
        <AuthContext.Provider value={{ isLoggedIn, login, logout, userInfo }}>
            {children}
        </AuthContext.Provider>
    );
};

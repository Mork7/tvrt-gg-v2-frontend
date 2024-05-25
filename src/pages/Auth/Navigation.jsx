import { useNavigate, useLocation } from 'react-router-dom';
import { toast } from 'react-toastify';
import { Avatar, Dropdown, Navbar, Button } from 'flowbite-react';
import { AuthContext } from '../../contexts/AuthContext';
import { useContext } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { FaSearch } from 'react-icons/fa';
import { SlUserFollowing } from 'react-icons/sl';
import { MdPersonalVideo } from 'react-icons/md';
import { useState } from 'react';

const Navigation = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const isActive = (path) => location.pathname === path;

  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const { isLoggedIn, logout, userInfo, isAdmin } = useContext(AuthContext);

  const logoutHandler = () => {
    if (isLoggedIn && userInfo) {
      axios
        .post(
          `${import.meta.env.VITE_BACKEND_BASE_URI}/users/logout`,
          {},
          {
            withCredentials: true, // Include credentials (cookies)
          }
        )
        .then(() => {
          logout(); // Clear user info and auth state
          toast.success('Logged out successfully');
          navigate('/login'); // Navigate to login page
        })
        .catch((error) => {
          console.error(
            'Logout error:',
            error.response || error.message || error
          );
          toast.error('Error logging out');
        });
    } else {
      console.warn('User is not logged in or userInfo is missing');
    }
  };

  const clickProfileHandler = () => {
    isLoggedIn ? navigate('/profile') : navigate('/login');
  };

  const clickDashboardHandler = () => {
    isLoggedIn && isAdmin ? navigate('/admin/dashboard') : navigate('/login');
  };

  return (
    <Navbar fluid className="bg-gray-800 text-white h-19 p-3">
      <Link href="/" className="text-5xl font-semibold">
        TVRT<span className="text-purple-500 font-bold">GAMING</span>
      </Link>

      {/* Nav buttons */}
      <Navbar.Collapse className="mr-28">
        <Navbar.Link
          href="/search"
          className={`text-xl flex justify-center items-center ${
            isActive('/search') ? 'text-purple-500' : ''
          }`}
        >
          Search
          <FaSearch className="ml-2" />
        </Navbar.Link>
        <Navbar.Link
          href="/following"
          className={`text-xl flex justify-center items-center ${
            isActive('/following') ? 'text-purple-500' : ''
          }`}
        >
          Leaderboard
          <SlUserFollowing className="ml-2" />
        </Navbar.Link>
        <Navbar.Link
          href="/streams"
          className={`text-xl flex justify-center items-center ${
            isActive('/streams') ? 'text-purple-500' : ''
          }`}
        >
          Streams
          <MdPersonalVideo className="ml-2" />
        </Navbar.Link>
      </Navbar.Collapse>

      {/* User Dropdown if logged in, else Register button */}
      {!isLoggedIn ? (
        <Button
          onClick={() => navigate('/login')}
          className={`${isActive('/login') ? 'ring-2 ring-teal-300' : ''}`}
          color={'purple'}
        >
          Login
        </Button>
      ) : (
        // DROP DOWN
        <div className="flex md:order-2">
          <p
            className={`self-center mr-3 hover:text-purple-500 cursor-pointer ${
              isDropdownOpen ? 'text-purple-500' : ''
            }`}
          >
            {userInfo?.name}
          </p>
          <div onClick={() => setIsDropdownOpen(!isDropdownOpen)}>
            <Dropdown
              arrowIcon={false}
              inline
              label={<Avatar alt="User settings" rounded />}
              className="bg-gray-600"
              show={isDropdownOpen}
            >
              <Dropdown.Header className=" text-black">
                {/* Username */}
                <span className="block text-lg">{userInfo?.name}</span>
                {/* Email */}
                <span className="block truncate text-lg font-medium">
                  {userInfo?.email}
                </span>
              </Dropdown.Header>
              {/* TODO If isAdmin, they have a dashboard */}
              {isAdmin && (
                <Dropdown.Item
                  onClick={clickDashboardHandler}
                  className=" text-black text-lg"
                >
                  Dashboard
                </Dropdown.Item>
              )}
              <Dropdown.Item
                onClick={clickProfileHandler}
                className=" text-black text-lg"
              >
                Profile
              </Dropdown.Item>
              <Dropdown.Divider />
              {/* If logged in display logout button */}
              {isLoggedIn && (
                <Dropdown.Item
                  onClick={logoutHandler}
                  className=" text-black text-lg"
                >
                  Logout
                </Dropdown.Item>
              )}
            </Dropdown>
          </div>
        </div>
      )}
    </Navbar>
  );
};

export default Navigation;

import { useNavigate, useLocation } from 'react-router-dom';
import { toast } from 'react-toastify';
import { Avatar, Dropdown, Navbar, Button } from 'flowbite-react';
import { AuthContext } from '../../contexts/AuthContext';
import { useContext } from 'react';
import axios from 'axios';

const Navigation = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const isActive = (path) => location.pathname === path;

  const { isLoggedIn, logout, userInfo } = useContext(AuthContext);

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
        .then((response) => {
          logout(); // Clear user info and auth state
          console.log('Logout successful:', response.data);
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
    isLoggedIn && userInfo.isAdmin
      ? navigate('/admin/dashboard')
      : navigate('/login');
  };

  return (
    <Navbar fluid rounded className="bg-gray-800 text-white h-16 p-3 ">
      <span className="text-3xl font-semibold">TVRT.GG</span>

      {/* Nav buttons */}
      <Navbar.Collapse>
        <Navbar.Link href="/" active={isActive('/')} className="text-xl">
          Home
        </Navbar.Link>
        <Navbar.Link
          href="/following"
          active={isActive('/following')}
          className="text-xl"
        >
          Following
        </Navbar.Link>
        <Navbar.Link
          href="/friends"
          active={isActive('/friends')}
          className="text-xl"
        >
          Friends
        </Navbar.Link>
      </Navbar.Collapse>

      {/* User Dropdown if logged in, else Register button */}
      {!isLoggedIn ? (
        <Button
          onClick={() => navigate('/login')}
          className={`${isActive('/login') ? 'ring-2 ring-teal-300' : ''}`}
        >
          Login
        </Button>
      ) : (
        <div className="flex md:order-2">
          <Dropdown
            arrowIcon={false}
            inline
            label={<Avatar alt="User settings" rounded />}
            className='bg-gray-600'
          >
            <Dropdown.Header className=' text-black'>
              {/* Username */}
              <span className="block text-lg">{userInfo?.name}</span>
              {/* Email */}
              <span className="block truncate text-lg font-medium">
                {userInfo?.email}
              </span>
            </Dropdown.Header>
            {/* TODO If isAdmin, they have a dashboard */}
            {userInfo?.isAdmin && (
              <Dropdown.Item onClick={clickDashboardHandler} className=' text-black text-lg'>
                Dashboard
              </Dropdown.Item>
            )}
            <Dropdown.Item onClick={clickProfileHandler} className=' text-black text-lg'>Profile</Dropdown.Item>
            <Dropdown.Divider />
            {/* If logged in display logout button */}
            {isLoggedIn && (
              <Dropdown.Item onClick={logoutHandler} className=' text-black text-lg'>Logout</Dropdown.Item>
            )}
          </Dropdown>
        </div>
      )}
    </Navbar>
  );
};

export default Navigation;

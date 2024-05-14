import { useNavigate, useLocation } from 'react-router-dom';
import { toast } from 'react-toastify';
import { Avatar, Dropdown, Navbar, Button } from 'flowbite-react';
import { useState } from 'react';

const Navigation = () => {
  // TODO: Implement login and logout handlers AND WE NEED USER INFO
  const navigate = useNavigate();
  const location = useLocation();
  const isActive = (path) => location.pathname === path;

  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const loginHandler = () => {
    try {
      setIsLoggedIn(true);
      navigate('/');
    } catch (error) {
      toast.error('Error logging in');
    }
  };

  const logoutHandler = () => {
    try {
      setIsLoggedIn(false);
      navigate('/');
    } catch (error) {
      toast.error('Error logging out');
    }
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
          href="/leaderboard"
          active={isActive('/leaderboard')}
          className="text-xl"
        >
          Leaderboard
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
          onClick={() => navigate('/register')}
          className={`${isActive('/register') ? 'ring-2 ring-teal-300' : ''}`}
        >
          Register
        </Button>
      ) : (
        <div className="flex md:order-2">
          <Dropdown
            arrowIcon={false}
            inline
            label={<Avatar alt="User settings" rounded />}
          >
            <Dropdown.Header>
              {/* Username */}
              <span className="block text-sm">Bonnie Green</span>
              {/* Email */}
              <span className="block truncate text-sm font-medium">
                name@flowbite.com
              </span>
            </Dropdown.Header>
            {/* TODO If isAdmin, they have a dashboard */}
            <Dropdown.Item>Dashboard</Dropdown.Item>
            {/* TODO */}
            <Dropdown.Item>Profile</Dropdown.Item>
            <Dropdown.Divider />
            {/* TODO If user is not logged in switch to login */}
            {isLoggedIn ? (
              <Dropdown.Item onClick={logoutHandler}>Logout</Dropdown.Item>
            ) : (
              <Dropdown.Item onClick={loginHandler}>Login</Dropdown.Item>
            )}
          </Dropdown>
        </div>
      )}
    </Navbar>
  );
};

export default Navigation;

import { useNavigate, useLocation } from 'react-router-dom';
import { toast } from 'react-toastify';
import { Avatar, Dropdown, Navbar, Button } from 'flowbite-react';
import { AuthContext } from '../../contexts/AuthContext';
import { useContext } from 'react';

const Navigation = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const isActive = (path) => location.pathname === path;

  const { isLoggedIn, logout, userInfo } = useContext(AuthContext);

  const logoutHandler = () => {
    if (isLoggedIn) {
      try {
        logout();
        toast.success('Logged out successfully');
        navigate('/login');
      } catch (error) {
        toast.error('Error logging out');
      }
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
          >
            <Dropdown.Header>
              {/* Username */}
              <span className="block text-sm">{userInfo?.name}</span>
              {/* Email */}

              <span className="block truncate text-sm font-medium">
                {userInfo?.email}{' '}
              </span>
            </Dropdown.Header>
            {/* TODO If isAdmin, they have a dashboard */}
            <Dropdown.Item>Dashboard</Dropdown.Item>
            {/* TODO */}
            <Dropdown.Item>Profile</Dropdown.Item>
            <Dropdown.Divider />
            {/* TODO If user is not logged in switch to login */}
            {isLoggedIn && (
              <Dropdown.Item onClick={logoutHandler}>Logout</Dropdown.Item>
            )}
          </Dropdown>
        </div>
      )}
    </Navbar>
  );
};

export default Navigation;

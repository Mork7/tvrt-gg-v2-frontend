import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { Avatar, Dropdown, Navbar } from 'flowbite-react';

const Navigation = () => {

  const navigate = useNavigate();

  const loginHandler = () => {

    navigate('/');
  };
  const logoutHandler = () => {};

  return (
    <Navbar fluid rounded className="bg-gray-800 text-white h-16 p-3">
      <span className="text-2xl font-semibold dark:text-white">TVRT.GG</span>

      {/* Nav buttons */}
      <Navbar.Collapse>
        <Navbar.Link href="/" active>
          Home
        </Navbar.Link>
        <Navbar.Link href="/leaderboard">Leaderboard</Navbar.Link>
        <Navbar.Link href="/friends">Friends</Navbar.Link>
      </Navbar.Collapse>

      {/* User dropdown */}
      <div className="flex md:order-2">
        <Dropdown
          arrowIcon={false}
          inline
          label={
            <Avatar
              alt="User settings"
              img="https://flowbite.com/docs/images/people/profile-picture-5.jpg"
              rounded
            />
          }
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
          <Dropdown.Item onClick={loginHandler}>Login</Dropdown.Item>
          <Dropdown.Item onClick={logoutHandler}>Logout</Dropdown.Item>
        </Dropdown>
      </div>
    </Navbar>
  );
};

export default Navigation;

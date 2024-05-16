import { Button } from 'flowbite-react';
import { useState, useContext } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router';
import { AuthContext } from '../../contexts/AuthContext';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const { isLoggedIn, login } = useContext(AuthContext);

  const navigate = useNavigate();

  const onLoginHandler = (e) => {
    e.preventDefault();

    if (isLoggedIn) {
      toast.error('Already logged in');
      return;
    }

    axios
      .post(
        `${import.meta.env.VITE_BACKEND_BASE_URI}/users/login`,
        {
          email: email,
          password: password,
        },
        {
          withCredentials: true, // Include credentials (cookies)
        }
      )
      .then((response) => {
        console.log(response.data);
        login(response.data);
        toast.success('Logged in successfully');
        navigate('/');
      })
      .catch((error) => {
        console.error('An error occurred:', error.response);
        toast.error('Error logging in');
      });
  };

  return (
    <section className="flex justify-center">
      <div>
        <h1 className="font-semibold text-3xl mb-3">Login</h1>
        <form
          onSubmit={onLoginHandler}
          className="flex flex-col space-y-3 w-[30rem]"
        >
          <label htmlFor="email">Email</label>
          <input
            type="email"
            id="email"
            className="rounded-md bg-gray-400 focus:ring-2 focus:ring-teal-600"
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            className="rounded-md bg-gray-400 focus:ring-2 focus:ring-teal-600"
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <div className="flex justify-between">
            <Button color="failure" type="reset">
              Reset
            </Button>
            <Button type="submit">Login</Button>
          </div>
        </form>
        <p className="text-center">
          Don&apos;t have an account?{' '}
          <a
            className="text-teal-300 cursor-pointer hover:underline"
            href="/register"
          >
            Register
          </a>
        </p>
      </div>
      <div className="h-[51.5rem] w-[80rem] ml-12 rounded-lg flex justify-center p-4">
        <img
          src="https://s1.picswalls.com/wallpapers/2015/11/21/beautiful-league-of-legends-wallpaper_111229615_289.jpg"
          alt="Baron Nashor"
          className="rounded-lg w-full"
        />
      </div>
    </section>
  );
};

export default Login;

import { Button } from 'flowbite-react';
import { useState, useContext } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router';
import { AuthContext } from '../../contexts/AuthContext';
import Region from '../../components/Region';

const Register = () => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [summonerName, setSummonerName] = useState('');
  const [tag, setTag] = useState('');
  const [region, setRegion] = useState('');
  const { login } = useContext(AuthContext);

  const navigate = useNavigate();

  // make call to backend to register user
  const onSubmitHandler = (e) => {
    // gotta hook up our backend here
    e.preventDefault();

    const regexPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

    if (!regexPattern.test(email.trim())) {
      toast.error('Invalid email');
      return;
    }

    if (password === confirmPassword) {
      axios
        .post(`${import.meta.env.VITE_BACKEND_BASE_URI}/users/register`, {
          name: username.trim(),
          email: email.trim(),
          password: password,
          summonerDetails: {
            summonerName: summonerName.trim(),
            tag: tag.trim(),
            region: region,
          },
        })
        .then(() => {
          toast.success('User registered successfully');
          navigate('/');
        })
        .catch((err) => {
          toast.error(err.response?.data?.message || 'Error registering user');
          console.error(err);
        })
        // if successful, log the user in
        .finally(() => {
          axios
            .post(
              `${import.meta.env.VITE_BACKEND_BASE_URI}/users/login`,
              {
                email: email,
                password: password,
              },
              {
                withCredentials: true, // Include credentials (our jwt cookie)
              }
            )
            .then((response) => {
              login(response.data);
              navigate('/');
            })
            .catch((error) => {
              console.error('An error occurred:', error.response);
              toast.error('Error logging in');
            });
        });
    } else {
      toast.error('Passwords do not match');
    }
  };

  return (
    <section className="flex justify-center">
      <div>
        <h1 className="font-semibold text-4xl mb-3">Register</h1>
        <form
          onSubmit={onSubmitHandler}
          className="flex flex-col space-y-3 w-[30rem]"
        >
          <label htmlFor="username">Username</label>
          <input
            type="text"
            id="username"
            className="w-full p-2 rounded-lg focus:ring-4 focus:ring-purple-700"
            onChange={(e) => setUsername(e.target.value)}
            required
            placeholder="Username"
          />
          <label htmlFor="email">Email</label>
          <input
            type="email"
            id="email"
            className="w-full p-2 rounded-lg focus:ring-4 focus:ring-purple-700"
            onChange={(e) => setEmail(e.target.value)}
            required
            placeholder="Email Address"
          />
          <label htmlFor="username">Password</label>
          <input
            type="password"
            id="password"
            className="w-full p-2 rounded-lg focus:ring-4 focus:ring-purple-700"
            onChange={(e) => setPassword(e.target.value)}
            required
            placeholder="Password"
          />
          <label htmlFor="confirmPassword">Re-enter Password</label>
          <input
            type="password"
            id="confirmPassword"
            className="w-full p-2 rounded-lg focus:ring-4 focus:ring-purple-700"
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
            placeholder="Re-type Password"
          />
          <h2 className="font-semibold text-2xl">Add Your Summoner Info</h2>
          <label htmlFor="summonerName" className="font-semibold">
            Summoner Name
          </label>
          <input
            type="text"
            id="summonerName"
            className="w-full p-2 rounded-lg focus:ring-4 focus:ring-purple-700"
            onChange={(e) => setSummonerName(e.target.value)}
            required
            placeholder="Summoner Name"
          />
          <label htmlFor="tag" className="font-semibold">
            Tag
          </label>
          <input
            type="text"
            id="tag"
            className="w-full p-2 rounded-lg focus:ring-4 focus:ring-purple-700"
            onChange={(e) => setTag(e.target.value)}
            required
            maxLength={4}
            placeholder='Do not add the "#"'
          />
          <Region setRegion={setRegion} />
          <div className="flex justify-between">
            <Button color="failure" type="reset">
              Reset
            </Button>
            <Button type="submit" className="pb-1" color={'purple'}>
              Submit
            </Button>
          </div>
        </form>
      </div>
      <div className="h-[51.5rem] w-[80rem] ml-12 rounded-lg flex justify-center p-4">
        <img
          src="https://images.unsplash.com/photo-1633545491399-54a16aa6a871?q=80&w=2072&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
          alt="War Room"
          className="rounded-lg w-full"
        />
      </div>
    </section>
  );
};

export default Register;

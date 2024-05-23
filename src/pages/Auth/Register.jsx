import { Button } from 'flowbite-react';
import { useState, useContext } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router';
import { AuthContext } from '../../contexts/AuthContext';

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
        <h1 className="font-semibold text-3xl mb-3">Register</h1>
        <form
          onSubmit={onSubmitHandler}
          className="flex flex-col space-y-3 w-[30rem]"
        >
          <label htmlFor="username">Username</label>
          <input
            type="text"
            id="username"
            className="rounded-md bg-gray-400 focus:ring-2 focus:ring-teal-600"
            onChange={(e) => setUsername(e.target.value)}
            required
          />
          <label htmlFor="email">Email</label>
          <input
            type="email"
            id="email"
            className="rounded-md bg-gray-400 focus:ring-2 focus:ring-teal-600"
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <label htmlFor="username">Password</label>
          <input
            type="password"
            id="password"
            className="rounded-md bg-gray-400 focus:ring-2 focus:ring-teal-600"
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <label htmlFor="confirmPassword">Re-enter Password</label>
          <input
            type="password"
            id="confirmPassword"
            className="rounded-md bg-gray-400 focus:ring-2 focus:ring-teal-600"
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
          />
          <h2 className="font-semibold  text-2xl">Add Your Summoner Info</h2>
          <label htmlFor="summonerName">Summoner Name</label>
          <input
            type="text"
            id="summonerName"
            className="rounded-md bg-gray-400 focus:ring-2 focus:ring-teal-600"
            onChange={(e) => setSummonerName(e.target.value)}
            required
          />
          <label htmlFor="tag">Tag</label>
          <input
            type="text"
            id="tag"
            className="rounded-md bg-gray-400 focus:ring-2 focus:ring-teal-600"
            onChange={(e) => setTag(e.target.value)}
            required
            maxLength={4}
            placeholder='Do not include the "#"'
          />
          <div className="flex justify-between space-x-4">
            <div>
              <div>
                <label htmlFor="na" className="mr-3">
                  North America
                </label>
                <input
                  name="region"
                  type="radio"
                  id="na"
                  className="rounded-md bg-gray-400 focus:ring-2 focus:ring-teal-600"
                  required
                  value={'na'}
                  onChange={(e) => setRegion(e.target.value)}
                />
              </div>
              <div>
                <label htmlFor="euw" className="mr-3">
                  Europe West
                </label>
                <input
                  name="region"
                  type="radio"
                  id="euw"
                  className="rounded-md bg-gray-400 focus:ring-2 focus:ring-teal-600"
                  required
                  value={'euw'}
                  onChange={(e) => setRegion(e.target.value)}
                />
              </div>
              <div>
                <label htmlFor="eune" className="mr-3">
                  Europe East/Nordic
                </label>
                <input
                  name="region"
                  type="radio"
                  id="eune"
                  className="rounded-md bg-gray-400 focus:ring-2 focus:ring-teal-600"
                  required
                  value={'eune'}
                  onChange={(e) => setRegion(e.target.value)}
                />
              </div>
              <div>
                <label htmlFor="oce" className="mr-3">
                  Oceania
                </label>
                <input
                  name="region"
                  type="radio"
                  id="oce"
                  className="rounded-md bg-gray-400 focus:ring-2 focus:ring-teal-600"
                  required
                  value={'oce'}
                  onChange={(e) => setRegion(e.target.value)}
                />
              </div>
              <div>
                <label htmlFor="ru" className="mr-3">
                  Russia
                </label>
                <input
                  name="region"
                  type="radio"
                  id="ru"
                  className="rounded-md bg-gray-400 focus:ring-2 focus:ring-teal-600"
                  required
                  value={'ru'}
                  onChange={(e) => setRegion(e.target.value)}
                />
              </div>
              <div>
                <label htmlFor="kr" className="mr-3">
                  Korea
                </label>
                <input
                  name="region"
                  type="radio"
                  id="kr"
                  className="rounded-md bg-gray-400 focus:ring-2 focus:ring-teal-600"
                  required
                  value={'kr'}
                  onChange={(e) => setRegion(e.target.value)}
                />
              </div>
            </div>
            <div>
              <div>
                <label htmlFor="jp" className="mr-3">
                  Japan
                </label>
                <input
                  name="region"
                  type="radio"
                  id="jp"
                  className="rounded-md bg-gray-400 focus:ring-2 focus:ring-teal-600"
                  required
                  value={'jp'}
                  onChange={(e) => setRegion(e.target.value)}
                />
              </div>
              <div>
                <label htmlFor="br" className="mr-3">
                  Brazil
                </label>
                <input
                  name="region"
                  type="radio"
                  id="br"
                  className="rounded-md bg-gray-400 focus:ring-2 focus:ring-teal-600"
                  required
                  value={'br'}
                  onChange={(e) => setRegion(e.target.value)}
                />
              </div>
              <div>
                <label htmlFor="lan" className="mr-3">
                  Latin America North
                </label>
                <input
                  name="region"
                  type="radio"
                  id="lan"
                  className="rounded-md bg-gray-400 focus:ring-2 focus:ring-teal-600"
                  required
                  value={'lan'}
                  onChange={(e) => setRegion(e.target.value)}
                />
              </div>
              <div>
                <label htmlFor="vn" className="mr-3">
                  Vietnam
                </label>
                <input
                  name="region"
                  type="radio"
                  id="vn"
                  className="rounded-md bg-gray-400 focus:ring-2 focus:ring-teal-600"
                  required
                  value={'vn'}
                  onChange={(e) => setRegion(e.target.value)}
                />
              </div>
              <div>
                <label htmlFor="th" className="mr-3">
                  Thailand
                </label>
                <input
                  name="region"
                  type="radio"
                  id="th"
                  className="rounded-md bg-gray-400 focus:ring-2 focus:ring-teal-600"
                  required
                  value={'th'}
                  onChange={(e) => setRegion(e.target.value)}
                />
              </div>
              <div>
                <label htmlFor="tw" className="mr-3">
                  Taiwan
                </label>
                <input
                  name="region"
                  type="radio"
                  id="tw"
                  className="rounded-md bg-gray-400 focus:ring-2 focus:ring-teal-600"
                  required
                  value={'tw'}
                  onChange={(e) => setRegion(e.target.value)}
                />
              </div>
            </div>
          </div>
          <div className="flex justify-between">
            <Button color="failure" type="reset">
              Reset
            </Button>
            <Button type="submit">Submit</Button>
          </div>
        </form>
      </div>
      <div className="h-[51.5rem] w-[80rem] ml-12 rounded-lg flex justify-center p-4 border">
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

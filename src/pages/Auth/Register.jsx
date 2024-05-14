import { Button } from 'flowbite-react';
import { useState } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router';

const Register = () => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  
  const navigate = useNavigate();

  const onSubmitHandler = (e) => {
    // gotta hook up our backend here
    e.preventDefault();
    
    const regexPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    
    if (!regexPattern.test(email)) {
      toast.error('Invalid email');
      return;
    }

    if (password === confirmPassword) {
      axios
        .post('http://localhost:5000/users/register', {
          name: username,
          email: email,
          password: password,
        })
        .then((res) => {
          toast.success('User registered successfully');
          console.log(res);
          navigate('/')
        })
        .catch((err) => {
          toast.error(err.response?.data?.message || 'Error registering user');
          console.error(err);
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
          <div className="flex justify-between">
            <Button color="failure" type="reset">
              Reset
            </Button>
            <Button type="submit">Submit</Button>
          </div>
        </form>
      </div>
      <div>
        <img
          src="https://images.unsplash.com/photo-1633545491399-54a16aa6a871?q=80&w=2072&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
          alt="War Room"
          className="h-[51.5rem] ml-12 rounded-lg"
        />
      </div>
    </section>
  );
};

export default Register;

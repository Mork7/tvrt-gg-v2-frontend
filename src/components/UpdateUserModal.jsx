import { Button } from 'flowbite-react';
import { useState } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';

// eslint-disable-next-line react/prop-types
const UpdateUserModal = ({ onClose, userId, onUpdateUser }) => {
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');

  const onSubmitHandler = async (e) => {
    e.preventDefault();
    try {
      const updatedUser = { email: email, name: name };

      console.log(updatedUser);
      const { data } = await axios.put(
        `${import.meta.env.VITE_BACKEND_BASE_URI}/users/${userId}`,
        updatedUser,
        { withCredentials: true }
      );

      toast.success('Updated user...');
      onUpdateUser(data);
      onClose();
    } catch (error) {
      console.error(`Error updating user: ${error.message}`);
      toast.error('Error updating user');
    }
  };

  return (
    <div className="fixed inset-0 z-40 flex items-center justify-center bg-black bg-opacity-50">
      <form
        onSubmit={onSubmitHandler}
        className="flex flex-col space-y-3 w-[40rem] mt-5 border p-3 rounded-md fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-gray-800 z-50"
      >
        <label htmlFor="email">Email</label>
        <input
          type="email"
          id="email"
          className="rounded-md bg-gray-400 focus:ring-2 focus:ring-teal-600"
          onChange={(e) => setEmail(e.target.value)}
        />
        <label htmlFor="username">Username</label>
        <input
          type="text"
          id="username"
          className="rounded-md bg-gray-400 focus:ring-2 focus:ring-teal-600"
          onChange={(e) => setName(e.target.value)}
        />
        <div className="flex justify-between">
          <Button color="failure" onClick={onClose}>
            Close
          </Button>
          <Button type="submit" className='pb-1'>Submit</Button>
        </div>
      </form>
    </div>
  );
};

export default UpdateUserModal;

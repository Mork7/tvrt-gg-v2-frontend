import { Button } from 'flowbite-react';
import { useState } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
import Region from './Region';

// eslint-disable-next-line react/prop-types
const FollowingModal = ({ onClose, onAddSummoner }) => {
  const [summonerName, setSummonerName] = useState('');
  const [tag, setTag] = useState('');
  const [region, setRegion] = useState('');

  // adding a follower to the following array
  const onSubmitHandler = async (e) => {
    e.preventDefault();
    try {
      const newSummoner = { summonerName, tag, region };

      await axios.put(
        `${import.meta.env.VITE_BACKEND_BASE_URI}/users/following`,
        newSummoner,
        { withCredentials: true }
      );

      toast.warn('Adding summoner...');
      onAddSummoner(newSummoner);
      onClose();
    } catch (error) {
      console.error(`Error following summoner: ${error.message}`);
      toast.error('Already following that summoner');
    }
  };

  return (
    <div className="fixed inset-0 z-40 flex items-center justify-center bg-black bg-opacity-50 font-semibold">
      <form
        onSubmit={onSubmitHandler}
        className="flex flex-col space-y-3 w-[40rem] mt-5 border p-3 rounded-md fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-gray-800 z-50"
      >
        <label htmlFor="name">Summoner Name</label>
        <input
          type="text"
          id="name"
          className="w-full p-2 rounded-lg focus:ring-4 focus:ring-purple-700"
          onChange={(e) => setSummonerName(e.target.value)}
          required
          placeholder="Summoner Name"
        />
        <label htmlFor="tag">Tag</label>
        <input
          type="text"
          id="tag"
          className="w-full p-2 rounded-lg focus:ring-4 focus:ring-purple-700"
          onChange={(e) => setTag(e.target.value)}
          maxLength={5}
          required
          placeholder='Do not add the "#"'
        />
        <Region setRegion={setRegion} />
        <div className="flex justify-between">
          <Button color="failure" onClick={onClose}>
            Close
          </Button>
          <Button type="submit" className="pb-1 bg-purple-700">
            Submit
          </Button>
        </div>
      </form>
    </div>
  );
};

export default FollowingModal;

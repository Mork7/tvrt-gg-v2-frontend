import { Button } from 'flowbite-react';
import { useState } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';

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
    <div className="fixed inset-0 z-40 flex items-center justify-center bg-black bg-opacity-50">
      <form
        onSubmit={onSubmitHandler}
        className="flex flex-col space-y-3 w-[40rem] mt-5 border p-3 rounded-md fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-gray-800 z-50"
      >
        <label htmlFor="name">Summoner Name</label>
        <input
          type="text"
          id="name"
          className="rounded-md bg-gray-400 focus:ring-2 focus:ring-teal-600"
          onChange={(e) => setSummonerName(e.target.value)}
          required
          placeholder="Summoner Name"
        />
        <label htmlFor="tag">Tag</label>
        <input
          type="text"
          id="tag"
          className="rounded-md bg-gray-400 focus:ring-2 focus:ring-teal-600"
          onChange={(e) => setTag(e.target.value)}
          maxLength={4}
          required
          placeholder='Do not add the "#"'
        />
        <label className="font-semibold">Region</label>

        {/* Radio buttons */}
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
          <Button color="failure" onClick={onClose}>
            Close
          </Button>
          <Button type="submit">Submit</Button>
        </div>
      </form>
    </div>
  );
};

export default FollowingModal;

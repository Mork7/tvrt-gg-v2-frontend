import axios from 'axios';
import { useEffect, useState } from 'react';
import { useContext } from 'react';
import { AuthContext } from '../../contexts/AuthContext';
import { toast } from 'react-toastify';
import { Button } from 'flowbite-react';
import SummonerDetails from '../../components/SummonerDetails';
import { getPlayerRank } from '../../utils/leagueApi';
import { Spinner } from 'flowbite-react';

const Profile = () => {
  const { isLoggedIn } = useContext(AuthContext);
  const [userProfile, setUserProfile] = useState(null);
  const [editMode, setEditMode] = useState(false);
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [summoner, setSummoner] = useState(
    localStorage.getItem('summonerDetails')
      ? JSON.parse(localStorage.getItem('summonerDetails'))
      : null
  );
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const getUserProfile = async () => {
      if (isLoggedIn) {
        try {
          const user = await axios.get(
            `${import.meta.env.VITE_BACKEND_BASE_URI}/users/profile`,
            { withCredentials: true }
          );
          setUserProfile(user.data);
        } catch (error) {
          console.error(`Error fetching user profile: ${error.message}`);
          toast.error(`Error fetching user profile: ${error.message}`);
        }
      } else {
        console.error('User not logged in');
      }
    };
    getUserProfile();
  }, [isLoggedIn]);

  useEffect(() => {
    if (userProfile?.summonerDetails) {
      setSummoner(userProfile.summonerDetails);
    }
  }, [userProfile]);

  useEffect(() => {
    const fetchPlayerRank = async () => {
      if (summoner.summonerName && summoner.tag && summoner.region) {
        setIsLoading(true);
        try {
          const data = await getPlayerRank(
            summoner.summonerName,
            summoner.tag,
            summoner.region
          )
          // JSON parse returns an array of objects, we only need the first object
          setSummoner(data[0]);
        } catch (error) {
          toast.error(`Error fetching player rank: ${error.message}`);
        } finally {
          setIsLoading(false);
        }
      }
    };
    fetchPlayerRank();
  }, [summoner]);

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
        .put(
          `${import.meta.env.VITE_BACKEND_BASE_URI}/users/profile`,
          {
            name: username,
            email: email,
            password: password,
          },
          { withCredentials: true }
        )
        .then((res) => {
          toast.success('Updated successfully');
          console.log(res);
        })
        .catch((err) => {
          toast.error(err.response?.data?.message || 'Error updating user');
          console.error(err);
        });
    } else {
      toast.error('Passwords do not match');
    }
  };

  return (
    <section className="flex justify-between">
      {/* Info Section */}
      <div className="w-[20rem]">
        {/* Update Button */}
        <div className="flex items-center space-x-3">
          <h1 className="font-semibold text-3xl mb-3">User Profile</h1>
          <Button className="mb-2" onClick={() => setEditMode(!editMode)}>
            Update User Info
          </Button>
        </div>

        {userProfile &&
          (editMode ? (
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
          ) : (
            // Form for updating
            // Display user info
            <div className="space-y-3">
              <h2 className="font-semibold text-xl">
                Username: {userProfile?.name}
              </h2>
              <h2 className="font-semibold text-xl">
                Email: {userProfile?.email}
              </h2>

              {/* Friends */}
              <h2 className="font-semibold text-xl">
                Friends: {userProfile?.friends?.length === 0 && 0}
              </h2>
              {userProfile?.friends?.map((summoner, index) => (
                <p key={index}>
                  &emsp;
                  <span className="font-semibold">
                    {summoner?.summonerName}{' '}
                  </span>
                  <span className="text-yellow-500">
                    {' '}
                    #{summoner?.tag.toUpperCase()}
                  </span>
                </p>
              ))}

              {/* Following */}
              <h2 className="font-semibold text-xl">
                Following: {userProfile.following.length === 0 && 0}
              </h2>
              {userProfile?.following?.map((summoner, index) => (
                <p key={index}>
                  &emsp;
                  <span className="font-semibold">
                    {summoner?.summonerName}{' '}
                  </span>
                  <span className="text-yellow-500">
                    {' '}
                    #{summoner?.tag.toUpperCase()}
                  </span>
                </p>
              ))}
            </div>
          ))}
      </div>
      {/* Image Section */}
      <div className="h-[51.5rem] w-[80rem] ml-12 rounded-lg border flex justify-center p-4">
        {/* Summoner Profile Tile*/}
        {isLoading ? (
          <div className="self-center">
            <Spinner aria-label="Extra large spinner example" size="xl" />
          </div>
        ) : summoner ? (
          <SummonerDetails summoner={summoner} />
        ) : (
          <img
            src="https://images7.alphacoders.com/536/536426.png"
            alt="Yasuo"
          />
        )}
      </div>
    </section>
  );
};

export default Profile;

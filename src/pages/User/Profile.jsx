import axios from 'axios';
import { useEffect, useState } from 'react';
import { useContext } from 'react';
import { AuthContext } from '../../contexts/AuthContext';
import { toast } from 'react-toastify';
import { Button } from 'flowbite-react';
import SummonerDetails from '../../components/SummonerDetails';
import { getPlayerRank } from '../../utils/leagueApi';
import { Spinner } from 'flowbite-react';
import Region from '../../components/Region';

const Profile = () => {
  const { isLoggedIn } = useContext(AuthContext);
  const [userProfile, setUserProfile] = useState(null);
  const [isEditMode, setIsEditMode] = useState(false);
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [summonerDetails, setSummonerDetails] = useState(
    localStorage.getItem('summonerDetails')
      ? JSON.parse(localStorage.getItem('summonerDetails'))
      : null
  );
  const [isLoading, setIsLoading] = useState(false);
  const [summonerName, setSummonerName] = useState('');
  const [tag, setTag] = useState('');
  const [region, setRegion] = useState('');

  // Fetch user profile
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

  // Set summoner details
  useEffect(() => {
    if (userProfile?.summonerDetails) {
      setSummonerDetails(userProfile.summonerDetails);
    }
  }, [userProfile]);

  // Fetch player rank from summoner details
  useEffect(() => {
    const fetchPlayerRank = async () => {
      if (
        summonerDetails.summonerName &&
        summonerDetails.tag &&
        summonerDetails.region
      ) {
        setIsLoading(true);
        try {
          const data = await getPlayerRank(
            summonerDetails.summonerName,
            summonerDetails.tag,
            summonerDetails.region
          );
          // JSON parse returns an array of objects, we only need the first object
          setSummonerDetails(data[0]);
        } catch (error) {
          toast.error(
            `Error fetching player rank, please check summoner details`
          );
        } finally {
          setIsLoading(false);
        }
      }
    };
    fetchPlayerRank();
  }, [summonerDetails]);

  // update user profile
  const onSubmitHandler = (e) => {
    e.preventDefault();
    // Email regex pattern
    const regexPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

    // Check if email is valid
    if (email && !regexPattern.test(email)) {
      toast.error('Invalid email');
      return;
    }

    // Check if password and confirm password match
    if (password && confirmPassword) {
      if (password !== confirmPassword) {
        toast.error('Passwords do not match');
        return;
      }
    }

    // Update user data
    const updateData = {
      name: username.trim() || userProfile.name,
      email: email.trim() || userProfile.email,
      password: password || undefined,
      summonerDetails:
        summonerName || tag || region
          ? {
              summonerName:
                summonerName.trim() || userProfile.summonerDetails.summonerName,
              tag: tag || userProfile.summonerDetails.tag,
              region: region || userProfile.summonerDetails.region,
            }
          : userProfile.summonerDetails,
    };

    axios
      .put(
        `${import.meta.env.VITE_BACKEND_BASE_URI}/users/profile`,
        updateData,
        { withCredentials: true }
      )
      .then(() => {
        setSummonerDetails(updateData.summonerDetails);
        localStorage.setItem(
          'summonerDetails',
          JSON.stringify(updateData.summonerDetails)
        );

        // eslint-disable-next-line no-unused-vars
        const { password, ...rest } = updateData;
        const userInfo = JSON.parse(localStorage.getItem('userInfo'));
        localStorage.setItem(
          'userInfo',
          JSON.stringify({ ...userInfo, ...rest })
        );
        toast.success('Updated successfully');
      })
      .catch((err) => {
        toast.error(err.response?.data?.message || 'Error updating user');
        console.error(err);
      });
  };

  // Reset form fields
  const handleReset = () => {
    setUsername('');
    setEmail('');
    setPassword('');
    setConfirmPassword('');
    setSummonerName('');
    setTag('');
    setRegion('');
  };

  return (
    <section className="flex justify-between">
      {/* Info Section */}
      <div className="w-[20rem]">
        {/* Update Button */}
        <div className="flex items-center space-x-3">
          <h1 className="font-semibold text-3xl mb-3">User Profile</h1>
          <Button
            className="mb-2 "
            color={'purple'}
            onClick={() => setIsEditMode(!isEditMode)}
          >
            Update User Info
          </Button>
        </div>
        {userProfile &&
          (isEditMode ? (
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
              />
              <label htmlFor="email" className="font-semibold">
                Email
              </label>
              <input
                type="email"
                id="email"
                className="rounded-md bg-gray-400 focus:ring-2 focus:ring-teal-600"
                onChange={(e) => setEmail(e.target.value)}
              />
              <label htmlFor="username" className="font-semibold">
                Password
              </label>
              <input
                type="password"
                id="password"
                className="rounded-md bg-gray-400 focus:ring-2 focus:ring-teal-600"
                onChange={(e) => setPassword(e.target.value)}
              />
              <label htmlFor="confirmPassword">Re-enter Password</label>
              <input
                type="password"
                id="confirmPassword"
                className="rounded-md bg-gray-400 focus:ring-2 focus:ring-teal-600"
                onChange={(e) => setConfirmPassword(e.target.value)}
              />
              <div className="flex justify-between">
                <Button color="failure" type="reset" onClick={handleReset}>
                  Reset
                </Button>
                <Button type="submit" color={'purple'}>Submit</Button>
              </div>
              <h2 className="font-semibold  text-2xl">
                Edit Your Summoner Info
              </h2>
              <label htmlFor="summonerName">Summoner Name</label>
              <input
                type="text"
                id="summonerName"
                className="rounded-md bg-gray-400 focus:ring-2 focus:ring-teal-600"
                onChange={(e) => setSummonerName(e.target.value)}
              />
              <label htmlFor="tag">Tag</label>
              <input
                type="text"
                id="tag"
                className="rounded-md bg-gray-400 focus:ring-2 focus:ring-teal-600"
                onChange={(e) => setTag(e.target.value)}
                maxLength={4}
              />
              {/* Region selection */}
              <Region setRegion={setRegion} />
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
              {/* Friends
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
              ))} */}
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
        ) : summonerDetails ? (
          <SummonerDetails summoner={summonerDetails} />
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

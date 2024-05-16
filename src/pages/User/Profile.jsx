import axios from 'axios';
import { useEffect, useState } from 'react';
import { useContext } from 'react';
import { AuthContext } from '../../contexts/AuthContext';
import { toast } from 'react-toastify';

const Profile = () => {
  const { isLoggedIn } = useContext(AuthContext);
  const [userProfile, setUserProfile] = useState({});

  useEffect(() => {
    const getUserProfile = async () => {
      if (isLoggedIn) {
        try {
          const user = await axios.get(
            `${import.meta.env.VITE_BACKEND_BASE_URI}/users/profile`,
            { withCredentials: true }
          );
          setUserProfile(user.data);
          toast.success('User profile fetched successfully');
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

  console.log(userProfile);

  return (
    <div>
      <h1 className="font-semibold text-3xl mb-3">User Profile</h1>
      <div>
        <h2 className="font-semibold text-xl">Username: {userProfile.name}</h2>
        <h2 className="font-semibold text-xl">Email: {userProfile.email}</h2>
        <h2 className="font-semibold text-xl">
          Friends: {userProfile.friends}
        </h2>
        <h2 className="font-semibold text-xl">
          Following:{' '}
          {userProfile?.following?.map((summoner, index) => (
            <p key={index}>{summoner.summonerName}</p>
          ))}
        </h2>
      </div>
    </div>
  );
};

export default Profile;

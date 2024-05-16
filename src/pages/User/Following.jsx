import axios from 'axios';
import { useContext, useEffect, useState, useRef } from 'react';
import { AuthContext } from '../../contexts/AuthContext';
import { useNavigate } from 'react-router-dom';
import { getPlayerRank } from '../../utils/leagueApi';

const Leaderboard = () => {
  const navigate = useNavigate();

  const { isLoggedIn } = useContext(AuthContext);
  const [followingStats, setFollowingStats] = useState([]);
  const hasFetched = useRef(false); // useRef to track if data has been fetched

  useEffect(() => {
    const fetchUserFollowing = async () => {
      if (isLoggedIn && !hasFetched.current) {
        hasFetched.current = true;
        try {
          const response = await axios.get(
            `${import.meta.env.VITE_BACKEND_BASE_URI}/users/following`,
            {
              withCredentials: true, // Include credentials (cookies)
            }
          );
          const following = response.data;

          // Fetch player stats for each user in the following list
          const statsPromises = following.map((user) =>
            getPlayerRank(user.summonerName, user.tag, user.region)
          );

          const stats = await Promise.all(statsPromises);
          setFollowingStats(...stats);
        } catch (error) {
          console.error('An error occurred:', error.response || error.message);
        }
      }
    };

    if (isLoggedIn) {
      fetchUserFollowing();
    }
  }, [isLoggedIn]);

  console.log(followingStats);
  return (
    <div>
      {!isLoggedIn ? (
        <h1 className="text-center text-3xl">
          To render this leaderboard, you must be{' '}
          <a
            className="text-teal-300 cursor-pointer hover:underline"
            href="/login"
          >
            logged in
          </a>{' '}
          and following the users you wish to compare.
        </h1>
      ) : (
        <div>
          <h1 className="text-center text-3xl">Leaderboard</h1>
          <table className='border'>
            <thead className='border'>
              <tr>
                <td className='border p-3'>
                  Summoner Name
                </td>
                <td className='border p-3'>
                  Rank
                </td>
                <td className='border p-3'>
                  Win-Loss Ratio
                </td>
                <td className='border p-3'>
                  Win Percentage
                </td>
              </tr>
            </thead>
            <tbody>
              {followingStats.map((user, index) => (
                <tr key={index}>
                  <td className='border p-3'>{user?.username}</td>
                  <td className='border p-3'> {user?.rank} </td>
                  <td className='border p-3'>{user?.winLossRatio}</td>
                  <td className='border p-3'> {user?.winPercentage}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default Leaderboard;

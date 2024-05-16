import axios from 'axios';
import { useContext, useEffect, useState, useRef } from 'react';
import { AuthContext } from '../../contexts/AuthContext';
import { getPlayerRank } from '../../utils/leagueApi';
import { Spinner } from 'flowbite-react';
import { toast } from 'react-toastify';
import FollowingForm from '../../components/FollowingForm';

const Leaderboard = () => {
  const { isLoggedIn } = useContext(AuthContext);
  const [followingStats, setFollowingStats] = useState(null);
  const hasFetched = useRef(false); // useRef to track if data has been fetched
  const [isLoading, setIsLoading] = useState(true);

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
          const flattenedStats = stats.flat();
          setFollowingStats(flattenedStats);
          setIsLoading(false);
          toast.success('Fetched stats successfully');
        } catch (error) {
          console.error('An error occurred:', error.response || error.message);
          toast.error('Error fetching stats');
        }
      }
    };

    if (isLoggedIn) {
      fetchUserFollowing();
    }
  }, [isLoggedIn]);

  const selectRankImage = (rank) => {
    const imagePathDict = {
      unranked: './unranked.png',
      iron: './iron.webp',
      bronze: './bronze.webp',
      silver: './silver.webp',
      gold: './gold.webp',
      platinum: './platinum.webp',
      emerald: './emerald.webp',
      diamond: './diamond.webp',
      master: './master.webp',
      grandmaster: './grandmaster.webp',
      challenger: './challenger.webp',
    };

    switch (true) {
      case rank?.toLowerCase().includes('unranked'):
        return imagePathDict.unranked;
      case rank?.toLowerCase().includes('iron'):
        return imagePathDict.iron;
      case rank?.toLowerCase().includes('bronze'):
        return imagePathDict.bronze;
      case rank?.toLowerCase().includes('silver'):
        return imagePathDict.silver;
      case rank?.toLowerCase().includes('gold'):
        return imagePathDict.gold;
      case rank?.toLowerCase().includes('platinum'):
        return imagePathDict.platinum;
      case rank?.toLowerCase().includes('emerald'):
        return imagePathDict.emerald;
      case rank?.toLowerCase().includes('diamond'):
        return imagePathDict.diamond;
      case rank?.toLowerCase().includes('grand'):
        return imagePathDict.grandmaster;
      case rank?.toLowerCase().includes('master'):
        return imagePathDict.master;
      case rank?.toLowerCase().includes('challenger'):
        return imagePathDict.challenger;
      default:
        // Handle cases where no match is found
        return undefined;
    }
  };

  return (
    <>
      <div className="flex flex-col items-center w-full">
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
        ) : isLoading ? (
          <>
            <h1>Fetching following table...</h1>
            <Spinner className="mt-56" size={'xl'} />
          </>
        ) : (
          <div className="flex flex-col space-y-5 w-full">
            <h1 className="text-center text-5xl font-semibold">Following</h1>
            {/* OUR TABLE */}
            <table className="border text-2xl">
              <thead className="border">
                <tr className="font-semibold">
                  <td className="border p-3">Summoner Name</td>
                  <td className="border p-3">Rank</td>
                  <td className="border p-3">Win-Loss Ratio</td>
                  <td className="border p-3">Win Percentage</td>
                </tr>
              </thead>
              <tbody>
                {followingStats?.map((user, index) => (
                  <tr key={index}>
                    <td className="border p-3">
                      {user?.username.split('-')[0] +
                        ' #' +
                        user?.username.split('-')[1].toUpperCase()}
                    </td>
                    <td className="border p-3 flex ">
                      <img
                        src={`${selectRankImage(user?.rank)}`}
                        alt="rank"
                        className="mr-2 w-10"
                      />
                      {user?.rank}{' '}
                    </td>
                    <td className="border p-3">{user?.winLossRatio}</td>
                    <td className="border p-3"> {user?.winPercentage}</td>
                  </tr>
                ))}
              </tbody>
            </table>
            {/* OUR FORM TO ADD SUMMONERS WE'D LIKE TO FOLLOW */}
          </div>
        )}
        {/* form should be visible whether or not user is following anyone */}
      </div>
      <FollowingForm />
    </>
  );
};

export default Leaderboard;

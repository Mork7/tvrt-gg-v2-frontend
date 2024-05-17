import { useContext, useEffect, useState } from 'react';
import { AuthContext } from '../../contexts/AuthContext';
import { getPlayerRank } from '../../utils/leagueApi';
import { Spinner, Button } from 'flowbite-react';
import { toast } from 'react-toastify';
import FollowingModal from '../../components/FollowingModal';

const Following = () => {
  const { isLoggedIn } = useContext(AuthContext);
  const [followingStats, setFollowingStats] = useState(
    JSON.parse(localStorage.getItem('followingStats')) || []
  );
  const [isLoading, setIsLoading] = useState(true);
  const userInfo = JSON.parse(localStorage.getItem('userInfo'));
  const [showAddSummoner, setShowAddSummoner] = useState(false);

  useEffect(() => {
    const fetchFollowingStats = async () => {
      try {
        const { following } = userInfo;

        // Fetch player stats for each user in the following list
        const statsPromises = following.map((user) =>
          getPlayerRank(user.summonerName, user.tag, user.region)
        );

        // await for all the player stats to be fetched
        const stats = await Promise.all(statsPromises);
        // flatten the array of arrays to get the objects
        const flattenedStats = stats.flat();
        // update the state with the fetched stats
        setFollowingStats(flattenedStats);
        // update the local storage with the fetched stats
        localStorage.setItem('followingStats', JSON.stringify(flattenedStats));
        // notify the user that the stats have been fetched
        toast.success('Fetched summoners stats successfully');
      } catch (error) {
        console.error(`Error fetching following stats: ${error.message}`);
        toast.error(`Error fetching following stats: ${error.message}`);
      } finally {
        setIsLoading(false); // Ensure loading state is updated
      }
    };


    // if the following stats array is empty that means there is nothing local storage so we fetch
    if (isLoggedIn && followingStats.length === 0) {
      fetchFollowingStats();
    } else {
      setIsLoading(false);
    }
  }, [isLoggedIn, followingStats.length, userInfo]);

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

  const onClose = () => {
    setShowAddSummoner(false);
  };

  // if a summoner is added to the following list from the modal
  const handleAddSummoner = async (newSummoner) => {
    try {
      // Fetch the new summoner's stats
      const newStats = await getPlayerRank(
        newSummoner.summonerName,
        newSummoner.tag,
        newSummoner.region
      );  

      // Ensure the stats are properly formatted
      const updatedStats = [...followingStats, ...newStats];
      
      // Update the local storage with the new summoner's stats
      localStorage.setItem('followingStats', JSON.stringify(updatedStats));
      // Update the followingStats array with the new summoner's stats, this will cause a re-render and the stats will be pulled from local storage
      setFollowingStats(updatedStats);
      // Notify the user that the new summoner's stats have been fetched
      toast.success('Fetched new summoner stats successfully');
    } catch (error) {
      console.error(`Error fetching new summoner stats: ${error.message}`);
      toast.error(`Error fetching new summoner stats: ${error.message}`);
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
            <Spinner className="my-10" size={'xl'} />
          </>
        ) : (
          <div className="flex flex-col space-y-5 w-full">
            <h1 className="text-center text-5xl font-semibold">
              <span>{userInfo.name}&apos;s Boys</span>
            </h1>
            {/* OUR TABLE */}
            <table className="border text-2xl">
              <thead className="border">
                <tr className="font-semibold">
                  <td className="border p-3 flex justify-between">
                    Summoner Name{' '}
                    <Button
                      onClick={() => setShowAddSummoner(!showAddSummoner)}
                      style={{ color: 'white', width: '3rem', height: '2rem' }}
                      className="flex justify-center items-center"
                    >
                      <span className="text-5xl">+</span>
                    </Button>
                  </td>
                  <td className="border p-3">Rank</td>
                  <td className="border p-3">Win-Loss Ratio</td>
                  <td className="border p-3">Win Percentage</td>
                </tr>
              </thead>
              <tbody>
                {followingStats?.map((user, index) => (
                  <tr key={index}>
                    <td className="border p-3">
                      {user?.username?.split('-')[0] +
                        ' #' +
                        user?.username?.split('-')[1].toUpperCase()}
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
      </div>
      {/* form should be visible whether or not user is following anyone */}
      {showAddSummoner && (
        <FollowingModal onClose={onClose} onAddSummoner={handleAddSummoner} />
      )}
    </>
  );
};

export default Following;

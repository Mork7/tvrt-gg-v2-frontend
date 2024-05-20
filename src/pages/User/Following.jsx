import { useContext, useEffect, useState } from 'react';
import { AuthContext } from '../../contexts/AuthContext';
import { getPlayerRank } from '../../utils/leagueApi';
import { Spinner, Button } from 'flowbite-react';
import { toast } from 'react-toastify';
import FollowingModal from '../../components/FollowingModal';
import selectRankImage from '../../utils/selectRankImage';
import axios from 'axios';

const Following = () => {
  // Declarations
  const { isLoggedIn } = useContext(AuthContext);
  const [followingStats, setFollowingStats] = useState(
    JSON.parse(localStorage.getItem('followingStats')) || []
  );
  const [isLoading, setIsLoading] = useState(true);
  const userInfo = JSON.parse(localStorage.getItem('userInfo'));
  const [showAddSummoner, setShowAddSummoner] = useState(false);
  const [mayNotExist, setMayNotExist] = useState([]);

  useEffect(() => {
    /**
     * Fetch the stats of the summoners that the current user is following.
     * Updates the following stats in localStorage and state upon successful fetch.
     * Notifies the user of the result via toast notifications.
     * @returns {Promise<void>}
     */
    const fetchFollowingStats = async () => {
      try {
        // Get the following list from the user's information
        const { following } = userInfo;

        // Fetch player stats for each user in the following list
        const statsPromises = following.map((user) =>
          getPlayerRank(user.summonerName, user.tag, user.region)
        );

        // await for all the player stats to be fetched
        const stats = await Promise.allSettled(statsPromises);

        // Collect the names of the summoners that don't exist
        const rejectedSummoners = stats
          .filter((result) => result.status === 'rejected')
          .map(
            (result) =>
              result.reason.params.name.split('-')[0] +
              ' #' +
              result.reason.params.name.split('-')[1].toUpperCase()
          );
        // Update the state with the summoners that may not exist
        setMayNotExist(rejectedSummoners);

        // Notify the user of the summoners that may not exist
        if (rejectedSummoners.length > 0) {
          toast.error(
            `The following summoners may not exist: ${rejectedSummoners.join(
              ', '
            )}`
          );
        }
        // filter out the fulfilled promises
        const fulfilledSummoners = stats
          .filter((result) => result.status === 'fulfilled')
          .map((result) => result.value);
        // flatten the array of arrays to get the objects
        const flattenedStats = fulfilledSummoners.flat();
        // update the state with the fetched stats
        setFollowingStats(flattenedStats);
        // update the local storage with the fetched stats
        localStorage.setItem('followingStats', JSON.stringify(flattenedStats));
        // notify the user that the stats have been fetched
        toast.success('Fetched summoners stats successfully');
      } catch (error) {
        // notify the user that there was an error fetching the stats
        console.error(`Error fetching following stats: ${error.message}`);
        toast.error('Error fetching stats');
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

  /**
   * Close the modal for adding a new summoner.
   */
  const onClose = () => {
    setShowAddSummoner(false);
  };

  /**
   * Add a new summoner to the user's following list in the database and localStorage.
   * Updates the following stats and user information in localStorage upon successful addition.
   * Notifies the user of the result via toast notifications.
   * @param {Object} newSummoner
   * @param {String} newSummoner.summonerName - The summoner's name.
   * @param {String} newSummoner.tag - The summoner's tag.'
   * @param {String} newSummoner.region - The summoner's region.
   * @returns {Promise<void>} - A promise that resolves when the summoner has been added.
   */
  const handleAddSummoner = async (newSummoner) => {
    try {
      // Fetch the new summoner's stats
      const newStats = await getPlayerRank(
        newSummoner.summonerName,
        newSummoner.tag,
        newSummoner.region
      );

      if (newStats) {
        const updatedStats = [...followingStats, ...newStats];

        // Update the local storage with the new summoner's stats
        localStorage.setItem('followingStats', JSON.stringify(updatedStats));
        // Update the followingStats array with the new summoner's stats, causing a re-render and pulling stats from local storage
        setFollowingStats(updatedStats);

        const updatedUserInfo = {
          ...userInfo,
          following: [...userInfo.following, newSummoner],
        };
        localStorage.setItem('userInfo', JSON.stringify(updatedUserInfo));

        // Notify the user that the new summoner's stats have been fetched
        toast.success('Added new summoner successfully');
      }
    } catch (error) {
      if (error.message === "Summoner doesn't exist") {
        const { name } = error.params;
        const summonerName = name?.split('-')[0];
        const tag = name?.split('-')[1];
        console.log(summonerName + ' #' + tag);

        // Remove the summoner if no stats were found
        await axios.delete(
          `${import.meta.env.VITE_BACKEND_BASE_URI}/users/following`,
          { data: { summonerName, tag }, withCredentials: true }
        );

        // Notify the user about the summoner not existing
        setMayNotExist([
          ...mayNotExist,
          `${
            newSummoner.summonerName
          } #${newSummoner.tag.toUpperCase()} - ${newSummoner.region.toUpperCase()}`,
        ]);
        toast.error('Summoner does not exist');
      } else {
        // Handle other errors
        setMayNotExist([
          ...mayNotExist,
          `${
            newSummoner.summonerName
          } #${newSummoner.tag.toUpperCase()} - ${newSummoner.region.toUpperCase()}`,
        ]);
        console.error(`Error fetching new summoner stats: ${error.message}`);
        toast.error('Error fetching new summoner stats');
      }
    }
  };

  /**
   * Remove a summoner from the user's following list in the database and localStorage.
   * Displays a confirmation dialog to the user before proceeding with the removal.
   * Updates the following stats and user information in localStorage upon successful removal.
   * Notifies the user of the result via toast notifications.
   * @param {Object} summoner
   * @param {String} summoner.username - The username of the summoner to be removed, in the format "summonerName-tag".
   * @returns {Promise<void>}
   */
  const handleRemoveSummoner = async (summoner) => {
    // Remove the summoner from the following list
    // Update the local storage with the new following list
    // Update the followingStats array with the new following list
    // Notify the user that the summoner has been removed
    if (summoner) {
      // Confirm the user wants to remove the summoner
      const deletionConfirmed = window.confirm(
        'Are you sure you want to remove this summoner?'
      );
      // If the user confirms the deletion then proceed
      if (!deletionConfirmed) {
        return;
      }

      // Get the summoner's name and tag
      try {
        const summonerName = summoner.username.split('-')[0];
        const tag = summoner.username.split('-')[1];

        // Remove the summoner from the following list in the DB
        await axios.delete(
          `${import.meta.env.VITE_BACKEND_BASE_URI}/users/following`,
          { data: { summonerName, tag }, withCredentials: true }
        );

        // Update the local storage with the new following list
        const updatedStats = followingStats.filter(
          (user) => user.username.split('-')[0] !== summonerName
        );

        // Update the followingStats array with the new following list
        const updatedFollowingArray = await axios.get(
          `${import.meta.env.VITE_BACKEND_BASE_URI}/users/following`,
          { withCredentials: true }
        );

        // Update the local storage with the new following list
        localStorage.setItem('followingStats', JSON.stringify(updatedStats));
        setFollowingStats(updatedStats);
        const updatedUserInfo = {
          ...userInfo,
          following: updatedFollowingArray.data,
        };
        localStorage.setItem('userInfo', JSON.stringify(updatedUserInfo));

        // Notify the user that the summoner has been removed
        toast.success('Summoner removed successfully');
      } catch (error) {
        // Notify the user that there was an error removing the summoner
        toast.error(`Error removing summoner`);
      }
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
                      style={{
                        color: 'white',
                        width: '3rem',
                        height: '2rem',
                      }}
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
                      <div className="flex justify-between">
                        {user?.username?.split('-')[0] +
                          ' #' +
                          user?.username?.split('-')[1].toUpperCase()}
                        <Button
                          style={{
                            color: 'white',
                            width: '3rem',
                            height: '2rem',
                          }}
                          className="flex justify-center items-center bg-red-600 ml-2"
                          onClick={() => handleRemoveSummoner(user)}
                        >
                          <span className="text-5xl mb-3">-</span>
                        </Button>
                      </div>
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
                    <td className="border p-3">
                      {' '}
                      {isNaN(user?.winPercentage[0])
                        ? '0%'
                        : user?.winPercentage}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            <div>
              {mayNotExist.length > 0 && (
                <>
                  <h2>
                    The following summoner(s) you follow may not exist, check
                    spelling and whether or not they have made a name or tag
                    change recently:
                  </h2>
                  {mayNotExist.map((summoner, index) => (
                    <p className="text-red-500" key={index}>
                      {summoner}
                    </p>
                  ))}
                </>
              )}
            </div>
          </div>
        )}
      </div>
      {/* OUR FORM TO ADD SUMMONERS WE'D LIKE TO FOLLOW */}
      {/* form should be visible whether or not user is following anyone */}
      {showAddSummoner && (
        <FollowingModal onClose={onClose} onAddSummoner={handleAddSummoner} />
      )}
    </>
  );
};

export default Following;

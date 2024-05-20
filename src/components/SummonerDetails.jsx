/* eslint-disable react/prop-types */
import { useState, useEffect } from 'react';
import { Badge, Avatar } from 'flowbite-react';
import { getAllLeagueRanks } from '../utils/leagueApi';
import selectRankImage from '../utils/selectRankImage';

const SummonerDetails = ({ summoner }) => {
  function capitalizeRank(rankStr) {
    // Ranks are formatted as "S2024 S1 platinum 1"
    // Split the string into parts by space
    let substrings = rankStr.split(' ');

    // Check if there are enough parts to contain a rank
    if (substrings.length > 2) {
      substrings[2] =
        // Capitalize the first letter of the third part
        substrings[2].charAt(0).toUpperCase() + substrings[2].slice(1);
    }
    // Rejoin the parts back into a full string and reutrn
    return substrings.join(' ');
  }

  const {
    username,
    rank,
    winLossRatio,
    winPercentage,
    lp,
    pastRanks,
    champsUsed,
  } = summoner;

  const [summonerName, setSummonerName] = useState('');
  const [summonerTag, setSummonerTag] = useState('');
  const [rankImage, setRankImage] = useState('');
  const [wins, setWins] = useState(0);
  const [losses, setLosses] = useState(0);
  const [pastRank, setPastRank] = useState([]);
  const [recentlyUsedChamps, setRecentlyUsedChamps] = useState([]);
  const [allLeagueRanks, setAllLeagueRanks] = useState([]);

  useEffect(() => {
    const fetchRanks = async () => {
      try {
        const ranksData = await getAllLeagueRanks();
        setAllLeagueRanks(ranksData);
      } catch (error) {
        console.error('Failed to fetch league ranks:', error);
      }
    };

    fetchRanks();
    setSummonerName(
      username?.charAt(0).toUpperCase() + username?.slice(1).split('-')[0]
    );
    setSummonerTag(username?.split('-')[1].toUpperCase());
    setRankImage(selectRankImage(rank));
    setWins(winLossRatio?.split('-')[0]);
    setLosses(winLossRatio?.split('-')[1]);
    setPastRank(pastRanks);
    setRecentlyUsedChamps(champsUsed?.slice(0, 5));
  }, [summoner, username, winLossRatio, rank, pastRanks, champsUsed]);

  return (
    <section className="bg-slate-800 p-4 w-full flex items-center">
      <div className=" rounded-lg flex flex-col items-center text-2xl p-4 mr-auto">
        <div className="flex space-x-4 mb-3">
          {pastRank?.map((rank, index) => (
            <Badge key={index} className="text-xl">
              {capitalizeRank(rank)}
            </Badge>
          ))}
        </div>
        <h2 className="font-semibold text-4xl">
          {summonerName} #{summonerTag}
        </h2>
        <img src={rankImage} alt="Rank Image" className="w-[15rem]" />
        <p className="font-semibold">{rank}</p>
        {winLossRatio !== 'No Ranked Games' ? (
          <p>
            Wins - <span className="text-green-600">{wins}</span> | Losses -
            <span className="text-red-600">{losses}</span>
          </p>
        ) : (
          <p className="text-red-600">{winLossRatio}</p>
        )}

        <p>Win Percentage - {winPercentage?.includes('NaN')  ? '0%' : winPercentage}</p>
        <p>{lp} LP</p>
        <div className="self-center mt-6">
          <h2 className="font-semibold text-3xl text-center">Most Played</h2>
          {recentlyUsedChamps?.length > 0 ? (
            recentlyUsedChamps?.map((champ, index) => (
              <div key={index} className="text-xl my-1">
                <Avatar img={`./champion-icons/${champ}.webp`} rounded>
                  <div className="space-y-1 font-medium dark:text-white">
                    <div>{champ}</div>
                  </div>
                </Avatar>
              </div>
            ))
          ) : (
            <p>No recently used Champions</p>
          )}
        </div>
      </div>
      <div>
        <h2 className="text-center font-semibold text-3xl">Player Base</h2>
        <div className="grid grid-cols-3 text-center space-x-2 space-y-2">
          {allLeagueRanks?.map((rank, index) => (
            <div key={index}>
              <img src={`./${rank.name.toLowerCase()}.webp`} alt="rank" />
              <p>{rank.name}</p>
              <p>{rank.playerBase}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default SummonerDetails;

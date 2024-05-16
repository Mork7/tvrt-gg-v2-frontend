/* eslint-disable react/prop-types */
import { useState, useEffect } from 'react';
import { Badge, Avatar } from 'flowbite-react';
import { getAllLeagueRanks } from '../utils/leagueApi';

const SummonerDetails = ({ summoner }) => {
  function selectRankImage(rank) {
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
  }

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
        <p>
          Wins - <span className="text-green-600">{wins}</span> | Losses -
          <span className="text-red-600">{losses}</span>
        </p>
        <p>Win Percentage - {winPercentage}</p>
        <p>{lp} LP</p>
        <div
          className="self-ce
  const { name, playerBase } = allLeagueRanks[0] || {};nter mt-6"
        >
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
        <h2 className='text-center font-semibold text-3xl'>Player Base</h2>
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

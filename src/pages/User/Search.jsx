import { useState } from 'react';
import { Button } from 'flowbite-react';
import { getPlayerRank } from '../../utils/leagueApi';
import { toast } from 'react-toastify';
import { Spinner } from 'flowbite-react';
import SummonerDetails from '../../components/SummonerDetails';
import Region from '../../components/Region';

const Home = () => {
  const [summoner, setSummoner] = useState('');
  const [tag, setTag] = useState('');
  const [region, setRegion] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [results, setResults] = useState(null);

  const onSubmitHandler = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const data = await getPlayerRank(summoner, tag, region);
      setResults(data[0]);
      toast.success('Player rank fetched successfully');
    } catch (error) {
      toast.error(`Error fetching player rank: ${error.message}`);
    }

    setIsLoading(false);
  };

  return (
    <section className="flex justify-center">
      <div>
        <h1 className="font-semibold text-4xl mb-3">Search For Summoner</h1>
        {/* Summoner search form */}
        <form
          onSubmit={onSubmitHandler}
          className="flex flex-col space-y-3 w-[30rem]"
        >
          <label htmlFor="summonerName" className="font-semibold">
            Summoner Name
          </label>
          <input
            type="text"
            id="summonerName"
            className="w-full p-2 rounded-lg focus:ring-4 focus:ring-purple-700"
            required
            onChange={(e) => setSummoner(e.target.value)}
            placeholder="Summoner Name"
          />
          <label htmlFor="tag" className="font-semibold">
            Tag
          </label>
          <input
            type="text"
            id="tag"
            className="w-full p-2 rounded-lg focus:ring-4 focus:ring-purple-700"
            required
            onChange={(e) => setTag(e.target.value)}
            maxLength={4}
            placeholder='Do not add the "#"'
          />
          <Region setRegion={setRegion} />
          <div className="flex justify-between">
            <Button color="failure" type="reset">
              Reset
            </Button>
            <Button type="submit" className="pb-1 " color={'purple'}>
              Submit
            </Button>
          </div>
        </form>
      </div>
      <div className="h-[51.5rem] w-[80rem] ml-12 rounded-lg border flex justify-center p-4">
        {/* Summoner Profile Tile*/}
        {isLoading ? (
          <div className="self-center">
            <Spinner aria-label="Extra large spinner example" size="xl" />
          </div>
        ) : results ? (
          <SummonerDetails summoner={results} />
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

export default Home;

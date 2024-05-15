import { useState } from 'react';
import { Button } from 'flowbite-react';
import { getPlayerRank } from '../../utils/leagueApi';
import { toast } from 'react-toastify';
import { Spinner } from 'flowbite-react';

const Home = () => {
  const [summoner, setSummoner] = useState('');
  const [tag, setTag] = useState('');
  const [region, setRegion] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [results, setResults] = useState({});

  const onSubmitHandler = async (e) => {
    e.preventDefault();
    // get player info
    try {
      setIsLoading(true);
      setResults(getPlayerRank(summoner, tag, region));
      toast.success('Player rank fetched successfully');
    } catch (error) {
      toast.error('Error fetching player rank:', error);
    }
  };

  return (
    <section className="flex justify-center">
      <div>
        <h1 className="font-semibold text-3xl mb-3">Search For Summoner</h1>
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
            className="rounded-md bg-gray-400 focus:ring-2 focus:ring-teal-600"
            required
            onChange={(e) => setSummoner(e.target.value)}
          />
          <label htmlFor="tag" className="font-semibold">
            Tag
          </label>
          <input
            type="text"
            id="tag"
            className="rounded-md bg-gray-400 focus:ring-2 focus:ring-teal-600"
            required
            onChange={(e) => setTag(e.target.value)}
          />
          {/* Region */}
          <h2 className="font-semibold">Region</h2>
          <div className="flex justify-between space-x-4">
            <div>
              <div>
                <label htmlFor="na" className="mr-3">
                  North America
                </label>
                <input
                  name="region"
                  type="radio"
                  id="na"
                  className="rounded-md bg-gray-400 focus:ring-2 focus:ring-teal-600"
                  required
                  value={'na'}
                  onChange={(e) => setRegion(e.target.value)}
                />
              </div>
              <div>
                <label htmlFor="euw" className="mr-3">
                  Europe West
                </label>
                <input
                  name="region"
                  type="radio"
                  id="euw"
                  className="rounded-md bg-gray-400 focus:ring-2 focus:ring-teal-600"
                  required
                  value={'euw'}
                  onChange={(e) => setRegion(e.target.value)}
                />
              </div>
              <div>
                <label htmlFor="eune" className="mr-3">
                  Europe East/Nordic
                </label>
                <input
                  name="region"
                  type="radio"
                  id="eune"
                  className="rounded-md bg-gray-400 focus:ring-2 focus:ring-teal-600"
                  required
                  value={'eune'}
                  onChange={(e) => setRegion(e.target.value)}
                />
              </div>
              <div>
                <label htmlFor="oce" className="mr-3">
                  Oceania
                </label>
                <input
                  name="region"
                  type="radio"
                  id="oce"
                  className="rounded-md bg-gray-400 focus:ring-2 focus:ring-teal-600"
                  required
                  value={'oce'}
                  onChange={(e) => setRegion(e.target.value)}
                />
              </div>
              <div>
                <label htmlFor="ru" className="mr-3">
                  Russia
                </label>
                <input
                  name="region"
                  type="radio"
                  id="ru"
                  className="rounded-md bg-gray-400 focus:ring-2 focus:ring-teal-600"
                  required
                  value={'ru'}
                  onChange={(e) => setRegion(e.target.value)}
                />
              </div>
              <div>
                <label htmlFor="kr" className="mr-3">
                  Korea
                </label>
                <input
                  name="region"
                  type="radio"
                  id="kr"
                  className="rounded-md bg-gray-400 focus:ring-2 focus:ring-teal-600"
                  required
                  value={'kr'}
                  onChange={(e) => setRegion(e.target.value)}
                />
              </div>
            </div>
            <div>
              <div>
                <label htmlFor="jp" className="mr-3">
                  Japan
                </label>
                <input
                  name="region"
                  type="radio"
                  id="jp"
                  className="rounded-md bg-gray-400 focus:ring-2 focus:ring-teal-600"
                  required
                  value={'jp'}
                  onChange={(e) => setRegion(e.target.value)}
                />
              </div>
              <div>
                <label htmlFor="br" className="mr-3">
                  Brazil
                </label>
                <input
                  name="region"
                  type="radio"
                  id="br"
                  className="rounded-md bg-gray-400 focus:ring-2 focus:ring-teal-600"
                  required
                  value={'br'}
                  onChange={(e) => setRegion(e.target.value)}
                />
              </div>
              <div>
                <label htmlFor="lan" className="mr-3">
                  Latin America North
                </label>
                <input
                  name="region"
                  type="radio"
                  id="lan"
                  className="rounded-md bg-gray-400 focus:ring-2 focus:ring-teal-600"
                  required
                  value={'lan'}
                  onChange={(e) => setRegion(e.target.value)}
                />
              </div>
              <div>
                <label htmlFor="vn" className="mr-3">
                  Vietnam
                </label>
                <input
                  name="region"
                  type="radio"
                  id="vn"
                  className="rounded-md bg-gray-400 focus:ring-2 focus:ring-teal-600"
                  required
                  value={'vn'}
                  onChange={(e) => setRegion(e.target.value)}
                />
              </div>
              <div>
                <label htmlFor="th" className="mr-3">
                  Thailand
                </label>
                <input
                  name="region"
                  type="radio"
                  id="th"
                  className="rounded-md bg-gray-400 focus:ring-2 focus:ring-teal-600"
                  required
                  value={'th'}
                  onChange={(e) => setRegion(e.target.value)}
                />
              </div>
              <div>
                <label htmlFor="tw" className="mr-3">
                  Taiwan
                </label>
                <input
                  name="region"
                  type="radio"
                  id="tw"
                  className="rounded-md bg-gray-400 focus:ring-2 focus:ring-teal-600"
                  required
                  value={'tw'}
                  onChange={(e) => setRegion(e.target.value)}
                />
              </div>
            </div>
          </div>
          <div className="flex justify-between">
            <Button color="failure" type="reset">
              Reset
            </Button>
            <Button type="submit">Submit</Button>
          </div>
        </form>
      </div>
      <div className="h-[51.5rem] w-[80rem] ml-12 rounded-lg border flex justify-center">
        {/* Summoner Profile Tile*/}
        {isLoading ? (
          <div className="self-center">
            <Spinner aria-label="Extra large spinner example" size="xl" />
          </div>
        ) : (
          ''
        )}
      </div>
    </section>
  );
};

export default Home;

import { getTwitchStreams } from '../../utils/leagueApi';
import { useState, useEffect } from 'react';
import { Spinner } from 'flowbite-react';

const Streams = () => {
  const [streams, setStreams] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    getTwitchStreams().then((data) => {
      setStreams(data);
      setIsLoading(false);
    });
  }, []);

  console.log(streams);

  return (
    <>
      <h1 className="font-semibold text-5xl flex justify-center mb-6">
        LoL <span className='text-purple-500'>Twitch</span> Streams
      </h1>
      {isLoading ? (
        <Spinner className="mx-auto flex mt-16" size={'xl'} />
      ) : (
        <section className="grid grid-cols-3 text-center w-full">
          {streams?.map((stream) => (
            <div className="p-3 m-3 border" key={stream.title}>
              <h2 className="font-semibold text-3xl">{stream.displayName}</h2>
              <h3 className="text-lg">{stream.title}</h3>
              <h4>Viewers: {stream.viewerCount}</h4>
              <a
                href={`https://twitch.tv/${stream.displayName}`}
                className="text-purple-500"
              >
                Watch Live
              </a>
            </div>
          ))}
        </section>
      )}
    </>
  );
};

export default Streams;

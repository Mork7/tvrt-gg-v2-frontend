import { getTwitchStreams } from '../../utils/leagueApi';
import { useState, useEffect } from 'react';

const Streams = () => {
  const [streams, setStreams] = useState([]);

  useEffect(() => {
    getTwitchStreams().then((data) => {
      setStreams(data);
    });
  },[]);

 console.log(streams);

  return (
    <>
      <h1 className="font-semibold text-5xl flex justify-center mb-6">LoL Twitch Streams</h1>
      <section className="grid grid-cols-3 text-center w-full">
        {streams?.map((stream) => (
          <div className='p-3 m-3 border' key={stream.title}>
            <h2 className='font-semibold text-3xl'>{stream.displayName}</h2>
            <h3 className='text-lg'>{stream.title}</h3>
            <h4>Viewers: {stream.viewerCount}</h4>
            <a href={`https://twitch.tv/${stream.displayName}`} className='text-purple-500'>Watch Live</a>
          </div>
        ))}
      </section>
    </>
  );
};

export default Streams;

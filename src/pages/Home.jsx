import { Link } from 'react-router-dom';
const Home = () => {
  return (
    <section className="flex justify-between text-xl">
      <div className="flex flex-col text-center space-y-16">
        <h1 className="font-semibold text-4xl">
          Welcome to TVRT<span className="text-purple-500">GAMING</span>
        </h1>
        <h2 className="text-2xl mb-3">
          An application where players can search summoner stats, create a
          leaderboard where they can follow their friends/rivals to keep updated
          on their current rank, and instantly be linked to the top live League
          of Legends streams on Twitch.tv!
        </h2>
        <h3>
          To create a leaderboard you must first{' '}
          <Link className="text-purple-500" to={'/register'}>
            register{' '}
          </Link>
          an account, but any user can feel free to use the search functionality
          at the top!
        </h3>
        <p>
          We plan on adding many other features in the near future, so stay
          tuned and as always:{' '}
          <span className="font-semibold">
            <i>Good Luck, Have Fun!</i>
          </span>
        </p>
        <p>
          (This app is very newly open to the public and we would love some
          feedback on how we can improve the user experience! Please feel free
          to send us your suggestions by visiting the{' '}
          <Link className="text-purple-500" to={'contact'}>
            contact us
          </Link>{' '}
          page.)
        </p>
      </div>
      <img
        className="h-[51.5rem] w-[80rem] ml-12 rounded-lg border flex justify-center p-4"
        src="https://arc-anglerfish-washpost-prod-washpost.s3.amazonaws.com/public/AAW3H3YGWRBOTJ6OWY65HA3A4M.jpg"
        alt="League of Legends Champions"
      />
    </section>
  );
};

export default Home;

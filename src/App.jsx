import Navigation from './components/Navigation';
import { Outlet } from 'react-router-dom';

function App() {
  return (
    <>
      <Navigation />
      <main className="m-[2rem]">
        <Outlet />
      </main>
    </>
  );
}

export default App;

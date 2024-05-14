import Navigation from './components/Navigation';
import { useState } from 'react';

function App() {

  const [isActive, setIsActive] = useState(false);

  return (
    <>
      <Navigation />
      <main className="ml-[10rem]">
        {}
      </main>
    </>
  );
}

export default App;

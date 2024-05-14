import Navigation from './pages/Auth/Navigation';
import { Outlet } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


function App() {
  return (
    <>
      <ToastContainer theme='dark' />
      <Navigation />
      <main className="m-[2rem]">
        <Outlet />
      </main>
    </>
  );
}

export default App;

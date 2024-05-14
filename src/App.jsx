import { Outlet } from 'react-router';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function App() {
  return (
    <>
      <ToastContainer theme="dark" />
      <main className="py-3">
        {/* outlet acts as a place holder for where child routes will be rendered, so when our URL has for example /profile, then Profile.jsx will be rendered here */}
        <Outlet />
      </main>
    </>
  );
}

export default App;

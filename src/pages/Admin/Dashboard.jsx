import axios from "axios";
import { useEffect, useState } from "react";
import { Button } from "flowbite-react";
import UpdateUserModal from "../../components/UpdateUserModal";
import { toast } from "react-toastify";
import { Navigate } from "react-router-dom";

const Dashboard = () => {
  const [users, setUsers] = useState([]);
  const [showUpdateUserModal, setShowUpdateUserModal] = useState(false);
  const [currentUserId, setCurrentUserId] = useState(null);

  useEffect(() => {
    if (!localStorage.getItem("isAdmin")) {
      return;
    }

    const fetchUsers = async () => {
      const { data } = await axios.get(
        `${import.meta.env.VITE_BACKEND_BASE_URI}/users`,
        // stop forgetting you need this line...
        { withCredentials: true }
      );
      setUsers(data);
    };
    fetchUsers();
  }, []);

  if (!localStorage.getItem("isAdmin")) {
    return <Navigate to="/login" replace />;
  }

  const onClose = () => {
    setShowUpdateUserModal(false);
  };

  const onUpdateUser = (updatedUser) => {
    const updatedUsers = users.map((user) =>
      user._id === updatedUser._id ? updatedUser : user
    );
    setUsers(updatedUsers);
  };

  const onDeleteUser = async (userId) => {
    const deletionConfirmed = window.confirm(
      "Are you sure you want to remove this summoner?"
    );
    if (deletionConfirmed) {
      try {
        await axios.delete(
          `${import.meta.env.VITE_BACKEND_BASE_URI}/users/${userId}`,
          { withCredentials: true }
        );
        setUsers(users.filter((user) => user._id !== userId));
        toast.success("User deleted");
      } catch (error) {
        toast.error("Error deleting user");
        console.error(`Error deleting user: ${error.message}`);
      }
    }
  };
  return (
    <section className="flex items-center flex-col">
      <h2 className="text-5xl font-semibold mb-2">Users</h2>
      <table className="border w-2/3">
        <thead className="border text-2xl">
          <tr className="font-semibold">
            <td className="border p-3">Id</td>
            <td className="border p-3">Email</td>
            <td className="border p-3">Username</td>
            <td className="border p-3">Summoner Details</td>
            <td className="border p-3">Admin Functions</td>
          </tr>
        </thead>
        <tbody className="text-xl">
          {users?.map((user) => (
            <tr key={user._id} className="border">
              <td className="border p-3">{user._id}</td>
              <td className="border p-3">{user.email}</td>
              <td className="border p-3">{user.name}</td>
              <td className="border p-3">
                {user.summonerDetails
                  ? `${user.summonerDetails.summonerName} #${user.summonerDetails.tag}`
                  : "No Summoner Details"}
              </td>
              <td className="flex justify-evenly">
                <Button
                  className="my-2"
                  color={"purple"}
                  onClick={() => {
                    setCurrentUserId(user._id);
                    setShowUpdateUserModal(!showUpdateUserModal);
                  }}
                >
                  Update User
                </Button>
                <Button
                  className="my-2"
                  color={"failure"}
                  onClick={() => onDeleteUser(user._id)}
                >
                  Delete User
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      {showUpdateUserModal && (
        <UpdateUserModal
          onClose={onClose}
          userId={currentUserId}
          onUpdateUser={onUpdateUser}
        />
      )}
    </section>
  );
};

export default Dashboard;

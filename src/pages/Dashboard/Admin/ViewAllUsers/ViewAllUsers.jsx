import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../../../hooks/useAxiosSecure";
import { FaTrashAlt, FaUserEdit } from "react-icons/fa";
import Swal from "sweetalert2";
import { useState } from "react";

const ViewAllUsers = () => {
  const axiosSecure = useAxiosSecure();

  const [search, setSearch] = useState(""); // State for search query
  const [selectedUser, setSelectedUser] = useState(null);

  const { data: users = [], refetch } = useQuery({
    queryKey: ["users", search],
    queryFn: async () => {
      const res = await axiosSecure.get(`/users?search=${search}`);
      return res.data;
    },
  });

  // Handle search input change
  const handleSearchChange = (e) => {
    setSearch(e.target.value);
  };

  // Handle role update modal submit
  const handleUpdateRole = () => {
    const newRole = document.getElementById("role-input").value;
    axiosSecure
      .patch(`/users/role/${selectedUser._id}`, { role: newRole })
      .then((res) => {
        if (res.data.modifiedCount > 0) {
          refetch();
          Swal.fire({
            position: "top-end",
            icon: "success",
            title: `${selectedUser.name} role updated to ${newRole}!`,
            showConfirmButton: false,
            timer: 1500,
          });
        }
      });
    setSelectedUser(null); // Close modal
  };

  //   handle delete
  const handleDeleteUser = (user) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        axiosSecure.delete(`/users/${user._id}`).then((res) => {
          if (res.data.deletedCount > 0) {
            refetch();
            Swal.fire({
              title: "Deleted!",
              text: "Your file has been deleted.",
              icon: "success",
            });
          }
        });
      }
    });
  };
  return (
    <div >
      <div className="flex justify-center my-4">
        <h2 className="text-3xl text-purple">All Users</h2>
      </div>
      <div className="flex justify-center">
        <input
          type="text"
          placeholder="Search by name or email"
          value={search}
          onChange={handleSearchChange}
          className="input input-bordered w-1/3"
        />
      </div>
     <div className="overflow-x-auto">
  <table className="table table-zebra w-full">
    {/* Table Header */}
    <thead className="bg-gray-100">
      <tr>
        <th className="px-4 py-2">#</th>
        <th className="px-4 py-2">Name</th>
        <th className="px-4 py-2">Email</th>
        <th className="px-4 py-2">Role</th>
        <th className="px-4 py-2">Action</th>
      </tr>
    </thead>
    {/* Table Body */}
    <tbody>
      {users.map((user, index) => (
        <tr key={user._id} className="hover:bg-gray-100">
          <td className="px-4 py-2">{index + 1}</td>
          <td className="px-4 py-2">{user.name}</td>
          <td className="px-4 py-2 truncate max-w-xs">{user.email}</td>
          <td className="px-4 py-2">
            <div className="flex items-center gap-2">
              <p>{user.role}</p>
              <button
                onClick={() => setSelectedUser(user)} // Open modal with user info
                className="btn btn-xs bg-purple text-white"
              >
                <FaUserEdit className="text-lg" />
              </button>
            </div>
          </td>
          <td className="px-4 py-2">
            <button
              onClick={() => handleDeleteUser(user)}
              className="btn btn-ghost btn-lg"
            >
              <FaTrashAlt className="text-red-600"></FaTrashAlt>
            </button>
          </td>
        </tr>
      ))}
    </tbody>
  </table>
</div>


      {/* Role Update Modal */}
      {selectedUser && (
        <div className="modal modal-open">
          <div className="modal-box">
            <h3 className="font-bold text-lg">
              Update Role for {selectedUser.name}
            </h3>
            <select
              id="role-input"
              className="select select-bordered w-full my-4"
            >
              <option value="" disabled selected>
                Select new role
              </option>
              <option value="student">Student</option>
              <option value="tutor">Tutor</option>
              <option value="admin">Admin</option>
            </select>

            <div className="modal-action">
              <button onClick={handleUpdateRole} className="btn btn-success">
                Update Role
              </button>
              <button
                onClick={() => setSelectedUser(null)} // Close modal
                className="btn btn-error"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ViewAllUsers;

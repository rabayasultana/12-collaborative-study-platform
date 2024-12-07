// import { useNavigate, useParams } from "react-router-dom";
// import useAxiosSecure from "../../../../../hooks/useAxiosSecure";
// import { useEffect, useState } from "react";
// import Swal from "sweetalert2";

import { useLoaderData } from "react-router-dom";
import useAxiosSecure from "../../../../hooks/useAxiosSecure";
import Swal from "sweetalert2";


const UpdateSession = () => {
  const session = useLoaderData();
  const axiosSecure = useAxiosSecure();
  // console.log(session);

  // update 
const handleUpdate = (e) => {
  e.preventDefault();
  const newFormData = new FormData(e.currentTarget);
        const newSessionData = Object.fromEntries(newFormData.entries());
        // console.log(newSessionData);

  axiosSecure
    .patch(`/session/${session._id}`, newSessionData)
    .then((res) => {
      if (res.data.modifiedCount > 0) {
        Swal.fire(
          "Updated!",
          "session has been updated successfully.",
          "success"
        );
      }
    })
    .catch((err) => {
      console.error("Failed to update session:", err);
    });
};

  return (
    <div className="max-w-3xl mx-auto p-6 bg-gray-100 rounded-lg shadow-md">
  <h2 className="text-3xl font-semibold mb-6 text-center text-purple">Update Session</h2>
  <form onSubmit={handleUpdate}>
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      {/* Title Field */}
      <div>
        <label htmlFor="title" className="block text-sm font-medium text-gray-700">Title</label>
        <input
          type="text"
          id="title"
          name="title"
          defaultValue={session.title}
          className="w-full mt-1 px-4 py-2 border rounded-md"
          required
        />
      </div>
      {/* Tutor Name */}
      <div>
        <label htmlFor="tutorName" className="block text-sm font-medium text-gray-700">Tutor Name</label>
        <input
          type="text"
          id="tutorName"
          name="tutorName"
          defaultValue={session.tutorName}
          className="w-full mt-1 px-4 py-2 border rounded-md"
          readOnly
        />
      </div>
      {/* Tutor Email */}
      <div>
        <label htmlFor="tutorEmail" className="block text-sm font-medium text-gray-700">Tutor Email</label>
        <input
          type="email"
          id="tutorEmail"
          name="tutorEmail"
          defaultValue={session.tutorEmail}
          className="w-full mt-1 px-4 py-2 border rounded-md"
          readOnly
        />
      </div>
            {/* Duration */}
            <div>
        <label htmlFor="duration" className="block text-sm font-medium text-gray-700">Duration (Days)</label>
        <input
          type="number"
          id="duration"
          name="duration"
          defaultValue={session.duration}
          className="w-full mt-1 px-4 py-2 border rounded-md"
        />
      </div>
      {/* Description */}
      <div className="md:col-span-2">
        <label htmlFor="description" className="block text-sm font-medium text-gray-700">Description</label>
        <textarea
          id="description"
          name="description"
          defaultValue={session.description}
          className="w-2/3 mt-1 px-4 py-2 border rounded-md"
          rows="4"
        ></textarea>
      </div>
      {/* Registration Start */}
      <div>
        <label htmlFor="registrationStart" className="block text-sm font-medium text-gray-700">Registration Start</label>
        <input
          type="date"
          id="registrationStart"
          name="registrationStart"
          defaultValue={session.registrationStart}
          className="w-full mt-1 px-4 py-2 border rounded-md"
        />
      </div>
      {/* Registration End */}
      <div>
        <label htmlFor="registrationEnd" className="block text-sm font-medium text-gray-700">Registration End</label>
        <input
          type="date"
          id="registrationEnd"
          name="registrationEnd"
          defaultValue={session.registrationEnd}
          className="w-full mt-1 px-4 py-2 border rounded-md"
        />
      </div>
      {/* Class Start */}
      <div>
        <label htmlFor="classStart" className="block text-sm font-medium text-gray-700">Class Start</label>
        <input
          type="date"
          id="classStart"
          name="classStart"
          defaultValue={session.classStart}
          className="w-full mt-1 px-4 py-2 border rounded-md"
        />
      </div>
      {/* Class End */}
      <div>
        <label htmlFor="classEnd" className="block text-sm font-medium text-gray-700">Class End</label>
        <input
          type="date"
          id="classEnd"
          name="classEnd"
          defaultValue={session.classEnd}
          className="w-full mt-1 px-4 py-2 border rounded-md"
        />
      </div>
      {/* Fee */}
      <div>
        <label htmlFor="fee" className="block text-sm font-medium text-gray-700">Fee</label>
        <input
          type="number"
          id="fee"
          name="fee"
          defaultValue={session.fee}
          className="w-full mt-1 px-4 py-2 border rounded-md"
        />
      </div>
      {/* Status */}
      <div>
        <label htmlFor="status" className="block text-sm font-medium text-gray-700">Status</label>
        <select
          id="status"
          name="status"
          defaultValue={session.status}
          className="w-full mt-1 px-4 py-2 border rounded-md"
        >
          <option value="pending">Pending</option>
          <option value="approved">Approved</option>
          <option value="rejected">Rejected</option>
        </select>
      </div>
    </div>
   <div className="flex justify-center">
   <button
      type="submit"
      className="mt-6 w-1/2 mx-auto  bg-purple text-white py-2 rounded-md font-semibold hover:bg-opacity-50 transition"
    >
      Update Session
    </button>
   </div>
  </form>
</div>

  );
};

export default UpdateSession;

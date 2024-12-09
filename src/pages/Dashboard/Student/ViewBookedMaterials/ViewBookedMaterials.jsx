import { useEffect, useState } from "react";
import useAuth from "../../../../hooks/useAuth";
import useAxiosSecure from "../../../../hooks/useAxiosSecure";
import { Link } from "react-router-dom";

const ViewBookedMaterials = () => {
    const { user } = useAuth();
    const axiosSecure = useAxiosSecure();
    const [bookedSessions, setBookedSessions] = useState([]);

    useEffect(() => {
        if (user?.email) {
          axiosSecure
            .get(`/bookedSessions?studentEmail=${user.email}`)
            .then((res) => {
              setBookedSessions(res.data);
            })
            .catch((err) => {
              console.error("Error fetching booked sessions:", err);
            });
        }
      }, [axiosSecure, user?.email]);
    return (
        <div className="py-8 bg-gray-50">
        <h2 className="text-4xl font-bold text-center text-blue-600 mb-6">
          Your Booked Sessions
        </h2>
        <p className="text-center text-gray-600 mb-10">
          View your booked sessions and access materials for each session.
        </p>
  
        <div className="overflow-x-auto mx-auto max-w-6xl px-4">
          <table className="min-w-full bg-white rounded-lg shadow-md">
            <thead className="bg-blue-600 text-white text-left">
              <tr>
                <th className="py-3 px-6">Session Title</th>
                <th className="py-3 px-6">Tutor Name</th>
                <th className="py-3 px-6 text-center">Actions</th>
              </tr>
            </thead>
            <tbody>
              {bookedSessions.map((session) => (
                <tr
                  key={session._id}
                  className="border-t hover:bg-gray-100 transition-colors duration-200"
                >
                  <td className="py-3 px-6">{session.title}</td>
                  <td className="py-3 px-6">{session.tutorName}</td>
                  <td className="py-3 px-6 text-center">
                    <Link
                      to={`/dashboard/showMaterials/${session._id}`}
                      className="inline-block px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition"
                    >
                      Show Materials
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    );
  };

export default ViewBookedMaterials;
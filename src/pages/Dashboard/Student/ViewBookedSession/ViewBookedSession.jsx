import { useEffect, useState } from "react";
import useAuth from "../../../../hooks/useAuth";
import useAxiosSecure from "../../../../hooks/useAxiosSecure";
import BookedSessionDetails from "./BookedSessionDetails";

const ViewBookedSession = () => {
    const { user } = useAuth();
    const axiosSecure = useAxiosSecure();
    const [bookedSessions, setBookedSessions] = useState([]);
    const [selectedSession, setSelectedSession] = useState(null);

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
          View your booked sessions and share your feedback.
        </p>
  
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mx-auto max-w-6xl px-4">
          {bookedSessions.map((session) => (
            <div
              key={session._id}
              className="bg-white shadow-lg rounded-lg overflow-hidden transition transform hover:scale-105 duration-300"
            >
              <div className="p-6">
                <h3 className="text-2xl font-bold text-gray-800">{session.title}</h3>
                <p className="text-gray-600 mt-2">Tutor: {session.tutorName}</p>
                <p className="text-gray-600 mt-1">Date: {new Date(session.classStart).toLocaleDateString()}</p>
                <div className="mt-4">
                  <button
                    onClick={() => setSelectedSession(session)}
                    className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
                  >
                    View Details
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
  
        {bookedSessions.length === 0 && (
          <p className="text-center text-gray-500 mt-10">No booked sessions available.</p>
        )}
  
        {selectedSession && (
          <BookedSessionDetails session={selectedSession} onClose={() => setSelectedSession(null)} ></BookedSessionDetails>
        )}
      </div>
    );
  };
  

export default ViewBookedSession;
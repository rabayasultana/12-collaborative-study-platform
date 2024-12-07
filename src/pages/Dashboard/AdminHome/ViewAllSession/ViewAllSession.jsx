import AdminSessionCard from "../AdminSessionCard/AdminSessionCard";
import useSession from "../../../../hooks/useSession";
import useAxiosSecure from "../../../../hooks/useAxiosSecure";
import Swal from "sweetalert2";
import { useEffect, useState } from "react";

const ViewAllSession = () => {
    const axiosSecure = useAxiosSecure();
  const [ studySessions ] = useSession();
  const [sessions, setSessions] = useState([]);

  useEffect(() => {
    setSessions(studySessions.filter((session) => session.status !== "rejected"));
  }, [studySessions]);

    // Approve a session
    const handleApproveSession = (updatedSession) => {
    //   updating in database
    axiosSecure.patch(`/session/${updatedSession._id}`, updatedSession)
    .then((res) => {
        if (res.data.modifiedCount > 0) {
            Swal.fire(
                "Approved!",
                "Session has been approved.",
                "success"
              ); 
        }
    })
    .then(() => {
        window.location.reload();
      });
      };

    // Reject a session
    const handleRejectSession = (updatedSession) => {
    //   updating in database
    axiosSecure.patch(`/session/${updatedSession._id}`, updatedSession)
    .then((res) => {
        if (res.data.modifiedCount > 0) {
            Swal.fire(
                "Rejected!",
                "Session has been Rejected.",
                "success"
              ); 
        }
    })
    .then(() => {
        // setStudySessions((prevSessions) =>
        //     prevSessions.filter((session) => session._id !== updatedSession._id)
        //   ); // Remove the rejected session from the list
        window.location.reload();
      });
      };

  return (
    <div>
      {/* Section Header */}
      <div className="text-center mb-8">
        <h2 className="text-3xl font-bold text-purple">Study Sessions</h2>
      </div>

      {/* Sessions Grid */}
      <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3 mx-20 border">
        {sessions.map((session) => (
          <AdminSessionCard
            key={session._id}
            session={session}
            handleApproveSession={handleApproveSession}
            handleRejectSession={handleRejectSession}
            // onUpdate={handleUpdateSession}
            // onDelete={handleDeleteSession}
          />
        ))}
      </div>
    </div>
  );
};

export default ViewAllSession;

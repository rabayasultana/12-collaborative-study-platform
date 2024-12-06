import AdminSessionCard from "../AdminSessionCard/AdminSessionCard";
import useSession from "../../../../hooks/useSession";
import Swal from "sweetalert2";

const ViewAllSession = () => {
  const [studySessions, setStudySessions] = useSession(); // Fetch sessions using the custom hook

  // Approve a session
  const handleApproveSession = (updatedSession) => {
    // API integration placeholder: Replace this with your backend call
    Swal.fire("Approved!", "The session has been approved.", "success");
    setStudySessions((prevSessions) =>
      prevSessions.map((session) =>
        session._id === updatedSession._id
          ? { ...session, status: "approved", fee: updatedSession.fee }
          : session
      )
    );
  };

  // Reject a session
  const handleRejectSession = (sessionId) => {
    Swal.fire({
      title: "Are you sure?",
      text: "This session will be removed from the pending list.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes, reject it!",
    }).then((result) => {
      if (result.isConfirmed) {
        // API integration placeholder: Replace this with your backend call
        Swal.fire("Rejected!", "The session has been rejected.", "success");
        setStudySessions((prevSessions) =>
          prevSessions.filter((session) => session._id !== sessionId)
        );
      }
    });
  };

  // Update a session
  const handleUpdateSession = (updatedSession) => {
    Swal.fire({
      title: "Update Fee",
      input: "number",
      inputLabel: "Enter the new fee for this session",
      inputValue: updatedSession.fee,
      showCancelButton: true,
      confirmButtonText: "Update",
    }).then((result) => {
      if (result.isConfirmed) {
        // API integration placeholder: Replace this with your backend call
        const newFee = parseInt(result.value, 10) || updatedSession.fee;
        Swal.fire("Updated!", "The session has been updated.", "success");
        setStudySessions((prevSessions) =>
          prevSessions.map((session) =>
            session._id === updatedSession._id
              ? { ...updatedSession, fee: newFee }
              : session
          )
        );
      }
    });
  };

  // Delete a session
  const handleDeleteSession = (sessionId) => {
    Swal.fire({
      title: "Are you sure?",
      text: "This session will be deleted permanently!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        // API integration placeholder: Replace this with your backend call
        Swal.fire("Deleted!", "The session has been deleted.", "success");
        setStudySessions((prevSessions) =>
          prevSessions.filter((session) => session._id !== sessionId)
        );
      }
    });
  };

  return (
    <div>
      {/* Section Header */}
      <div className="text-center mb-8">
        <h2 className="text-3xl font-bold text-blue-600">Study Sessions</h2>
        <p className="text-gray-600 mt-2">Manage all study sessions created by tutors</p>
      </div>

      {/* Sessions Grid */}
      <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3 mx-20 border">
        {studySessions.map((session) => (
          <AdminSessionCard
            key={session._id}
            session={session}
            onApprove={handleApproveSession}
            onReject={handleRejectSession}
            onUpdate={handleUpdateSession}
            onDelete={handleDeleteSession}
          />
        ))}
      </div>
    </div>
  );
};

export default ViewAllSession;

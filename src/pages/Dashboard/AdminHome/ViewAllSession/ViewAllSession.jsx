import AdminSessionCard from "../AdminSessionCard/AdminSessionCard";
import useSession from "../../../../hooks/useSession";
import useAxiosSecure from "../../../../hooks/useAxiosSecure";
import Swal from "sweetalert2";

const ViewAllSession = () => {
    const axiosSecure = useAxiosSecure();
  const [ studySessions ] = useSession();

    // Approve a session
    const handleApproveSession = (updatedSession) => {
    //   updating in database
    axiosSecure.patch(`/session/${updatedSession._id}`, updatedSession)
    .then((res) => {
        if (res.data.modifiedCount > 0) {
            Swal.fire(
                "Updated!",
                "Material has been updated successfully.",
                "success"
              ); 
        }
    })
    .then(() => {
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
        {studySessions.map((session) => (
          <AdminSessionCard
            key={session._id}
            session={session}
            handleApproveSession={handleApproveSession}
            // onReject={handleRejectSession}
            // onUpdate={handleUpdateSession}
            // onDelete={handleDeleteSession}
          />
        ))}
      </div>
    </div>
  );
};

export default ViewAllSession;

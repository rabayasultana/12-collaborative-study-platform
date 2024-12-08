import Swal from "sweetalert2";
import useAxiosSecure from "../../../../hooks/useAxiosSecure";
import useTutorSession from "../../../../hooks/useTutorSession";

const ViewSession = () => {
  const axiosSecure = useAxiosSecure();
  const [studySessions] = useTutorSession();

  // Handle resending approval requests (creating a new session)
  const resendApprovalRequest = async (session) => {
    const newSession = {
      ...session,
      status: "pending",
    };
    delete newSession._id; // Remove the ID to create a new session

    try {
      // Create the new session in the database
      const response = await axiosSecure.post('/session', newSession);
    //   console.log(response.data);

      // If new session created successfully
      if (response.data.insertedId) {
        // Delete the old rejected session
        // await axiosSecure.delete(`/session/${session._id}`);

        // Show success alert
        Swal.fire({
          title: "Success!",
          text: "Session re-created successfully!",
          icon: "success",
          confirmButtonText: "Ok",
        });

        // Reload the page to reflect the changes
        window.location.reload();
      }
    } catch (error) {
      console.error("Error handling session:", error);
      Swal.fire({
        title: "Error",
        text: "An error occurred while processing the session. Please try again.",
        icon: "error",
        confirmButtonText: "Ok",
      });
    }
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold text-purple text-center">
        Your Study Sessions
      </h1>

      <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {studySessions.map((session) => (
          <div
            key={session._id}
            className="border p-4 rounded shadow-md bg-gray-100"
          >
            <h2 className="text-lg font-bold text-purple">{session.title}</h2>
            <p className="text-sm text-gray-600 mt-2">{session.description}</p>
            <p
              className={`mt-2 text-sm font-bold ${
                session.status === "approved"
                  ? "text-green-600"
                  : session.status === "rejected"
                  ? "text-red-600"
                  : "text-yellow-600"
              }`}
            >
              Status: {session.status}
            </p>
            {session.status === "rejected" && (
              <button
                onClick={() => resendApprovalRequest(session)}
                className="mt-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
              >
                Resend Approval Request
              </button>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default ViewSession;

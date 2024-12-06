import { useState } from "react";
import Swal from "sweetalert2";

const AdminSessionCard = ({ session, onApprove, onReject, onUpdate, onDelete }) => {
  const [isApprovalModalOpen, setApprovalModalOpen] = useState(false);
  const [sessionType, setSessionType] = useState("free");
  const [sessionAmount, setSessionAmount] = useState(0);

  const handleApprove = () => {
    setApprovalModalOpen(true); // Open the approval modal
  };

  const handleApprovalSubmit = () => {
    const updatedSession = {
      ...session,
      status: "approved",
      fee: sessionType === "free" ? 0 : sessionAmount,
    };

    onApprove(updatedSession); // Pass updated session to parent
    setApprovalModalOpen(false); // Close the modal
    Swal.fire("Approved!", "The session has been approved.", "success");
  };

  const handleReject = () => {
    Swal.fire({
      title: "Are you sure?",
      text: "This session will be removed from the pending list.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes, reject it!",
    }).then((result) => {
      if (result.isConfirmed) {
        onReject(session._id); // Notify parent of rejection
        Swal.fire("Rejected!", "The session has been rejected.", "success");
      }
    });
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-all duration-300">
      <h2 className="text-xl font-semibold text-purple text-center mb-4">
        {session.title}
      </h2>
      <p className="text-sm text-gray-600 mb-2">Tutor: {session.tutorName}</p>
      <p className="text-sm text-gray-600 mb-4">
        Description: {session.description}
      </p>
      <p className="text-sm text-gray-600 mb-2">
        Registration: {session.registrationStart} to {session.registrationEnd}
      </p>
      <p className="text-sm text-gray-600 mb-2">
        Class: {session.classStart} to {session.classEnd}
      </p>
      <p className="text-sm text-gray-600 mb-2">Duration: {session.duration} days</p>
      <p className="text-sm text-gray-600 mb-2">Fee: ${session.fee}</p>
      <p className="text-sm text-gray-600 mb-2">Status: {session.status}</p>

      <div className="flex justify-between items-center mt-4">
        {session.status === "approved" ? (
          <>
            <button
              onClick={() => onUpdate(session)}
              className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
            >
              Update
            </button>
            <button
              onClick={() => onDelete(session._id)}
              className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700"
            >
              Delete
            </button>
          </>
        ) : (
          <>
            <button
              onClick={handleApprove}
              className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700"
            >
              Approve
            </button>
            <button
              onClick={handleReject}
              className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700"
            >
              Reject
            </button>
          </>
        )}
      </div>

      {/* Approval Modal */}
      {isApprovalModalOpen && (
        <div className="fixed inset-0 bg-gray-800 bg-opacity-50 flex justify-center items-center">
          <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md">
            <h3 className="text-lg font-bold mb-4">Approve Session</h3>
            <div className="mb-4">
              <label className="block mb-2 font-medium">Session Type:</label>
              <select
                value={sessionType}
                onChange={(e) => setSessionType(e.target.value)}
                className="select select-bordered w-full"
              >
                <option value="free">Free</option>
                <option value="paid">Paid</option>
              </select>
            </div>
            {sessionType === "paid" && (
              <div className="mb-4">
                <label className="block mb-2 font-medium">Amount:</label>
                <input
                  type="number"
                  value={sessionAmount}
                  onChange={(e) => setSessionAmount(e.target.value)}
                  className="input input-bordered w-full"
                  min="0"
                  required
                />
              </div>
            )}
            <div className="flex justify-end space-x-2">
              <button
                onClick={() => setApprovalModalOpen(false)}
                className="px-4 py-2 bg-gray-400 text-white rounded-lg hover:bg-gray-500"
              >
                Cancel
              </button>
              <button
                onClick={handleApprovalSubmit}
                className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700"
              >
                Approve
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminSessionCard;

import { useState } from "react";

const AdminSessionCard = ({ session, handleApproveSession, handleRejectSession }) => {
  const [ApprovalModalOpen, setApprovalModalOpen] = useState(false);
  const [sessionType, setSessionType] = useState("free");
  const [sessionFee, setSessionFee] = useState(0);

//   handle approval modal
  const handleApprove = () => {
    setApprovalModalOpen(true);
  }

// handle approve session   
const handleApproveSubmit = () => {
    const updatedSession = {
        ...session,
        status: "approved",
        fee: sessionType === "free" ? 0 : sessionFee,
      };

      handleApproveSession(updatedSession);
      setApprovalModalOpen(false);
    
}

// handle approve session   
const handleRejectBtn = () => {
    const updatedSession = {
        ...session,
        status: "rejected",
        fee: sessionFee,
      };

      handleRejectSession(updatedSession);
}


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
      <p className="text-sm mb-2 text-gray-600 ">Status: <span className={`${
    session.status === "approved" 
      ? "text-purple" 
      : "text-orange-700"
  }`}>{session.status}</span></p>
      <div className="flex justify-between items-center mt-4">
        {session.status === "approved" ? (
          <>
            <button
            //   onClick={() => onUpdate(session)}}
              className="px-4 py-2 bg-purple text-white rounded-lg hover:bg-opacity-50"
            >
              Update
            </button>
            <button
            //   onClick={() => onDelete(session._id)}
              className="px-4 py-2 bg-orange-700 text-white rounded-lg hover:bg-orange-600"
            >
              Delete
            </button>
          </>
        ) : (
          <>
            <button
              onClick={handleApprove}
              className="px-4 py-2 bg-purple text-white rounded-lg hover:bg-opacity-50"
            >
              Approve
            </button>
            <button
              onClick={handleRejectBtn}
              className="px-4 py-2 bg-orange-700 text-white rounded-lg hover:bg-orange-600"
            >
              Reject
            </button>
          </>
        )}
      </div>

      {/* Approval Modal */}
      {ApprovalModalOpen && (
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
                <label className="block mb-2 font-medium">Fee:</label>
                <input
                  type="number"
                  value={sessionFee}
                  onChange={(e) => setSessionFee(e.target.value)}
                  className="input input-bordered w-full"
                  min="0"
                  required
                />
              </div>
            )}
            <div className="flex justify-end space-x-2">
              <button
                onClick={() => setApprovalModalOpen(false)}
                className="px-4 py-2 bg-orange-400 text-white rounded-lg hover:bg-orange-300"
              >
                Cancel
              </button>
              <button
                onClick={handleApproveSubmit}
                className="px-4 py-2 bg-purple bg-opacity-70 text-white rounded-lg hover:bg-opacity-40"
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

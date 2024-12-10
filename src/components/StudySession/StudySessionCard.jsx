import { Link } from "react-router-dom";

const StudySessionCard = ({ session }) => {
  const { title, description, registrationStart, registrationEnd } = session;

  
  // Get the current date
  const currentDate = new Date();

  // Convert registrationStart and registrationEnd to Date objects
  const startDate = new Date(registrationStart);
  const endDate = new Date(registrationEnd);

  // Determine if the session is ongoing or closed based on the registration dates
  const status =
    currentDate >= startDate && currentDate <= endDate
      ? "ongoing"
      : "closed";
    //   console.log(status);

  return (
    <div className="bg-gray-100 py-10">
      {/* Session Details */}
      <div className="bg-white shadow-md rounded-md p-6 mb-6">
        <h3 className="text-xl font-bold text-gray-800">{title}</h3>
        <p className="text-sm text-gray-500 mt-2">{description}</p>

        {/* Status and Actions */}
        <div className="mt-4">
        <p
            className={`inline-block px-3 py-1 text-sm font-semibold rounded ${
              status === "ongoing"
                ? "bg-green-100 text-green-700"
                : "bg-red-100 text-red-700"
            }`}
          >
            {status === "ongoing" ? "Ongoing" : "Closed"}
          </p>

          <div className="mt-4 flex justify-between items-center">
            <Link to={`/sessionDetails/${session._id}`}>

<button
      className={`px-4 py-2 rounded=lg text-white font-semibold bg-purple  hover:bg-opacity-50`}
    >
      Read More
    </button>
</Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StudySessionCard;

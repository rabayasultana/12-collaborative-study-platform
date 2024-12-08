import useSession from "../../hooks/useSession";

const TutorList = () => {
    const [sessions] = useSession();

     // Ensure there are sessions and extract unique tutors
  const uniqueTutors = sessions?.length
  ? Array.from(
      new Map(
        sessions.map((session) => [
          session.tutorEmail,
          { name: session.tutorName, email: session.tutorEmail },
        ])
      ).values()
    )
  : [];


  // Debugging: Log sessions and unique tutors
  console.log("Sessions:", sessions);
  console.log("Unique Tutors:", uniqueTutors);

  return (
    <div className="py-8 bg-gray-50">
      <h2 className="text-4xl font-bold text-center text-blue-600 mb-6">
        Meet Our Tutors
      </h2>
      <p className="text-center text-gray-600 mb-10">
        Discover the dedicated tutors who make learning exceptional.
      </p>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mx-auto max-w-6xl px-4">
        {uniqueTutors.map((session, index) => (
          <div
            key={index}
            className="bg-white shadow-lg rounded-lg overflow-hidden transition transform hover:scale-105 duration-300"
          >
            <div className="p-6">
              <h3 className="text-2xl font-bold text-gray-800">{session.name}</h3>
              <p className="text-sm text-gray-500 mt-2">{session.email}</p>
              <div className="mt-4">
                <button
                  className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
                  onClick={() => alert(`Contacting ${session.tutorName}`)}
                >
                  Contact
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TutorList;

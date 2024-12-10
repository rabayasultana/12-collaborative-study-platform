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
  // console.log("Sessions:", sessions);
  // console.log("Unique Tutors:", uniqueTutors);

  return (
    <div className="py-8 bg-gray-50">
      <h2 className="text-4xl font-extrabold text-center text-purple mb-6">
        Meet Our Tutors
      </h2>
      <p className="text-center mb-10">
        Discover the dedicated tutors who make learning exceptional.
      </p>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mx-auto max-w-6xl px-4">
        {uniqueTutors.map((tutor, index) => (
          <div
            key={index}
            className="bg-purple text-white shadow-lg rounded-lg overflow-hidden transition transform hover:scale-105 duration-300 text-center"
          >
            <div className="p-6">
              <h3 className="text-2xl font-bold">{tutor.name}</h3>
              <p className="mt-2">{tutor.email}</p>
              <div className="mt-4">
                <button
                  className="px-4 py-2 bg-orange-400 text-white rounded hover:bg-orange-200"
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

import StudySessionCard from "./StudySessionCard";

const StudySession = ({ studySessions }) => {
    console.log(studySessions);
//     const MAX_SESSIONS_DISPLAY = 6;
//   const displaySessions = studySessions.slice(0, MAX_SESSIONS_DISPLAY);
    return (
        <div>
                  {/* Section Header */}
      <div className="text-center mb-8">
        <h2 className="text-3xl font-bold text-blue-600">Study Sessions</h2>
        <p className="text-gray-600 mt-2">
          Explore ongoing and upcoming sessions
        </p>
      </div>
        <div className="grid  grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 mx-20 border">
          {/* {displaySessions.map((session) => ( */}
          {studySessions.map((session) => (
            <StudySessionCard key={session.id} session={session}></StudySessionCard>
          ))}
        </div>

        {/* <h2 className="text-[40px] font-bold text-center mt-20 mb-10">Books</h2> */}

      {/* <div className="grid  grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 mx-20 border">
        {books.map((book) => (
          <BookCard book={book} key={book.bookId}></BookCard>
        ))}
      </div> */}
        {/* {studySessions.length > MAX_SESSIONS_DISPLAY && (
          <div className="text-center mt-8">
            <button className="px-6 py-2 bg-blue-600 text-white rounded hover:bg-blue-700">
              See All Sessions
            </button>
          </div>
        )} */}
      </div>
    );
};

export default StudySession;
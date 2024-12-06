import { useState } from "react";
import StudySessionCard from "./StudySessionCard";
import useSession from "../../hooks/useSession";

const StudySession = () => {
    const [studySessions] = useSession();
      // State to track whether to show all sessions or only the limited view
  const [showAll, setShowAll] = useState(false);

  const MAX_SESSIONS_DISPLAY = 6;

  // Determine which sessions to display based on the "showAll" state
  const displaySessions = showAll
    ? studySessions
    : studySessions.slice(0, MAX_SESSIONS_DISPLAY);

  return (
    <div>
      {/* Section Header */}
      <div className="text-center mb-8">
        <h2 className="text-3xl font-bold text-blue-600">Study Sessions</h2>
        <p className="text-gray-600 mt-2">
          Explore ongoing and upcoming sessions
        </p>
      </div>

      {/* Sessions Grid */}
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 mx-20 border">
        {displaySessions.map((session) => (
          <StudySessionCard key={session.id} session={session}></StudySessionCard>
        ))}
      </div>

      {/* See All Button */}
      {studySessions.length > MAX_SESSIONS_DISPLAY && (
        <div className="text-center mt-8">
          <button
            onClick={() => setShowAll(!showAll)}
            className="px-6 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
          >
            {showAll ? "Show Less" : "See All Sessions"}
          </button>
        </div>
      )}
    </div>
  );
};

export default StudySession;

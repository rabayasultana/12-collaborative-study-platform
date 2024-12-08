import { useEffect, useState } from "react";
import useAuth from "./useAuth";

const useTutorSession = () => {
  const { user } = useAuth();
  const [studySessions, setStudySessions] = useState([]);
  const [loading, setLoading] = useState(true);
  // fetch data
  useEffect(() => {
    if (!user?.email) {
      setStudySessions([]);
      setLoading(false);
      return;
    }
    fetch("http://localhost:9000/session")
      .then((res) => res.json())
      .then((data) => {
        const filteredSessions = data.filter(
          (session) => session.tutorEmail === user.email
        );
        setStudySessions(filteredSessions);
        setLoading(false);
      });
  }, [user?.email]);
  return [studySessions, loading];
};

export default useTutorSession;

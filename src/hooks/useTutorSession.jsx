import { useEffect, useState } from "react";
import useAuth from "./useAuth";

const useTutorSession = () => {
    const { user } = useAuth(); 
    const [studySessions, setStudySessions] = useState([]);
    const [loading, setLoading] = useState(true);
    // fetch data
    useEffect( () => {
    if (!user?.email) {
        setStudySessions([]);
        setLoading(false);
        return;
      }
               fetch('http://localhost:9000/session')
        .then(res => res.json())
        .then(data => {
    const filteredSessions = data.filter(
        (session) => session.tutorEmail === user.email
      );
            setStudySessions(filteredSessions)
            setLoading(false);
    });
    }, [user?.email])
    return [studySessions, loading];
};

export default useTutorSession;

// import { useEffect, useState } from "react";
// import useAuth from "./useAuth"; // Assuming you have a `useAuth` hook

// const useTutorSession = () => {
//   const { user } = useAuth(); // Get the logged-in user's information
//   const [studySessions, setStudySessions] = useState([]);
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     if (!user?.email) {
//       setStudySessions([]);
//       setLoading(false);
//       return;
//     }

//     const fetchUserSessions = async () => {
//       try {
//         const response = await fetch('http://localhost:9000/session');
//         const data = await response.json();

//         // Filter sessions by the logged-in user's email
//         const filteredSessions = data.filter(
//           (session) => session.tutorEmail === user.email
//         );

//         setStudySessions(filteredSessions);
//       } catch (error) {
//         console.error("Error fetching sessions:", error);
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchUserSessions();
//   }, [user?.email]);

//   return [studySessions, loading];
// };

// export default useTutorSession;

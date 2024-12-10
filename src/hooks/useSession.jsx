import { useEffect, useState } from "react";

const useSession = () => {
    const [studySessions, setStudySessions] = useState([]);
    const [loading, setLoading] = useState(true);
    useEffect( () => {
        fetch('https://12-study-platform-server.vercel.app/session')
        .then(res => res.json())
        .then(data => {
            setStudySessions(data)
            // console.log(data);
            setLoading(false);
    });
    }, [])

    return [studySessions, loading]
};

export default useSession;
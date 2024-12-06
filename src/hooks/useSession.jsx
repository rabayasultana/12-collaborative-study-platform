import { useEffect, useState } from "react";

const useSession = () => {
    const [studySessions, setStudySessions] = useState([]);
    const [loading, setLoading] = useState(true);
    useEffect( () => {
        fetch('http://localhost:9000/session')
        .then(res => res.json())
        .then(data => {
            setStudySessions(data)
            setLoading(false);
    });
    }, [])

    return [studySessions, loading]
};

export default useSession;
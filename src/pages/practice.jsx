useEffect(() => {
    // Check if the user has already booked the session (You can query this from the backend or session data)
    const checkBooking = async () => {
      const response = await fetch(`/bookedSessions?sessionId=${session._id}&studentEmail=${user?.email}`);
      const data = await response.json();
      if (data.length > 0) {
        setIsBooked(true);
      }
    };

    if (user) checkBooking();
  }, [user, session._id]);

  useEffect(() => {
    if (user?.email) {
      axiosSecure
        .get(`/bookedSessions?sessionId=${session._id}&studentEmail=${user?.email}`)
        .then((res) => {
            if (res.data.length > 0) {
                setIsBooked(true);
              }
            // console.log(res.data);
        })
        .catch((err) => {
          console.error(err);
        });
    }
  }, [axiosSecure, user?.email]);
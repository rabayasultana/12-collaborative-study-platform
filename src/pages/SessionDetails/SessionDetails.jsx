import { useState, useEffect } from "react";
import { useLoaderData, useNavigate } from "react-router-dom";
import useAuth from "../../hooks/useAuth";
import Swal from "sweetalert2";
import useAdmin from "../../hooks/useAdmin";
import useTutor from "../../hooks/useTutor";
import useAxiosSecure from "../../hooks/useAxiosSecure";

const SessionDetails = () => {
  const session = useLoaderData();
  const { user } = useAuth();
  const [isAdmin] = useAdmin();
  const [isTutor] = useTutor();
  const navigate = useNavigate();
  const [isBooked, setIsBooked] = useState(false);
  const [reviews, setReviews] = useState([]);
  const axiosSecure = useAxiosSecure();

  useEffect(() => {
    if (session._id) {
      axiosSecure
        .get(`/reviews/${session._id}`)
        .then((res) => {
          // console.log("Fetched materials:", res.data);
          setReviews(res.data); // Update materials
        })
        .catch((err) => {
          console.error("Error fetching reviews:", err);
          setReviews([]);
        });
    }
  }, [session._id, axiosSecure]);

  // Check if the session has already been booked
  useEffect(() => {
    if (user?.email) {
      axiosSecure
        .get(
          `/bookedSessions?sessionId=${session._id}&studentEmail=${user?.email}`
        )
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
  }, [axiosSecure, user?.email, session._id]);

  // Handle booking action
  const handleBookNow = () => {
    const newBookedSession = {
      title: session.title,
      tutorName: session.tutorName,
      description: session.description,
      registrationStart: session.registrationStart,
      registrationEnd: session.registrationEnd,
      classStart: session.classStart,
      classEnd: session.classEnd,
      duration: session.duration,
      fee: session.fee,
      status: session.status,
      sessionId: session._id,
      studentEmail: user.email,
      tutorEmail: session.tutorEmail,
    };

    if (session?.fee == "0" || isBooked) {
      axiosSecure
        .post("/bookedSession", newBookedSession)
        .then((res) => {
          console.log(res.data);
          if (res.data.insertedId) {
            Swal.fire({
              title: "Success!",
              text: "Session booked successfully",
              icon: "success",
              confirmButtonText: "Ok",
            });
            setIsBooked(null);
            window.location.reload();
          }
        })
        .catch((err) => {
          console.error(err);
        });
    } else {
      // Redirect to payment page if session is paid
      navigate("/dashboard/payment", { state: { session } });
    }
  };

  const startDate = new Date(session.registrationStart);
  const endDate = new Date(session.registrationEnd);
  const currentDate = new Date();
  const status2 =
    currentDate >= startDate && currentDate <= endDate ? "ongoing" : "closed";

  return (
    <div className="session-details-container max-w-3xl mx-auto p-6 bg-white rounded-lg shadow-lg">
      {/* Title */}
      <h2 className="text-3xl font-bold text-center text-gray-800 mb-6">
        {session.title}
      </h2>

      {/* Session Info */}
      <div className="session-info space-y-4 text-gray-700">
        <p>
          <strong className="font-semibold">Tutor Name:</strong>{" "}
          {session.tutorName}
        </p>
        <p>
          <strong className="font-semibold">Average Rating: </strong>
          {reviews && reviews.length > 0 ? (
            <>
              {/* Calculate and display the average rating */}
              {(
                reviews.reduce(
                  (sum, review) => sum + Number(review.rating),
                  0
                ) / reviews.length
              ).toFixed(1)}{" "}
            </>
          ) : (
            <strong className="text-gray-500">No ratings</strong>
          )}
        </p>

        <p>
          <strong className="font-semibold">Description:</strong>{" "}
          {session.description}
        </p>
        <p>
          <strong className="font-semibold">Registration Start:</strong>{" "}
          {new Date(session.registrationStart).toLocaleDateString()}
        </p>
        <p>
          <strong className="font-semibold">Registration End:</strong>{" "}
          {new Date(session.registrationEnd).toLocaleDateString()}
        </p>
        <p>
          <strong className="font-semibold">Class Start Date:</strong>{" "}
          {new Date(session.classStart).toLocaleDateString()}
        </p>
        <p>
          <strong className="font-semibold">Class End Date:</strong>{" "}
          {new Date(session.classEnd).toLocaleDateString()}
        </p>
        <p>
          <strong className="font-semibold">Session Duration:</strong>{" "}
          {session.duration} hours
        </p>
        <p>
          <strong className="font-semibold">Registration Fee:</strong>{" "}
          {session.fee == "0" ? "Free" : `$${session.fee}`}
        </p>
      </div>

      {/* Reviews */}
      <div className="reviews mt-6 border-t pt-4">
        <h4 className="text-lg font-semibold text-gray-800 mb-4">Reviews:</h4>
        {reviews && reviews.length > 0 ? (
          reviews.map((review) => (
            <div key={review._id} className="review border-b py-4">
              <p>{review.review}</p>
            </div>
          ))
        ) : (
          <p className="text-gray-500">No reviews yet.</p>
        )}
      </div>

      {/* Booking Button */}
      <div className="mt-6 flex justify-center space-x-4">
        {status2 === "ongoing" && !isAdmin && !isTutor && !isBooked && (
          <button
            onClick={handleBookNow}
            className="btn bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-6 rounded-md shadow-md transition duration-300"
          >
            {session.fee == "0" ? "Book Now (Free)" : "Book Now"}
          </button>
        )}

        {status2 === "ongoing" && (isAdmin || isTutor) && (
          <button
            disabled
            className="btn bg-gray-400 text-white font-semibold py-2 px-6 rounded-md shadow-md cursor-not-allowed"
          >
            Booking Disabled for Admin/Tutor
          </button>
        )}

        {status2 === "closed" && (
          <button
            disabled
            className="btn bg-gray-400 text-white font-semibold py-2 px-6 rounded-md shadow-md cursor-not-allowed"
          >
            Registration Closed
          </button>
        )}

        {isBooked && (
          <button
            disabled
            className="btn bg-gray-400 text-white font-semibold py-2 px-6 rounded-md shadow-md cursor-not-allowed"
          >
            Already Booked
          </button>
        )}
      </div>
    </div>
  );
};

export default SessionDetails;

import  { useState, useEffect } from 'react';
import { useLoaderData, useNavigate } from 'react-router-dom';
import { useMutation } from '@tanstack/react-query';
import useAuth from '../../hooks/useAuth';
import Swal from 'sweetalert2';
import useAdmin from '../../hooks/useAdmin';
import useTutor from '../../hooks/useTutor';
import useAxiosSecure from '../../hooks/useAxiosSecure';

// Fetch session details based on the session ID
// const fetchSessionDetails = async (sessionId) => {
//   const response = await fetch(`/sessions/${sessionId}`);
//   if (!response.ok) {
//     throw new Error('Session details not found');
//   }
//   return response.json();
// };

// // Mutation to handle booking session
// const bookSession = async (bookingData) => {
//   const response = await fetch('/bookedSessions', {
//     method: 'POST',
//     headers: { 'Content-Type': 'application/json' },
//     body: JSON.stringify(bookingData),
//   });

//   if (!response.ok) {
//     throw new Error('Booking failed');
//   }
//   return response.json();
// };

const SessionDetails = () => {
  const session = useLoaderData();
  const { user} = useAuth();
//   const { user, isAdmin, isTutor } = useAuth();
  const [isAdmin] = useAdmin();
    const [isTutor] = useTutor();
  const navigate = useNavigate();
  const [isBooked, setIsBooked] = useState(false);
  const axiosSecure = useAxiosSecure();

  

  // Check if the session has already been booked
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
  }, [axiosSecure, user?.email, session._id]);

//   // Use Tanstack Query for booking the session
//   const { mutate: bookNow } = useMutation(bookSession, {
//     onSuccess: (data) => {
//       Swal.fire('Success', 'Session booked successfully!', 'success');
//       setIsBooked(true);
//     },
//     onError: (error) => {
//       Swal.fire('Error', error.message, 'error');
//     },
//   });

  // Handle booking action
  const handleBookNow = () => {
    // if (!user) {
    //   // Redirect to login if not logged in
    //   navigate('/login');
    // } else if (session.registrationFee === 0 || isBooked) {
    //   // Book session directly if free or already booked
    //   const bookingData = {
    //     sessionId: session._id,
    //     studentEmail: user.email,
    //     tutorEmail: session.tutorEmail,
    //   };
    //   bookNow(bookingData);
    // } else {
    //   // Redirect to payment page if session is paid
    //   navigate('/payment', { state: { sessionId: session._id, studentEmail: user.email } });
    // }

    const newBookedSession = {
        ...session,
        sessionId: session._id,
            studentEmail: user.email,
            tutorEmail: session.tutorEmail,
      }
    
        if (session?.fee == '0' || isBooked) {
          axiosSecure
            .post('/bookedSession', newBookedSession)
            .then((res) => {
                console.log(res.data);
                if (res.data.insertedId) {
                    Swal.fire({
                      title: "Success!",
                      text: "Booked session uploaded successfully",
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
        }
        else {
              // Redirect to payment page if session is paid
              navigate('/payment', { state: { sessionId: session._id, studentEmail: user.email } });
            }
      };


  const startDate = new Date(session.registrationStart);
  const endDate = new Date(session.registrationEnd);
  const currentDate = new Date();
  const status = currentDate >= startDate && currentDate <= endDate ? 'ongoing' : 'closed';

  return (
    <div className="session-details-container max-w-3xl mx-auto p-6 bg-white rounded-lg shadow-lg">
    {/* Title */}
    <h2 className="text-3xl font-bold text-center text-gray-800 mb-6">{session.title}</h2>
  
    {/* Session Info */}
    <div className="session-info space-y-4 text-gray-700">
      <p><strong className="font-semibold">Tutor Name:</strong> {session.tutorName}</p>
      <p><strong className="font-semibold">Average Rating:</strong> {session.averageRating}</p>
      <p><strong className="font-semibold">Description:</strong> {session.description}</p>
      <p><strong className="font-semibold">Registration Start:</strong> {new Date(session.registrationStart).toLocaleDateString()}</p>
      <p><strong className="font-semibold">Registration End:</strong> {new Date(session.registrationEnd).toLocaleDateString()}</p>
      <p><strong className="font-semibold">Class Start Date:</strong> {new Date(session.classStart).toLocaleDateString()}</p>
      <p><strong className="font-semibold">Class End Date:</strong> {new Date(session.classEnd).toLocaleDateString()}</p>
      <p><strong className="font-semibold">Session Duration:</strong> {session.duration} hours</p>
      <p><strong className="font-semibold">Registration Fee:</strong> {session.fee == '0' ? 'Free' : `$${session.fee}`}</p>
    </div>
  
    {/* Reviews */}
    <div className="reviews mt-6 border-t pt-4">
      <h4 className="text-lg font-semibold text-gray-800 mb-4">Reviews:</h4>
      {session.reviews && session.reviews.length > 0 ? (
        session.reviews.map((review, index) => (
          <div key={index} className="review border-b py-4">
            <p><strong>{review.studentName}:</strong> {review.comment}</p>
            <p><strong>Rating:</strong> {review.rating}</p>
          </div>
        ))
      ) : (
        <p className="text-gray-500">No reviews yet.</p>
      )}
    </div>
  
    {/* Booking Button */}
    <div className="mt-6 flex justify-center space-x-4">
      {status === 'ongoing' && !isAdmin && !isTutor && !isBooked && (
        <button
          onClick={handleBookNow}
          className="btn bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-6 rounded-md shadow-md transition duration-300"
        >
          {session.fee == '0' ? 'Book Now (Free)' : 'Book Now'}
        </button>
      )}
  
      {status === 'ongoing' && (isAdmin || isTutor) && (
        <button
          disabled
          className="btn bg-gray-400 text-white font-semibold py-2 px-6 rounded-md shadow-md cursor-not-allowed"
        >
          Booking Disabled for Admin/Tutor
        </button>
      )}
  
      {status === 'closed' && (
        <button
          disabled
          className="btn bg-gray-400 text-white font-semibold py-2 px-6 rounded-md shadow-md cursor-not-allowed"
        >
          Registration Closed
        </button>
      )}

{ isBooked  && (
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

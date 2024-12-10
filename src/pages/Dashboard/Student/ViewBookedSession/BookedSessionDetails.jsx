import useAxiosSecure from "../../../../hooks/useAxiosSecure";
import Swal from "sweetalert2";

const BookedSessionDetails = ({ session, onClose }) => {
    const axiosSecure = useAxiosSecure();

  const handleReviewSubmit = (event) => {
    event.preventDefault();
    const form = new FormData(event.currentTarget);
    const review = form.get("review");
    const rating = form.get("rating");
    const newReview = {
      sessionId: session.sessionId,
      studentEmail: session.studentEmail,
      review,
      rating,
    };
    console.log(newReview);

    axiosSecure
      .post("/reviews", newReview)
      .then((res) => {
        if (res.data.insertedId) {
          Swal.fire({
            title: "Success!",
            text: "Your review has been posted.",
            icon: "success",
            confirmButtonText: "Ok",
          });
        }
      })
      .catch((err) => {
        console.error("Error posting review:", err);
      });
  };
    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
        <div className="bg-white rounded-lg shadow-lg p-6 max-w-lg w-full relative">
          <button
            className="absolute top-2 right-2  text-orange-700 hover:text-gray-700"
            onClick={onClose}
          >
            ×
          </button>
          <h2 className="text-3xl font-bold text-purple">{session.title}</h2>
          <p className="text-gray-600 mt-2">Tutor: {session.tutorName}</p>
          <p className="text-gray-600 mt-1">Date: {new Date(session.classStart).toLocaleString()}</p>
          <p className="text-gray-600 mt-1">Duration: {session.duration} hours</p>
          <p className="text-gray-600 mt-1">Description: {session.description}</p>
  
          <hr className="my-4" />
  
          <form onSubmit={handleReviewSubmit}>
            <textarea
              className="w-full p-2 border border-gray-300 rounded mb-2"
              placeholder="Write your review..."
              name="review"
              required
            />
            <div className="flex items-center mb-4">
              <label htmlFor="rating" className="mr-2 text-gray-600">
                Rating:
              </label>
              <input
                type="number"
                id="rating"
                min="1"
                max="5"
                name="rating"
                className="w-16 p-2 border border-gray-300 rounded"
                required
              />
            </div>
            <button
              type="submit"
              className="px-4 py-2 bg-purple text-white rounded hover:bg-opacity-50"
            >
              Submit Review
            </button>
          </form>
        </div>
      </div>
    );
  };

export default BookedSessionDetails;
import { useRef } from "react";
import useAuth from "../../../../hooks/useAuth";
import useAxiosSecure from "../../../../hooks/useAxiosSecure";
import Swal from "sweetalert2";

const CreateNote = () => {
  const { user } = useAuth() || {};
  const axiosSecure = useAxiosSecure();
//   const [success, setSuccess] = useState("");
//   const [createError, setCreateError] = useState("");

  const formRef = useRef();

  const handleSubmit = (event) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const noteData = Object.fromEntries(formData.entries());
    console.log(noteData);

    //success and error handling
    // setSuccess("");
    // setCreateError("");
    // send sessiondata to the database
    axiosSecure.post("/note", noteData).then((res) => {
      // console.log(res.data);
      if (res.data.insertedId) {
        Swal.fire({
          title: "Success!",
          text: "Note created Successfully",
          icon: "success",
          confirmButtonText: "Ok",
        });
        // Reset the form
        formRef.current.reset();
      }
    });
  };
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 py-12 px-6">
      <div className="max-w-lg w-full bg-white shadow-md rounded-lg p-8">
        <h2 className="text-3xl font-bold text-center text-purple mb-6">
          Create a Note
        </h2>

        <form ref={formRef} onSubmit={handleSubmit}>
          {/* Email (ReadOnly) */}
          <div className="mb-4">
            <label className="block text-gray-700 font-medium mb-2">
              Email
            </label>
            <input
              type="email"
              name="studentEmail"
              defaultValue={user?.email || ""}
              readOnly
              className="w-full px-4 py-2 border rounded-md bg-gray-100 text-gray-500"
            />
          </div>

          {/* Title */}
          <div className="mb-4">
            <label className="block text-gray-700 font-medium mb-2">
              Title
            </label>
            <input
              type="text"
              name="title"
              placeholder="Enter your note title"
              className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring focus:ring-blue-300"
              required
            />
          </div>

          {/* Description */}
          <div className="mb-6">
            <label className="block text-gray-700 font-medium mb-2">
              Description
            </label>
            <textarea
              name="description"
              placeholder="Write your note here..."
              rows="5"
              className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring focus:ring-blue-300"
              required
            ></textarea>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full bg-purple text-white py-2 rounded-md hover:bg-opacity-50 transition duration-300"
          >
            Create Note
          </button>
        </form>
      </div>
    </div>
  );
};

export default CreateNote;

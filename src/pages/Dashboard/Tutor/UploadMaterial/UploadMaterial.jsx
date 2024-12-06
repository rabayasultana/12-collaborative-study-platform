import { useEffect, useState } from "react";
import Swal from "sweetalert2";
import useAuth from "../../../../hooks/useAuth";
import useAxiosSecure from "../../../../hooks/useAxiosSecure";

const UploadMaterials = () => {
  const { user } = useAuth() || {};
  const axiosSecure = useAxiosSecure();
  const [approvedSessions, setApprovedSessions] = useState([]);
  const [selectedSession, setSelectedSession] = useState(null);
  const [disabledSessionId, setDisabledSessionId] = useState(null);

  // Fetch approved sessions for the logged-in tutor
  useEffect(() => {
    if (user?.email) {
      axiosSecure
        .get(`/approvedSessions?email=${user.email}`)
        .then((res) => {
          setApprovedSessions(res.data);
        })
        .catch((err) => {
          console.error("Failed to fetch approved sessions:", err);
        });
    }
  }, [axiosSecure, user?.email]);

  // Handle file upload to ImgBB
  const uploadImage = async (imageFile) => {
    const formData = new FormData();
    formData.append("image", imageFile);

    const response = await fetch(
      `https://api.imgbb.com/1/upload?key=YOUR_IMGBB_API_KEY`,
      {
        method: "POST",
        body: formData,
      }
    );
    const data = await response.json();
    return data.data.display_url;
  };

  // Handle material submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    const form = e.target;
    const title = form.title.value;
    const sessionId = selectedSession ? selectedSession._id : null;
    const tutorEmail = user.email;
    const driveLink = form.driveLink.value;
    const imageFile = form.image.files[0];

    // Upload the image to ImgBB
    let imageUrl = "";
    if (imageFile) {
      imageUrl = await uploadImage(imageFile);
    }

    // Create material data
    const newMaterial = {
      title,
      sessionId,
      tutorEmail,
      imageUrl,
      driveLink,
    };

    // Save material to the database
    axiosSecure.post("/materials", newMaterial).then((res) => {
      if (res.data.insertedId) {
        Swal.fire({
          title: "Success!",
          text: "Material uploaded successfully",
          icon: "success",
          confirmButtonText: "Ok",
        });
        form.reset();
        setSelectedSession(null);
        setDisabledSessionId(null); // Enable all buttons
      }
    });
  };

  return (
    <div className="flex">
      {/* Sidebar for approved sessions */}
      <div className="w-1/3 bg-gray-100 p-4">
        <h2 className="text-xl font-bold text-purple">Approved Sessions</h2>
        <div className="mt-4 space-y-4">
          {approvedSessions.map((session) => (
            <div
              key={session._id}
              className="border p-4 rounded bg-white shadow-sm"
            >
              <h3 className="font-bold text-gray-800">{session.title}</h3>
              <p className="text-sm text-gray-600">{session.description}</p>
              <button
                onClick={() => {
                  setSelectedSession(session);
                  setDisabledSessionId(session._id); // Disable the clicked button
                }}
                className="mt-2 px-4 py-2 bg-purple text-white rounded hover:bg-purple hover:bg-opacity-40"
                disabled={disabledSessionId === session._id} // Disable if this session is selected
              >
                Upload Material
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* Form for uploading materials */}
      <div className="w-2/3 p-6">
        <h1 className="text-2xl font-bold text-purple text-center">
          Upload Materials
        </h1>

        <form
          onSubmit={handleSubmit}
          className="card-body md:w-3/4 lg:w-1/2 mx-auto"
        >
          <div className="form-control">
            <label className="label">
              <span className="label-text">Title</span>
            </label>
            <input
              type="text"
              name="title"
              placeholder="Material Title"
              className="input input-bordered"
              required
            />
          </div>

          <div className="form-control">
            <label className="label">
              <span className="label-text">Selected Session ID</span>
            </label>
            <input
              type="text"
              value={selectedSession ? selectedSession._id : "No session selected"}
              className="input input-bordered"
              readOnly
            />
          </div>

          <div className="form-control">
            <label className="label">
              <span className="label-text">Tutor Email</span>
            </label>
            <input
              type="email"
              value={user?.email}
              className="input input-bordered"
              readOnly
            />
          </div>

          <div className="form-control">
            <label className="label">
              <span className="label-text">Image</span>
            </label>
            <input type="file" name="image" className="input input-bordered" />
          </div>

          <div className="form-control">
            <label className="label">
              <span className="label-text">Google Drive Link</span>
            </label>
            <input
              type="text"
              name="driveLink"
              placeholder="Drive Link"
              className="input input-bordered"
            />
          </div>

          <div className="form-control mt-6">
            <button
              className="btn bg-purple text-white text-xl"
              disabled={!selectedSession} 
            >
              Confirm
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default UploadMaterials;

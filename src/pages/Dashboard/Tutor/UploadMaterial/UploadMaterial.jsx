import { useEffect, useState } from "react";
import Swal from "sweetalert2";
import useAuth from "../../../../hooks/useAuth";
import useAxiosSecure from "../../../../hooks/useAxiosSecure";

const image_hosting_key = import.meta.env.VITE_IMAGE_HOSTING_KEY;
const image_hosting_api = `https://api.imgbb.com/1/upload?key=${image_hosting_key}`;

const UploadMaterials = () => {
  const { user } = useAuth() || {};
  const axiosSecure = useAxiosSecure();
  const [approvedSessions, setApprovedSessions] = useState([]);
  const [selectedSession, setSelectedSession] = useState(null);
  const [disabledSessionId, setDisabledSessionId] = useState(null);
  const [selectedFiles, setSelectedFiles] = useState([]); // State to store selected files
  const [driveLinks, setDriveLinks] = useState([""]);
  const [existingMaterial, setExistingMaterial] = useState(null); // New state to hold existing material data

  // Fetch approved sessions for the logged-in tutor
  useEffect(() => {
    if (user?.email) {
      axiosSecure
        .get(`/approvedSessions?email=${user.email}`)
        .then((res) => {
          setApprovedSessions(res.data);
        })
        .catch((err) => {
          console.error(err);
        });
    }
  }, [axiosSecure, user?.email]);

  // Fetch the existing material if it exists for the selected session
  useEffect(() => {
    if (selectedSession) {
      axiosSecure
        .get(`/materials?sessionId=${selectedSession._id}&tutorEmail=${user.email}`)
        .then((res) => {
          if (res.data.length > 0) {
            setExistingMaterial(res.data[0]); // Set the existing material to state
          } else {
            setExistingMaterial(null); // No material found, reset state
          }
        })
        .catch((err) => {
          console.error("Error fetching existing material:", err);
        });
    }
  }, [selectedSession, user?.email, axiosSecure]);

  // Handle file upload to ImgBB
  const uploadImage = async (imageFile) => {
    console.log(imageFile);
    const formData = new FormData();
    formData.append("image", imageFile);

    const response = await fetch(
      image_hosting_api,
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

    let imageUrls = [];

    // Upload each image to ImgBB or any other service
    if (selectedFiles.length > 0) {
      for (let i = 0; i < selectedFiles.length; i++) {
        const imageUrl = await uploadImage(selectedFiles[i]);
        imageUrls.push(imageUrl);
      }
    }

    // Prepare the data to send to the backend
    const newMaterial = {
      title,
      sessionId,
      tutorEmail,
      imageUrls, // Array of image URLs
      driveLinks, // Array of drive links
    };
    
 // Check if material already exists for this session
 if (existingMaterial) {
    // Update existing material (PUT request)
    axiosSecure
      .put(`/materials/${existingMaterial._id}`, newMaterial) // Assume you have the material ID
      .then((res) => {
        if (res.data.modifiedCount > 0) {
          Swal.fire({
            title: "Success!",
            text: "Material updated successfully",
            icon: "success",
            confirmButtonText: "Ok",
          });
          form.reset();
          setSelectedSession(null);
          setExistingMaterial(null); // Reset the existing material state
        }
      })
      .catch((err) => {
        console.error("Error updating material:", err);
      });
  } else {
    // Create new material (POST request)
    axiosSecure
      .post("/materials", newMaterial)
      .then((res) => {
        if (res.data.insertedId) {
          Swal.fire({
            title: "Success!",
            text: "Material uploaded successfully",
            icon: "success",
            confirmButtonText: "Ok",
          });
          form.reset();
          setSelectedSession(null);
        }
      })
      .catch((err) => {
        console.error("Error uploading material:", err);
      });
  }
};

  // Handle adding more Drive Links
  const handleAddDriveLink = () => {
    setDriveLinks([...driveLinks, ""]);
  };

  const handleDriveLinkChange = (index, value) => {
    const newDriveLinks = [...driveLinks];
    newDriveLinks[index] = value;
    setDriveLinks(newDriveLinks);
  };

  // Handle file input change
  const handleFileChange = (e) => {
    const files = e.target.files;
    const filesArray = Array.from(files); // Convert the FileList to an array
    setSelectedFiles([...selectedFiles, ...filesArray]); // Add selected files to the state
  };

  // Handle remove image from the selected list
  const handleRemoveImage = (index) => {
    const newFiles = selectedFiles.filter((_, i) => i !== index);
    setSelectedFiles(newFiles);
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
              value={
                selectedSession ? selectedSession._id : "No session selected"
              }
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
              <span className="label-text">Images</span>
            </label>
            <input
              type="file"
              className="input input-bordered"
              onChange={handleFileChange}
              multiple
            />
          </div>

          <div className="mt-4">
            {selectedFiles.length > 0 && (
              <div>
                <h3 className="font-bold text-lg">Selected Files:</h3>
                <ul>
                  {selectedFiles.map((file, index) => (
                    <li key={index} className="flex justify-between items-center">
                      <span>{file.name}</span>
                      <button
                        type="button"
                        onClick={() => handleRemoveImage(index)}
                        className="text-red-500"
                      >
                        Remove
                      </button>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>

          <div className="form-control">
            <label className="label">
              <span className="label-text">Google Drive Links</span>
            </label>
            {driveLinks.map((link, index) => (
              <div key={index} className="flex items-center space-x-2">
                <input
                  type="text"
                  value={link}
                  onChange={(e) => handleDriveLinkChange(index, e.target.value)}
                  placeholder="Drive Link"
                  className="input input-bordered"
                />
                <button
                  type="button"
                  onClick={handleAddDriveLink}
                  className="btn bg-blue-500 text-white"
                >
                  Add More
                </button>
              </div>
            ))}
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

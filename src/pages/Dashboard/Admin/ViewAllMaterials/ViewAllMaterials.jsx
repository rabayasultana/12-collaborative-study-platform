import { useEffect, useState } from "react";
import useAxiosSecure from "../../../../hooks/useAxiosSecure";
import Swal from "sweetalert2";

const ViewAllMaterials = () => {
    const axiosSecure = useAxiosSecure();
    const [materials, setMaterials] = useState([]);
    const [updateMaterial, setUpdateMaterial] = useState(null);

    // Fetch all materials
    useEffect(() => {
          axiosSecure
            .get(`/materials`)
            .then((res) => {
                // console.log(res.data);
              setMaterials(res.data);
            })
            .catch((err) => {
              console.error("Failed to fetch materials:", err);
            });
      }, [axiosSecure]);

      //   Delete a material
  const handleDelete = (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "This material will be deleted permanently!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        axiosSecure
          .delete(`/materials/${id}`)
          .then((res) => {
            if (res.data.deletedCount > 0) {
              Swal.fire("Deleted!", "Material has been deleted.", "success");
              setMaterials(materials.filter((material) => material._id !== id));
            }
          })
          .catch((err) => {
            console.error("Failed to delete material:", err);
          });
      }
    });
  };

    // Handle update submission
    const handleUpdate = (e) => {
        e.preventDefault();
        const form = e.target;
    
        // Extract and parse the updated values
        const updatedTitle = form.title.value;
        const updatedDriveLinks = form.driveLinks.value
          .split('\n')
          .map((link) => link.trim())
          .filter((link) => link); // Filter out empty lines
        const updatedImageUrls = form.imageUrls.value
          .split('\n')
          .map((url) => url.trim())
          .filter((url) => url); // Filter out empty lines
    
        axiosSecure
          .patch(`/materials/${updateMaterial._id}`, {
            title: updatedTitle,
            driveLinks: updatedDriveLinks,
            imageUrls: updatedImageUrls,
          })
          .then((res) => {
            if (res.data.modifiedCount > 0) {
              Swal.fire(
                "Updated!",
                "Material has been updated successfully.",
                "success"
              );
              setMaterials((prev) =>
                prev.map((material) =>
                  material._id === updateMaterial._id
                    ? { ...material, title: updatedTitle, driveLinks: updatedDriveLinks, imageUrls: updatedImageUrls }
                    : material
                )
              );
              setUpdateMaterial(null); // Exit edit mode
            }
          })
          .catch((err) => {
            console.error("Failed to update material:", err);
          });
      };
    
  return (
    <div className="p-6 bg-gray-50 min-h-screen ">
      <h1 className="text-3xl font-bold text-center text-purple mb-8">
        View Materials
      </h1>

      {/* List of materials */}
      <div className="grid grid-cols-1 md:grid-cols-2">
        {materials.map((material) => (
          <div
            key={material._id}
            className="bg-white p-6 rounded-lg shadow-md hover:shadow-xl transition-all duration-300 min-h-80"
          >
            <div>
              <h2 className="text-2xl font-semibold text-purple text-center mb-4">
                {material.title}
              </h2>
              <p className="text-sm text-gray-600 mt-2">
                Session ID: {material.sessionId}
              </p>

              {/* Display Multiple Google Drive Links */}
              {material.driveLinks && material.driveLinks.length > 0 && (
                <div className="mt-4">
                  <h3 className="font-bold text-gray-700">
                    Google Drive Links:
                  </h3>
                  <ul className="list-disc ml-5 space-y-2 mt-2 overflow-auto max-h-48">
                    {material.driveLinks.map((driveLink, index) => (
                      <li key={index}>
                        <a
                          href={driveLink}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-blue-600 underline hover:text-blue-800"
                        >
                          {driveLink}
                        </a>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {/* Display Multiple Image Links */}
              {material.imageUrls && material.imageUrls.length > 0 && (
                <div className="mt-4">
                  <h3 className="font-bold text-gray-700">Image Links:</h3>
                  <ul className="list-disc ml-5 space-y-2 mt-2 overflow-auto max-h-48">
                    {material.imageUrls.map((imageUrl, index) => (
                      <li key={index}>
                        <a
                          href={imageUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-blue-600 underline hover:text-blue-800"
                        >
                          {imageUrl}
                        </a>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>

            <div className="mt-6 flex justify-center gap-4 items-center">
              <button
                onClick={() => setUpdateMaterial(material)} // Enter edit mode
                className="px-4 py-2 bg-purple text-white rounded-lg hover:bg-opacity-50 transition-colors duration-300"
              >
                Update
              </button>
              <button
                onClick={() => handleDelete(material._id)}
                className="px-4 py-2 bg-orange-600 text-white rounded-lg hover:bg-orange-700 transition-colors duration-300"
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Edit material modal */}
      {updateMaterial && (
        <div className="fixed inset-0 bg-gray-800 bg-opacity-50 flex justify-center items-center">
          <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-lg">
            <h2 className="text-2xl font-semibold text-purple mb-6">
              Edit Material
            </h2>
            <form onSubmit={handleUpdate} className="space-y-4">
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Title</span>
                </label>
                <input
                  type="text"
                  name="title"
                  defaultValue={updateMaterial.title}
                  className="input input-bordered w-full"
                  required
                />
              </div>

              {/* update multiple Google Drive Links */}
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Google Drive Links</span>
                </label>
                <textarea
                  name="driveLinks"
                  defaultValue={
                    updateMaterial.driveLinks
                      ? updateMaterial.driveLinks.join("\n")
                      : " "
                  }
                  className="input input-bordered w-full"
                  placeholder=""
                  rows="4"
                />
              </div>

              {/* update multiple image URLs */}
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Image URLs</span>
                </label>
                <textarea
                  name="imageUrls"
                  defaultValue={
                    updateMaterial.imageUrls
                      ? updateMaterial.imageUrls.join("\n")
                      : " "
                  }
                  className="input input-bordered w-full"
                  placeholder=""
                  rows="4"
                />
              </div>

              <div className="flex justify-end space-x-2 mt-6">
                <button
                  type="button"
                  onClick={() => setUpdateMaterial(null)} // Exit edit mode
                  className="px-4 py-2 bg-orange-700 text-white rounded-lg hover:bg-orange-600"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-purple text-white rounded-lg hover:bg-opacity-50"
                >
                  Save Changes
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default ViewAllMaterials;

import { useEffect, useState } from "react";
import Swal from "sweetalert2";
import useAuth from "../../../../hooks/useAuth";
import useAxiosSecure from "../../../../hooks/useAxiosSecure";

const ViewMaterials = () => {
  const { user } = useAuth() || {};
  const axiosSecure = useAxiosSecure();
  const [materials, setMaterials] = useState([]);
  const [editingMaterial, setEditingMaterial] = useState(null); // For edit mode

  // Fetch all materials uploaded by the tutor
  useEffect(() => {
    if (user?.email) {
      axiosSecure
        .get(`/materials?tutorEmail=${user.email}`)
        .then((res) => {
          setMaterials(res.data);
        })
        .catch((err) => {
          console.error("Failed to fetch materials:", err);
        });
    }
  }, [axiosSecure, user?.email]);

  // Delete a material
  const handleDelete = (materialId) => {
    Swal.fire({
      title: "Are you sure?",
      text: "This material will be deleted permanently!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        axiosSecure
          .delete(`/materials/${materialId}`)
          .then((res) => {
            if (res.data.deletedCount > 0) {
              Swal.fire("Deleted!", "Material has been deleted.", "success");
              setMaterials(materials.filter((material) => material._id !== materialId));
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
    const updatedTitle = form.title.value;
    const updatedDriveLink = form.driveLink.value;

    axiosSecure
      .put(`/materials/${editingMaterial._id}`, {
        title: updatedTitle,
        driveLink: updatedDriveLink,
      })
      .then((res) => {
        if (res.data.modifiedCount > 0) {
          Swal.fire("Updated!", "Material has been updated successfully.", "success");
          setMaterials((prev) =>
            prev.map((material) =>
              material._id === editingMaterial._id
                ? { ...material, title: updatedTitle, driveLink: updatedDriveLink }
                : material
            )
          );
          setEditingMaterial(null); // Exit edit mode
        }
      })
      .catch((err) => {
        console.error("Failed to update material:", err);
      });
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold text-purple text-center">View Materials</h1>

      {/* List of materials */}
      <div className="mt-6 space-y-4">
        {materials.map((material) => (
          <div
            key={material._id}
            className="border p-4 rounded bg-white shadow-md flex justify-between items-center"
          >
            <div>
              <h2 className="text-lg font-bold text-gray-800">{material.title}</h2>
              <p className="text-sm text-gray-600">Session ID: {material.sessionId}</p>
              <a
                href={material.driveLink}
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-600 underline"
              >
                View Drive Link
              </a>
            </div>
            <div className="flex space-x-2">
              <button
                onClick={() => setEditingMaterial(material)} // Enter edit mode
                className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
              >
                Edit
              </button>
              <button
                onClick={() => handleDelete(material._id)}
                className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Edit material modal */}
      {editingMaterial && (
        <div className="fixed inset-0 bg-gray-800 bg-opacity-50 flex justify-center items-center">
          <div className="bg-white p-6 rounded shadow-lg w-full max-w-lg">
            <h2 className="text-xl font-bold text-purple">Edit Material</h2>
            <form onSubmit={handleUpdate} className="mt-4 space-y-4">
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Title</span>
                </label>
                <input
                  type="text"
                  name="title"
                  defaultValue={editingMaterial.title}
                  className="input input-bordered"
                  required
                />
              </div>
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Google Drive Link</span>
                </label>
                <input
                  type="text"
                  name="driveLink"
                  defaultValue={editingMaterial.driveLink}
                  className="input input-bordered"
                  required
                />
              </div>
              <div className="flex justify-end space-x-2">
                <button
                  type="button"
                  onClick={() => setEditingMaterial(null)} // Exit edit mode
                  className="px-4 py-2 bg-gray-400 text-white rounded hover:bg-gray-500"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-purple text-white rounded hover:bg-purple-600"
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

export default ViewMaterials;

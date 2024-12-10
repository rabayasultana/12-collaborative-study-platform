import { useEffect, useState } from "react";
import useAuth from "../../../../hooks/useAuth";
import useAxiosSecure from "../../../../hooks/useAxiosSecure";
import Swal from "sweetalert2";

const ViewNotes = () => {
    const { user } = useAuth();
    const axiosSecure = useAxiosSecure();
    const [notes, setNotes] = useState([]);


    // Fetch all notes for the logged-in user
  useEffect(() => {
    if (user?.email) {
      axiosSecure
        .get(`/studentNotes?studentEmail=${user.email}`)
        .then((res) => {
          setNotes(res.data);
        })
        .catch((err) => {
          console.error("Error fetching notes:", err);
        });
    }
  }, [axiosSecure, user?.email]);

  const handleDelete = (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        axiosSecure
          .delete(`/notes/${id}`)
          .then((res) => {
            if (res.data.deletedCount > 0) {
              Swal.fire("Deleted!", "Your note has been deleted.", "success");
              setNotes(notes.filter((note) => note._id !== id));
            }
          })
          .catch((err) => {
            console.error("Error deleting note:", err);
          });
      }
    });
  };

  // Update a note
  const handleUpdate = (note) => {
    Swal.fire({
      title: "Edit Note",
      html: `
        <input type="text" id="title" class="swal2-input" value="${note.title}" placeholder="Title">
        <textarea id="description" class="swal2-textarea" placeholder="Description">${note.description}</textarea>
      `,
      showCancelButton: true,
      confirmButtonText: "Save",
      preConfirm: () => {
        const title = document.getElementById("title").value;
        const description = document.getElementById("description").value;

        if (!title || !description) {
          Swal.showValidationMessage("Both fields are required.");
          return null;
        }
        return { title, description };
      },
    }).then((result) => {
      if (result.isConfirmed) {
        const updatedNote = {
          ...note,
          title: result.value.title,
          description: result.value.description,
        };

        axiosSecure
          .patch(`/notes/${note._id}`, updatedNote)
          .then((res) => {
            if (res.data.modifiedCount > 0) {
              Swal.fire("Updated!", "Your note has been updated.", "success");
              setNotes((prevNotes) =>
                prevNotes.map((n) => (n._id === note._id ? updatedNote : n))
              );
            }
          })
          .catch((err) => {
            console.error("Error updating note:", err);
          });
      }
    });
  };


    return (
        <div className="py-8 bg-gray-50">
        <h2 className="text-4xl font-bold text-center text-purple mb-6">
          Manage Your Notes
        </h2>
        <p className="text-center text-gray-600 mb-10">
          View, update, and delete your personal notes.
        </p>
  
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mx-auto max-w-6xl px-4">
          {notes.map((note) => (
            <div
              key={note._id}
              className="bg-white shadow-lg rounded-lg overflow-hidden transition transform hover:scale-105 duration-300"
            >
              <div className="p-6">
                <h3 className="text-2xl font-bold text-purple">{note.title}</h3>
                <p className="text-gray-600 mt-2">{note.description}</p>
                <div className="mt-4 flex justify-between">
                  <button
                    onClick={() => handleUpdate(note)}
                    className="px-4 py-2 bg-purple text-white rounded hover:bg-opacity-40"
                  >
                    Update
                  </button>
                  <button
                    onClick={() => handleDelete(note._id)}
                    className="px-4 py-2 bg-orange-600 text-white rounded hover:bg-opacity-50"
                  >
                    Delete
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
  
        {notes.length === 0 && (
          <p className="text-center text-gray-500 mt-10">No notes available.</p>
        )}
      </div>
    );
  };

export default ViewNotes;
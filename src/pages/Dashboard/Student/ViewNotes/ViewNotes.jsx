
const ViewNotes = () => {
    return (
        <div className="py-8 bg-gray-50">
        <h2 className="text-4xl font-bold text-center text-blue-600 mb-6">
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
                <h3 className="text-2xl font-bold text-gray-800">{note.title}</h3>
                <p className="text-gray-600 mt-2">{note.description}</p>
                <div className="mt-4 flex justify-between">
                  <button
                    onClick={() => handleUpdate(note)}
                    className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700"
                  >
                    Update
                  </button>
                  <button
                    onClick={() => handleDelete(note._id)}
                    className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700"
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
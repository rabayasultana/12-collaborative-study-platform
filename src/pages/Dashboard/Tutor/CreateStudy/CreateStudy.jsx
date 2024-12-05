import { useState } from "react";

const CreateStudy = () => {
      const [success, setSuccess] = useState("");
      const [registerError, setRegisterError] = useState("");
    
      const handleCreateSession = (event) => {
        event.preventDefault();
        const formData = new FormData(event.target);
        const sessionData = Object.fromEntries(formData.entries());
        console.log(sessionData);
    
        // Example success and error handling
        setSuccess("Session created successfully!");
        setRegisterError("");
      };
    
      return (
        <div className="animate__animated animate__fadeInUp">
          <h2 className="text-3xl mt-10 text-center text-purple-700 font-bold">
            Create Study Session
          </h2>
    
          <form
            onSubmit={handleCreateSession}
            className="card-body md:w-3/4 lg:w-1/2 mx-auto"
          >
            {/* Session Title */}
            <div className="form-control">
              <label className="label">
                <span className="label-text">Session Title</span>
              </label>
              <input
                type="text"
                name="title"
                placeholder="Enter session title"
                className="input input-bordered"
                required
              />
            </div>
    
            {/* Tutor Name */}
            <div className="form-control">
              <label className="label">
                <span className="label-text">Tutor Name</span>
              </label>
              <input
                type="text"
                name="tutorName"
                value="John Doe" // Example placeholder
                readOnly
                className="input input-bordered bg-purple-50 text-purple-800"
              />
            </div>
    
            {/* Tutor Email */}
            <div className="form-control">
              <label className="label">
                <span className="label-text">Tutor Email</span>
              </label>
              <input
                type="email"
                name="tutorEmail"
                value="johndoe@example.com" // Example placeholder
                readOnly
                className="input input-bordered bg-purple-50 text-purple-800"
              />
            </div>
    
            {/* Session Description */}
            <div className="form-control">
              <label className="label">
                <span className="label-text">Session Description</span>
              </label>
              <textarea
                name="description"
                rows="4"
                className="textarea textarea-bordered"
                placeholder="Provide a brief description of the session"
                required
              />
            </div>
    
            {/* Dates */}
            <div className="form-control">
              <label className="label">
                <span className="label-text">Registration Start Date</span>
              </label>
              <input
                type="date"
                name="registrationStart"
                className="input input-bordered"
                required
              />
            </div>
            <div className="form-control">
              <label className="label">
                <span className="label-text">Registration End Date</span>
              </label>
              <input
                type="date"
                name="registrationEnd"
                className="input input-bordered"
                required
              />
            </div>
            <div className="form-control">
              <label className="label">
                <span className="label-text">Class Start Date</span>
              </label>
              <input
                type="date"
                name="classStart"
                className="input input-bordered"
                required
              />
            </div>
            <div className="form-control">
              <label className="label">
                <span className="label-text">Class End Date</span>
              </label>
              <input
                type="date"
                name="classEnd"
                className="input input-bordered"
                required
              />
            </div>
    
            {/* Session Duration */}
            <div className="form-control">
              <label className="label">
                <span className="label-text">Session Duration (in hours)</span>
              </label>
              <input
                type="number"
                name="duration"
                className="input input-bordered"
                placeholder="Enter session duration"
                required
              />
            </div>
    
            {/* Registration Fee */}
            <div className="form-control">
              <label className="label">
                <span className="label-text">Registration Fee</span>
              </label>
              <input
                type="number"
                name="fee"
                value={0}
                readOnly
                className="input input-bordered bg-purple-50 text-purple-800"
              />
            </div>
    
            {/* Status */}
            <div className="form-control">
              <label className="label">
                <span className="label-text">Status</span>
              </label>
              <input
                type="text"
                name="status"
                value="Pending"
                readOnly
                className="input input-bordered bg-purple-50 text-purple-800"
              />
            </div>
    
            {/* Submit Button */}
            <div className="form-control mt-6">
              <button className="btn bg-purple-700 text-white text-xl hover:bg-purple-800">
                Create Session
              </button>
            </div>
          </form>
    
          {/* Success and Error Messages */}
          {registerError && (
            <p className="text-red-700 text-center">{registerError}</p>
          )}
          {success && <p className="text-green-600 text-center">{success}</p>}
        </div> 

    );
};

export default CreateStudy;
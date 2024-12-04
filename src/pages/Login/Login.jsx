import { useContext, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { AuthContext } from "../../components/Authprovider";
import SocialLogin from "./SocialLogin"; 

const Login = () => {
  const [loginError, setLoginError] = useState("");
  const [success, setSuccess] = useState("");

  const { signIn } = useContext(AuthContext);

  const location = useLocation();
  const navigate = useNavigate();
  const from = location?.state ? location.state : "/";

  const handleLogin = (e) => {
    e.preventDefault();
    const form = new FormData(e.currentTarget);
    const email = form.get("email");
    const password = form.get("password");

    // Reset error and success
    setLoginError("");
    setSuccess("");

    signIn(email, password)
      .then((result) => {
        const user = result.user;

        // Generate JWT token
        fetch("https://your-server-url.com/login", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ email: user.email }),
        })
          .then((res) => res.json())
          .then((data) => {
            if (data.token) {
              localStorage.setItem("authToken", data.token); // Store JWT token securely
              setSuccess("User Logged in Successfully");
              toast("User Logged in Successfully");

              // Navigate after login
              setTimeout(() => navigate(from), 1000);
            }
          });
      })
      .catch((error) => {
        console.error(error);
        setLoginError(error.message);
        toast("Something went wrong. Please try again");
      });
  };

  return (
    <div>
      <ToastContainer />
      <div className="mb-10">
        <h2 className="text-3xl mt-10 text-center text-purple font-bold">
          Please Login
        </h2>

        {/* Login Form */}
        <form
          onSubmit={handleLogin}
          className="card-body md:w-3/4 lg:w-1/2 mx-auto animate__animated animate__fadeInLeft"
        >
          {/* Email */}
          <div className="form-control">
            <label className="label">
              <span className="label-text">Email</span>
            </label>
            <input
              type="email"
              name="email"
              placeholder="email"
              className="input input-bordered"
              required
            />
          </div>
          {/* Password */}
          <div className="form-control">
            <label className="label">
              <span className="label-text">Password</span>
            </label>
            <input
              type="password"
              name="password"
              placeholder="password"
              className="input input-bordered"
              required
            />
          </div>
          {/* Submit Button */}
          <div className="form-control mt-6">
            <button className="btn bg-purple text-white">Login</button>
          </div>
        </form>

        {loginError && <p className="text-red-700 text-center">{loginError}</p>}
        {success && <p className="text-green-600 text-center">{success}</p>}

        {/* Social Login */}
        <SocialLogin></SocialLogin>

        <p className="text-center mt-4">
          Do not have an account? Please
          <span className="text-purple font-bold">
            <Link to="/register"> SignUp</Link>
          </span>
        </p>
      </div>
    </div>
  );
};

export default Login;

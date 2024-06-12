import {  useContext, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";

import { ToastContainer, toast } from 'react-toastify';

import 'react-toastify/dist/ReactToastify.css';
import { AuthContext } from "../../components/Authprovider";
// import Navbar from "../shared/Navbar";
// import SocialLogin from "../components/SocialLogin";
// import Footer from "../shared/Footer";
const login = () => {

  const [loginError, setLoginError] = useState('');
    const [success, setSuccess] = useState('');

    const { signIn }  = useContext(AuthContext);

    const location = useLocation();
    const navigate = useNavigate();
    const from = location?.state ? location.state : '/';

    const handleLogin = (e) => {
        e.preventDefault();
        const form = new FormData(e.currentTarget);
        const email = form.get('email');
        const password = form.get('password');

        // reset error and success
        setLoginError('');
        setSuccess('');

        signIn(email, password)
        .then(result => {
            console.log(result.user);
                setSuccess('User Logged in Successfully');
                toast('User Logged in Successfully');

            // navigate after login
            setTimeout(() => navigate(from), 1000);
        })
        .catch(error => {
            console.error(error);
            setLoginError(error.message);
            toast('Something Went wrong Please try again');
        })
      }


  return (
    <div >
                <title>Wanderlust | Login</title>
            <ToastContainer/>
      {/* <Navbar></Navbar> */}
      <div className="mb-10">
        <h2 className="text-3xl mt-10 text-center font-bold">Please Login</h2>

        {/* hero */}
        <form
          onSubmit={handleLogin}
          className="card-body md:w-3/4 lg:w-1/2 mx-auto animate__animated animate__fadeInLeft"
        >
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
          <div className="form-control mt-6">
            <button className="btn btn-primary">Login</button>
          </div>
        </form>

            {
                loginError && <p className="text-red-700">{loginError}</p>
            }

            {
                success && <p className="text-green-600">{success}</p>
            }

        <p className="text-center mt-4">
          Do not have an account? Please
          <span className="text-blue-800 font-bold">
            <Link to="/register"> Register</Link>
          </span>
        </p>
{/* <SocialLogin></SocialLogin> */}
      </div>
      {/* <Footer></Footer> */}
    </div>
  );
};

export default login;

import { useContext } from "react";
import { FaGithub, FaGoogle } from "react-icons/fa";
import { useLocation, useNavigate } from "react-router-dom";
import { AuthContext } from "../../providers/Authprovider";
import useAxiosPublic from "../../hooks/useAxiosPublic";

const SocialLogin = () => {
  const axiosPublic = useAxiosPublic();
  const { signInWithGoogle, signInWithGithub } = useContext(AuthContext);

  const navigate = useNavigate();
  const location = useLocation();
  const from = location?.state || "/";

  // handle google SignIn button
  const handleGoogleSignIn = () => {
    signInWithGoogle()
      .then((result) => {
        console.log("google", result.user);
        const userInfo = {
          email: result.user?.email,
          name: result.user?.displayName,
          role: "student",
        }
        axiosPublic.post('/users', userInfo)
        .then(res => {
          console.log(res.data);
          navigate(from);
        })
      })
  };

  // handle github SignIn button
  const handleGithubSignIn = () => {
    signInWithGithub()
      .then((result) => {
        console.log("github", result.user);
        const userInfo = {
          email: result.user?.email,
          name: result.user?.displayName,
          role: "student",
        }
        axiosPublic.post('/users', userInfo)
        .then(res => {
          console.log(res.data);
          navigate(from);
        })
      })
  };

  return (
    <div className="animate__animated animate__fadeInRight">
      <div className="divider">Login With</div>
      {/* google  */}
      <div className="p-4 space-y-3 my-10  w-2/5 mx-auto">
        <button
          onClick={handleGoogleSignIn}
          className="btn bg-purple text-white w-full"
        >
          <FaGoogle></FaGoogle>
          Google
        </button>

        {/* github */}
        <button
          onClick={handleGithubSignIn}
          className="btn bg-purple text-white w-full "
        >
          <FaGithub></FaGithub>
          Github
        </button>
      </div>
    </div>
  );
};

export default SocialLogin;

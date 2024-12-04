import { useContext } from "react";
import { FaGithub, FaGoogle } from "react-icons/fa";
import { useLocation, useNavigate } from "react-router-dom";
import { AuthContext } from "../../components/Authprovider";

const SocialLogin = () => {
  const { signInWithGoogle, signInWithGithub } = useContext(AuthContext);

  const navigate = useNavigate();
  const location = useLocation();
  const from = location?.state || "/";

  // handle google SignIn button
  const handleGoogleSignIn = () => {
    signInWithGoogle()
      .then((result) => {
        console.log("google", result.user);
        if (result.user) {
          navigate(from);
        }
      })
      .catch((error) => {
        console.error(error.message);
      });
  };

  // handle github SignIn button
  const handleGithubSignIn = () => {
    signInWithGithub()
      .then((result) => {
        console.log("github", result.user);
        if (result.user) {
          navigate(from);
        }
      })
      .catch((error) => {
        console.error(error.message);
      });
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

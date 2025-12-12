import { FcGoogle } from "react-icons/fc";
import useAuth from "../../../hooks/useAuth";
import { useNavigate } from "react-router";
import toast from "react-hot-toast";

export default function SocialLogin() {
  const navigate = useNavigate();
  const { signInWithGoogle } = useAuth();

  const handleGoogleSignIn = () => {
    signInWithGoogle()
      .then((result) => {
        const currentUser = result.user;
        // console.log(currentUser);

        if (location.state) {
          navigate(location.state);
        } else {
          navigate("/");
        }
      })
      .catch((error) => {
        const errorMessage = error.message;
        toast(errorMessage);
      });
  };

  return (
    <button
      type="button"
      className="btn bg-white border-gray-400 text-black w-full"
      onClick={handleGoogleSignIn}
    >
      <FcGoogle size={17} />
      Signup with Google
    </button>
  );
}

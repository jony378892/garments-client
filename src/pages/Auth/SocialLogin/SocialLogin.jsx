import { FcGoogle } from "react-icons/fc";
import useAuth from "../../../hooks/useAuth";
import { useNavigate } from "react-router";
import toast from "react-hot-toast";
import useAxios from "../../../hooks/useAxios";

export default function SocialLogin() {
  const navigate = useNavigate();
  const axiosInstance = useAxios();
  const { signInWithGoogle } = useAuth();

  const handleGoogleSignIn = () => {
    signInWithGoogle()
      .then((res) => {
        const currentUser = res.user;
        console.log(currentUser);
        const { displayName, email, photoURL } = currentUser;

        const userInfo = {
          displayName,
          email,
          photoURL,
        };

        axiosInstance.post("/users", userInfo).then((res) => {
          console.log("User data has been stored", res.data);
        });

        if (location?.state) {
          navigate(location.state || "/");
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
      SignIn with Google
    </button>
  );
}

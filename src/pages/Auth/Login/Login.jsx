import { Link, useLocation, useNavigate } from "react-router";
import toast, { ToastBar } from "react-hot-toast";
import { useForm } from "react-hook-form";
import SocialLogin from "../SocialLogin/SocialLogin";
import useAuth from "../../../hooks/useAuth";

export default function Login() {
  const { user, setUser, logInUser, signInWithGoogle } = useAuth();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const location = useLocation();
  const navigate = useNavigate();

  const handleSignIn = (e) => {
    e.preventDefault();

    const form = e.target;
    const email = form.email.value;
    const password = form.password.value;

    logInUser(email, password)
      .then((result) => {
        const currentUser = result.user;
        // console.log(currentUser);
        setUser(currentUser);
        toast("Signin successful");

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

  const handleLoginEmail = (data) => {
    console.log(data);
  };

  return (
    <div className="hero min-h-screen">
      <div className="card bg-base-100 w-full max-w-sm shrink-0 shadow-none sm:shadow-2xl my-10">
        <form className="card-body" onSubmit={handleSubmit(handleLoginEmail)}>
          <div className="mb-5 text-center">
            <h2 className="text-3xl font-bold">
              <br />
              Welcome Back
            </h2>
            <small className="text-gray-500">Login now to get started.</small>
          </div>
          <fieldset className="fieldset">
            <label className="label">Email</label>
            <input
              {...register("email")}
              type="email"
              className="input outline-none"
              placeholder="Email"
              required
            />
            <label className="label">Password</label>
            <input
              {...register("password")}
              type="password"
              className="input outline-none"
              placeholder="Password"
              required
            />
            <div>
              <Link to="/auth/forget-password" className="link link-hover">
                Forgot password?
              </Link>
            </div>
            <button className="btn btn-neutral mt-4 mr-4">Login</button>
            <p className="font-semibold text-xs">
              Don't have an account?{" "}
              <Link to={"/register"} className="text-blue-700 underline">
                Signup Now
              </Link>
            </p>
            <div className="divider text-sm mr-4">OR</div>
            <SocialLogin />
          </fieldset>
        </form>
      </div>
    </div>
  );
}

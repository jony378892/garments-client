import { Link, useNavigate } from "react-router";
import { useState } from "react";
import { FaEyeSlash, FaRegEye } from "react-icons/fa6";
import toast from "react-hot-toast";
import { useForm } from "react-hook-form";
import SocialLogin from "../SocialLogin/SocialLogin";
import useAuth from "../../../hooks/useAuth";
import axios from "axios";
import useAxios from "../../../hooks/useAxios";
import Swal from "sweetalert2";

export default function Register() {
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();
  const axiosInstance = useAxios();
  const { registerUser, updateUser, loading } = useAuth();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const handleRegister = async (data) => {
    const { email, password, image, displayName, role } = data;
    // console.log(data);

    if (!image || !image[0]) {
      toast.error("Please upload a valid image");
      return;
    }

    registerUser(email, password).then(() => {
      const formData = new FormData();
      formData.append("image", image[0]);

      const image_api_url = `https://api.imgbb.com/1/upload?key=${
        import.meta.env.VITE_IMAGE_API_KEY
      }`;

      axios
        .post(image_api_url, formData)
        .then((res) => {
          const photoURL = res.data.data.url;

          const userInfo = {
            displayName,
            email,
            photoURL,
            role,
          };

          // Update firebase profile
          updateUser({
            displayName,
            photoURL,
          }).then(() => {
            axiosInstance.post("/users", userInfo).then((result) => {
              if (result.data.insertedId) {
                Swal.fire("Registration successful");

                navigate(location.state || "/");
              }
              // navigate to other route
            });
          });
        })
        .catch((error) => {
          if (
            error.message === "Firebase: Error (auth/email-already-in-use)."
          ) {
            toast.error("User already exists");
          }
          console.log(error.message);
        });
    });
  };

  return (
    <div className="hero min-h-screen bg-base-200">
      <div className="card bg-base-100 w-full max-w-sm shrink-0 shadow-none sm:shadow-2xl my-10">
        <form
          className="card-body placeholder:text-gray-500"
          onSubmit={handleSubmit(handleRegister)}
        >
          <div className="mb-5 text-center">
            <h2 className="text-3xl font-bold">Create Your Account</h2>
            <small className="text-gray-500">
              Join SkillSwap and start sharing your skills today.
            </small>
          </div>

          <fieldset className="fieldset">
            {/* Name */}
            <label className="label">Name</label>
            <input
              {...register("displayName", { required: true })}
              type="text"
              className="input input-bordered"
              placeholder="Your full name"
            />
            {errors.displayName && (
              <p className="text-red-500">Name is required.</p>
            )}

            {/* Email */}
            <label className="label">Email</label>
            <input
              {...register("email", {
                required: true,
                pattern: {
                  value: /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/,
                  message: "Enter a valid email address.",
                },
              })}
              type="email"
              className="input input-bordered"
              placeholder="Email address"
            />
            {errors.email && (
              <p className="text-red-500 text-sm">
                Enter a valid email address
              </p>
            )}

            {/* Image */}
            <label className="label">Profile Photo</label>
            <input
              {...register("image", { required: true })}
              type="file"
              accept="image/*"
              className="file-input"
            />
            {errors.image && <p className="text-red-500">Photo is required.</p>}

            {/* Role */}
            <label className="label">Pick a role</label>
            <select
              className="select"
              defaultValue=""
              {...register("role", { required: true })}
            >
              <option value="" disabled>
                Pick a role
              </option>
              <option value="buyer">Buyer</option>
              <option value="manager">Manager</option>
            </select>
            {errors.role && (
              <p className="text-red-500 text-xs ">Select a valid role</p>
            )}

            {/* Password */}
            <label className="label">Password</label>
            <div className="relative">
              <input
                {...register("password", {
                  required: true,
                  pattern: {
                    value: /^(?=.*[a-z])(?=.*[A-Z]).{6,}$/,
                    message:
                      "Enter a valid password. Password must be 6 character long and must have one uppercase letter, one lowercase letter",
                  },
                })}
                className="input input-bordered"
                type={showPassword ? "text" : "password"}
                placeholder="Password"
              />
              {errors.password && (
                <p className="text-red-500 text-sm">
                  {errors.password.message}
                </p>
              )}

              <button
                type="button"
                className="absolute right-8 top-3 cursor-pointer z-10"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? (
                  <FaEyeSlash size={18} />
                ) : (
                  <FaRegEye size={18} />
                )}
              </button>
            </div>
            {errors.password && (
              <p className="text-red-500">Password is required.</p>
            )}

            <button className="btn btn-neutral mt-5 w-full">
              <p>
                Signing Up
                {loading && (
                  <span className="loading loading-spinner loading-sm"></span>
                )}
              </p>
            </button>
          </fieldset>

          <p className="font-semibold text-sm mt-4 text-center">
            Already have an account?{" "}
            <Link to={"/login"} className="text-blue-700 underline">
              Login Now
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
}

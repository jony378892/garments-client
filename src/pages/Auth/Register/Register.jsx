import { Link, useNavigate } from "react-router";
import { useState } from "react";
import { FaEyeSlash, FaRegEye } from "react-icons/fa6";
import toast from "react-hot-toast";
import { useForm } from "react-hook-form";
import SocialLogin from "../SocialLogin/SocialLogin";
import useAuth from "../../../hooks/useAuth";
import axios from "axios";
import useAxios from "../../../hooks/useAxios";

export default function Register() {
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();
  const axiosInstance = useAxios();
  const { registerUser, updateUser } = useAuth();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const handleRegister = async (data) => {
    const { email, password, image, displayName } = data;
    console.log(data);

    if (!image || !image[0]) {
      toast.error("Please upload a valid image");
      return;
    }

    try {
      await registerUser(email, password);

      const formData = new FormData();
      formData.append("image", image[0]);

      const image_api_url = `https://api.imgbb.com/1/upload?key=${
        import.meta.env.VITE_IMAGE_API_KEY
      }`;

      const uploadRes = await axios.post(image_api_url, formData);

      const photoURL = uploadRes.data.data.url;
      console.log(photoURL);

      const userInfo = {
        email,
        displayName,
        photoURL,
      };

      // store user data in database
      const result = await axiosInstance.post("/users", userInfo);

      if (result.data.insertedId) {
        console.log(result.data);
        toast.success("User created successfully");
      }

      // Update firebase profile
      await updateUser({
        displayName,
        photoURL,
      })
        .then(() => {
          // navigate to other route
          navigate(location.state || "/");
        })
        .catch((error) => console.log(error));
    } catch (error) {
      console.log(error);
    }
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

            {/* Image */}
            <label className="label">Profile Photo</label>
            <input
              {...register("image", { required: true })}
              type="file"
              accept="image/*"
              className="file-input"
            />
            {errors.image && <p className="text-red-500">Photo is required.</p>}

            {/* Email */}
            <label className="label">Email</label>
            <input
              {...register("email", { required: true })}
              type="email"
              className="input input-bordered"
              placeholder="Email address"
            />
            {errors.email && <p className="text-red-500">Email is required.</p>}

            {/* Password */}
            <label className="label">Password</label>
            <div className="relative">
              <input
                {...register("password", { required: true })}
                className="input input-bordered"
                type={showPassword ? "text" : "password"}
                placeholder="Password"
                minLength="8"
              />
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

            <button className="btn btn-neutral mt-5 w-full">Signup</button>
          </fieldset>

          <p className="font-semibold text-sm mt-4 text-center">
            Already have an account?{" "}
            <Link to={"/login"} className="text-blue-700 underline">
              Login Now
            </Link>
          </p>

          <div className="divider">OR</div>
          <SocialLogin />
        </form>
      </div>
    </div>
  );
}

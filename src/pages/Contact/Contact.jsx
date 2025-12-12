import { useForm } from "react-hook-form";
import toast from "react-hot-toast";

export default function Contact() {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();

  const onSubmit = (data) => {
    console.log(data);
    toast.success("Message sent successfully");
    reset();
  };

  return (
    <div className="bg-base-200 py-16">
      <div className="max-w-7xl mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold">Contact Us</h2>
          <p className="text-gray-500 mt-2">
            We're here to help. Fill out the form and we’ll get back to you.
          </p>
        </div>

        {/* Contact Form */}
        <div className="card bg-base-100 shadow-xl">
          <div className="card-body">
            <h3 className="text-2xl font-semibold mb-4">Send a Message</h3>

            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
              {/* Name */}
              <div className="form-control space-y-1">
                <label className="label">
                  <span className="label-text font-semibold">Name</span>
                </label>
                <input
                  type="text"
                  className="input input-bordered w-full"
                  placeholder="Your full name"
                  {...register("name", { required: "Name is required" })}
                />
                {errors.name && (
                  <p className="text-red-500 text-sm">{errors.name.message}</p>
                )}
              </div>

              {/* Email */}
              <div className="form-control  space-y-1">
                <label className="label">
                  <span className="label-text font-semibold">Email</span>
                </label>
                <input
                  type="email"
                  className="input input-bordered w-full"
                  placeholder="Your email address"
                  {...register("email", { required: "Email is required" })}
                />
                {errors.email && (
                  <p className="text-red-500 text-sm">{errors.email.message}</p>
                )}
              </div>

              {/* Message */}
              <div className="form-control  space-y-1">
                <label className="label block">
                  <span className="label-text font-semibold">Message</span>
                </label>
                <textarea
                  className="textarea textarea-bordered h-32 min-w-2xl"
                  placeholder="Write your message..."
                  {...register("message", {
                    required: "Message is required",
                    minLength: {
                      value: 10,
                      message: "Message must be at least 10 characters",
                    },
                  })}
                ></textarea>
                {errors.message && (
                  <p className="text-red-500 text-sm">
                    {errors.message.message}
                  </p>
                )}
              </div>

              <button className="btn btn-neutral btn-wide mt-2">
                Send Message
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

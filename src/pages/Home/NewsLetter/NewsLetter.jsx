import { useForm } from "react-hook-form";
import { MdOutlineEmail } from "react-icons/md";

export default function NewsLetter() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const handleSubscription = (data) => {
    console.log(data);
  };

  return (
    <section className="py-16 bg-gray-50">
      <div className="max-w-5xl mx-auto px-4">
        <div className="bg-white rounded-2xl shadow-sm p-8 md:p-12">
          <div className="text-center mb-8">
            <h3 className="text-2xl md:text-3xl font-bold text-gray-800">
              Subscribe to Our Newsletter
            </h3>
            <p className="mt-3 text-gray-600 max-w-xl mx-auto">
              Get updates on production tips, system improvements, and industry
              insights delivered straight to your inbox.
            </p>
          </div>

          <form
            className="flex flex-col sm:flex-row items-center gap-4 max-w-xl mx-auto"
            onSubmit={handleSubmit(handleSubscription)}
          >
            <label className="input input-bordered flex items-center gap-2 w-full">
              <MdOutlineEmail className="text-gray-500" size={20} />
              <input
                type="email"
                {...register("email", {
                  required: true,
                })}
                placeholder="Enter your email address"
                className="w-full focus:outline-none focus:border-0"
              />
            </label>

            <button
              type="submit"
              className="btn btn-neutral w-full sm:w-auto px-8"
            >
              Subscribe
            </button>
          </form>
          <div className="max-w-xl mx-auto">
            {errors.email?.type === "required" && (
              <p className="text-red-500 text-sm mt-2">
                Enter a valid email address
              </p>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}

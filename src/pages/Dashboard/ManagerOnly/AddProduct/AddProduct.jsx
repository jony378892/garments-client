import { useState } from "react";
import { useForm } from "react-hook-form";
import axios from "axios";
import useAxiosSecure from "../../../../hooks/useAxiosSecure";
import toast from "react-hot-toast";

export default function AddProduct() {
  const axiosSecure = useAxiosSecure();
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();

  const [imagePreviews, setImagePreviews] = useState([]);

  const onImageChange = (e) => {
    const files = Array.from(e.target.files);
    const previews = files.map((file) => URL.createObjectURL(file));
    setImagePreviews(previews);
  };

  const onSubmit = async (data) => {
    try {
      const files = Array.from(data.images);
      const uploadedImageUrls = [];

      for (const file of files) {
        const formData = new FormData();
        formData.append("image", file);

        const res = await axios.post(
          `https://api.imgbb.com/1/upload?key=${
            import.meta.env.VITE_IMAGE_API_KEY
          }`,
          formData
        );

        uploadedImageUrls.push(res.data.data.url);
      }

      const finalData = { ...data, images: uploadedImageUrls };

      const result = await axiosSecure.post(`/products`, finalData);

      console.log(result.data);

      if (result.data.insertedId) {
        toast.success("Product added successfully");
      } else {
        toast.error("Something went wrong");
      }

      reset();
      setImagePreviews([]);
    } catch (error) {
      console.error("Error uploading images:", error);
    }
  };

  return (
    <div className="max-w-3xl mx-auto bg-base-100 p-6 rounded-xl">
      <h2 className="text-xl font-semibold mb-6">Add New Product</h2>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
        {/* Product Name */}
        <div className="form-control flex gap-3">
          <label className="label">
            <span className="label-text">Product Name:</span>
          </label>
          <input
            {...register("name", { required: true })}
            type="text"
            className="input input-bordered"
          />
          {errors.name && <span className="text-error text-sm">Required</span>}
        </div>

        {/* Product Description */}
        <div className="form-control flex gap-3">
          <label className="label">
            <span className="label-text">Product Description:</span>
          </label>
          <textarea
            {...register("description", { required: true })}
            className="textarea textarea-bordered"
            rows={4}
          />
        </div>

        {/* Category and Price */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="form-control flex gap-3">
            <label className="label">
              <span className="label-text">Category</span>
            </label>
            <select
              {...register("category", { required: true })}
              className="select select-bordered"
            >
              <option value="">Select Category</option>
              <option value="Shirt">Shirt</option>
              <option value="Pant">Pant</option>
              <option value="Jacket">Jacket</option>
              <option value="Accessories">Accessories</option>
            </select>
          </div>

          <div className="form-control flex gap-3">
            <label className="label">
              <span className="label-text">Price</span>
            </label>
            <input
              {...register("price", { required: true, valueAsNumber: true })}
              type="number"
              step="0.01"
              className="input input-bordered"
            />
          </div>
        </div>

        {/* Available Quantity and MOQ */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="form-control flex gap-3">
            <label className="label">
              <span className="label-text">Available Quantity:</span>
            </label>
            <input
              {...register("availableQuantity", {
                required: true,
                valueAsNumber: true,
              })}
              type="number"
              className="input input-bordered"
            />
          </div>

          <div className="form-control flex gap-3">
            <label className="label">
              <span className="label-text">Minimum Order Quantity (MOQ):</span>
            </label>
            <input
              {...register("moq", { required: true, valueAsNumber: true })}
              type="number"
              className="input input-bordered"
            />
          </div>
        </div>

        {/* Product Images */}
        <div className="form-control flex gap-3">
          <label className="label">
            <span className="label-text">Product Images:</span>
          </label>
          <input
            {...register("images", { required: true })}
            type="file"
            multiple
            className="file-input file-input-bordered"
            onChange={onImageChange}
          />
        </div>

        {/* Image Preview */}
        {imagePreviews.length > 0 && (
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mt-2 border border-gray-200 rounded-2xl p-4">
            {imagePreviews.map((src, idx) => (
              <img
                key={idx}
                src={src}
                alt={`preview ${idx}`}
                className="w-full h-40 object-cover rounded"
              />
            ))}
          </div>
        )}

        {/* Demo Video Link */}
        <div className="form-control flex gap-3">
          <label className="label">
            <span className="label-text">Demo Video Link (optional)</span>
          </label>
          <input
            {...register("videoUrl")}
            type="url"
            placeholder="https://youtube.com/..."
            className="input input-bordered"
          />
        </div>

        {/* Payment Option */}
        <div className="form-control flex gap-3">
          <label className="label">
            <span className="label-text">Payment Option:</span>
          </label>
          <select
            {...register("paymentMethod", { required: true })}
            className="select select-bordered"
          >
            <option value="">Select Payment Option</option>
            <option value="cash_on_delivery">Cash on Delivery</option>
            <option value="payfirst">PayFirst</option>
          </select>
        </div>

        {/* Show on Homepage */}
        <div className="form-control flex-row items-center gap-3">
          <label className="label cursor-pointer">
            <input
              type="checkbox"
              {...register("showOnHomepage")}
              className="checkbox"
            />
            <span className="label-text ml-2">Show on homepage</span>
          </label>
        </div>

        <div className="pt-4">
          <button type="submit" className="btn btn-primary w-full">
            Add Product
          </button>
        </div>
      </form>
    </div>
  );
}

import { useQuery } from "@tanstack/react-query";
import React, { useState } from "react";
import { useParams } from "react-router";
import useAxiosSecure from "../../../../hooks/useAxiosSecure";
import toast from "react-hot-toast";
import { useForm } from "react-hook-form";
import Loading from "../../../../components/Shared/Loading";
import Swal from "sweetalert2";

export default function UpdateProduct() {
  const [imagePreviews, setImagePreviews] = useState([]);
  const { id } = useParams();
  const axiosSecure = useAxiosSecure();

  const {
    refetch,
    isLoading,
    data: product,
  } = useQuery({
    queryKey: ["update-product", id],
    queryFn: async () => {
      const result = await axiosSecure.get(`/products/${id}`);
      return result.data;
    },
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  if (isLoading) {
    return <Loading />;
  }

  const onImageChange = (e) => {
    const files = Array.from(e.target.files);
    const previews = files.map((file) => URL.createObjectURL(file));
    setImagePreviews(previews);
  };

  const handleUpdate = async (updatedData) => {
    const { _id, ...updatedPayload } = updatedData;
    console.log(updatedPayload);
    const res = await axiosSecure.patch(
      `/managed-products/${id}/update`,
      updatedPayload
    );

    if (res.data.modifiedCount) {
      refetch();
      Swal.fire("Product updated successfully");
    } else {
      Swal.fire("No changes made");
    }
  };

  return (
    <div className="max-w-3xl mx-auto bg-base-100 p-6 rounded-xl">
      <h2 className="text-xl font-semibold mb-6">Update Product</h2>

      <form onSubmit={handleSubmit(handleUpdate)} className="space-y-5">
        {/* Product Name */}
        <div className="form-control flex flex-col gap-1">
          <label className="label">
            <span className="label-text">
              Product Name <span className="text-error">*</span>
            </span>
          </label>
          <input
            {...register("name", { required: "Product name is required" })}
            type="text"
            defaultValue={product.name}
            className="input input-bordered w-full"
          />
          {errors.name && (
            <span className="text-error text-sm">{errors.name.message}</span>
          )}
        </div>

        {/* Product Description */}
        <div className="form-control flex flex-col gap-1">
          <label className="label">
            <span className="label-text">
              Product Description <span className="text-error">*</span>
            </span>
          </label>
          <textarea
            {...register("description", {
              required: "Product description is required",
            })}
            defaultValue={product.description}
            className="textarea textarea-bordered w-full"
            rows={4}
          />
          {errors.description && (
            <span className="text-error text-sm">
              {errors.description.message}
            </span>
          )}
        </div>

        {/* Category and Price */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="form-control flex flex-col gap-1">
            <label className="label">
              <span className="label-text">
                Category <span className="text-error">*</span>
              </span>
            </label>
            <select
              {...register("category", { required: "Category is required" })}
              defaultValue={product.category}
              className="select select-bordered"
            >
              <option value="">Select Category</option>
              <option value="Shirt">Shirt</option>
              <option value="Pant">Pant</option>
              <option value="Jacket">Jacket</option>
              <option value="Accessories">Accessories</option>
            </select>
            {errors.category && (
              <span className="text-error text-sm">
                {errors.category.message}
              </span>
            )}
          </div>

          <div className="form-control flex flex-col gap-1">
            <label className="label">
              <span className="label-text">
                Price <span className="text-error">*</span>
              </span>
            </label>
            <input
              {...register("price", {
                required: "Price is required",
                valueAsNumber: true,
              })}
              type="number"
              step="0.01"
              defaultValue={product.price}
              className="input input-bordered"
            />
            {errors.price && (
              <span className="text-error text-sm">{errors.price.message}</span>
            )}
          </div>
        </div>

        {/* Available Quantity and MOQ */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="form-control flex flex-col gap-1">
            <label className="label">
              <span className="label-text">
                Available Quantity <span className="text-error">*</span>
              </span>
            </label>
            <input
              {...register("availableQuantity", {
                required: "Available quantity is required",
                valueAsNumber: true,
              })}
              type="number"
              defaultValue={product.availableQuantity}
              className="input input-bordered"
            />
            {errors.availableQuantity && (
              <span className="text-error text-sm">
                {errors.availableQuantity.message}
              </span>
            )}
          </div>

          <div className="form-control flex flex-col gap-1">
            <label className="label">
              <span className="label-text">
                Minimum Order Quantity (MOQ){" "}
                <span className="text-error">*</span>
              </span>
            </label>
            <input
              {...register("moq", {
                required: "MOQ is required",
                valueAsNumber: true,
              })}
              type="number"
              defaultValue={product.moq}
              className="input input-bordered"
            />
            {errors.moq && (
              <span className="text-error text-sm">{errors.moq.message}</span>
            )}
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {/* Demo Video Link */}
          <div className="form-control flex flex-col gap-1">
            <label className="label">
              <span className="label-text">Demo Video Link (optional)</span>
            </label>
            <input
              {...register("videoUrl")}
              type="url"
              placeholder="https://youtube.com/..."
              defaultValue={product.videoUrl}
              className="input input-bordered"
            />
          </div>

          {/* Payment Option */}
          <div className="form-control flex flex-col gap-1">
            <label className="label">
              <span className="label-text">
                Payment Option <span className="text-error">*</span>
              </span>
            </label>
            <select
              {...register("paymentMethod", {
                required: "Payment option is required",
              })}
              defaultValue={product.paymentMethod}
              className="select select-bordered"
            >
              <option value="">Select Payment Option</option>
              <option value="cash_on_delivery">Cash on Delivery</option>
              <option value="payfirst">PayFirst</option>
            </select>
            {errors.paymentMethod && (
              <span className="text-error text-sm">
                {errors.paymentMethod.message}
              </span>
            )}
          </div>
        </div>

        {/* Product Images */}
        <div className="form-control flex flex-col gap-1">
          <label className="label">
            <span className="label-text">Product Images (optional)</span>
          </label>
          <input
            {...register("images")}
            type="file"
            multiple
            className="file-input file-input-bordered"
            onChange={onImageChange}
          />
        </div>

        {/* Existing Images Preview */}
        {product.images &&
          product.images.length > 0 &&
          imagePreviews.length === 0 && (
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mt-2 border border-gray-200 rounded-2xl p-4">
              {product.images.map((src, idx) => (
                <img
                  key={idx}
                  src={src}
                  alt={`existing ${idx}`}
                  className="w-full h-40 object-cover rounded"
                />
              ))}
            </div>
          )}

        {/* New Image Preview */}
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

        {/* Show on Homepage */}
        <div className="form-control flex flex-col gap-1">
          <label className="label cursor-pointer justify-start gap-2">
            <input
              type="checkbox"
              {...register("showOnHomepage")}
              defaultChecked={product.showOnHomepage}
              className="checkbox"
            />
            <span className="label-text">Show on homepage</span>
          </label>
        </div>

        <div className="pt-4">
          <button type="submit" className="btn btn-primary w-full">
            Update Product
          </button>
        </div>
      </form>
    </div>
  );
}

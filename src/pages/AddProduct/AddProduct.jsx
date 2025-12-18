import { useForm } from "react-hook-form";

export default function AddProduct() {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();

  const onSubmit = (data) => {
    // TODO: replace with API call
    console.log("Create product", data);
    reset();
  };

  return (
    <div className="max-w-3xl mx-auto p-6">
      <h2 className="text-2xl font-bold mb-4">Add Product</h2>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <div className="form-control">
          <label className="label">
            <span className="label-text">Product Name</span>
          </label>
          <input
            className="input input-bordered"
            {...register("name", { required: "Name is required" })}
            placeholder="Women's Long Dress"
          />
          {errors.name && (
            <span className="text-red-500 text-sm">{errors.name.message}</span>
          )}
        </div>

        <div className="form-control">
          <label className="label">
            <span className="label-text">Category</span>
          </label>
          <input
            className="input input-bordered"
            {...register("category")}
            placeholder="Women"
          />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div className="form-control">
            <label className="label">
              <span className="label-text">Price</span>
            </label>
            <input
              type="number"
              step="0.01"
              className="input input-bordered"
              {...register("price", { valueAsNumber: true })}
            />
          </div>

          <div className="form-control">
            <label className="label">
              <span className="label-text">Available Quantity</span>
            </label>
            <input
              type="number"
              className="input input-bordered"
              {...register("availableQuantity", { valueAsNumber: true })}
            />
          </div>
        </div>

        <div className="form-control">
          <label className="label">
            <span className="label-text">Description</span>
          </label>
          <textarea
            className="textarea textarea-bordered"
            {...register("description")}
            rows={4}
          />
        </div>

        <div className="form-control">
          <label className="label">
            <span className="label-text">Image URLs (comma separated)</span>
          </label>
          <input
            className="input input-bordered"
            {...register("images")}
            placeholder="https://... , https://..."
          />
        </div>

        <div className="pt-2">
          <button className="btn btn-primary" type="submit">
            Create Product
          </button>
        </div>
      </form>
    </div>
  );
}

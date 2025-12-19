import { forwardRef, useEffect } from "react";
import { useForm } from "react-hook-form";

const ProductEditModal = forwardRef(({ product, onUpdate }, ref) => {
  const { register, handleSubmit, reset } = useForm();

  useEffect(() => {
    reset(product);
  }, [product, reset]);

  return (
    <dialog ref={ref} className="modal modal-bottom sm:modal-middle">
      <div className="modal-box max-w-lg">
        <h3 className="font-semibold text-lg mb-4">Edit Product</h3>

        <form onSubmit={handleSubmit(onUpdate)} className="space-y-4">
          <div className="form-control">
            <label className="label">Product Name</label>
            <input {...register("name")} className="input input-bordered" />
          </div>

          <div className="form-control">
            <label className="label">Description</label>
            <textarea
              {...register("description")}
              className="textarea textarea-bordered"
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <input
              {...register("price", {
                required: true,
                valueAsNumber: true,
              })}
              type="number"
              step="any"
              className="input input-bordered"
            />
            <input
              {...register("availableQuantity", {
                required: true,
                valueAsNumber: true,
              })}
              type="number"
              step="any"
              className="input input-bordered"
            />
          </div>

          <div className="modal-action">
            <button type="submit" className="btn btn-primary">
              Update Product
            </button>
            <button
              type="button"
              className="btn"
              onClick={() => ref.current.close()}
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </dialog>
  );
});

export default ProductEditModal;

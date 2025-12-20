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
          <div className="form-control flex flex-col">
            <label className="label text-sm">Product Name</label>
            <input {...register("name")} className="input input-bordered" />
          </div>

          <div className="form-control flex flex-col">
            <label className="label text-sm">Description</label>
            <textarea
              {...register("description")}
              className="textarea textarea-bordered"
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="form-control flex flex-col ">
              <label className="label text-sm">Price</label>
              <input
                type="number"
                step="any"
                {...register("price", {
                  valueAsNumber: true,
                  required: true,
                })}
                className="input input-bordered"
              />
            </div>
            <div className="form-control flex flex-col">
              <label className="label text-sm">Payment option</label>
              <select
                defaultValue="Choose Payment Method"
                {...register("paymentMethod", {
                  required: true,
                })}
                className="select"
              >
                <option disabled={true}>payment option</option>
                <option>Cash on delivery</option>
                <option>Stripe</option>
              </select>
            </div>
          </div>

          <div className="form-control flex flex-col">
            <label className="label text-sm">Demo Video</label>
            <input
              placeholder="https://youtube.com/"
              type="text"
              {...register("videoUrl", {
                required: true,
              })}
              className="input input-bordered"
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="form-control flex flex-col">
              <label className="label text-sm">Category</label>
              <input
                type="number"
                step="any"
                {...register("price", {
                  valueAsNumber: true,
                  required: true,
                })}
                className="input input-bordered"
              />
            </div>
            <div className="form-control flex flex-col"></div>
          </div>

          <div className="modal-action flex justify-start mt-10">
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

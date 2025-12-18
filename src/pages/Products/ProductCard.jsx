import { Link } from "react-router";

export default function ProductCard({ product }) {
  return (
    <div className="group w-full bg-white rounded-2xl shadow-lg hover:shadow-md transition overflow-hidden">
      {/* Image */}
      <div className="relative overflow-hidden">
        <img
          src={product.images?.[0]}
          alt={product.name}
          className="h-56 w-full object-cover group-hover:scale-105 transition duration-300"
        />
      </div>

      {/* Content */}
      <div className="p-5 flex flex-col gap-3">
        <h2 className="text-lg font-semibold text-gray-800 group-hover:underline  underline-offset-2 decoration-2 transition cursor-pointer">
          {product.name}
          <span className="badge badge-soft badge-primary ml-3">
            {product.category}
          </span>
        </h2>

        <p className="text-sm text-gray-600 line-clamp-2">
          {product.description}
        </p>

        <p className="font-semibold text-sm">
          Available Qty: {product.availableQuantity}
        </p>

        <div className="flex items-center justify-between pt-2">
          <span className="text-lg font-bold text-gray-900">
            $ {product.price}
          </span>

          <Link to={`/product/${product._id}`}>
            <button className="btn btn-primary">View Details</button>
          </Link>
        </div>
      </div>
    </div>
  );
}

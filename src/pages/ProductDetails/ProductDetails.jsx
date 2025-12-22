import { useQuery } from "@tanstack/react-query";
import { Link, useParams } from "react-router";
import useAxios from "../../hooks/useAxios";
import Loading from "../../components/Shared/Loading";
import { useState } from "react";
import useRole from "../../hooks/useRole";

export default function ProductDetails() {
  const [mainImage, setMainImage] = useState(0);
  const { role } = useRole();
  const { id } = useParams();
  const axiosInstance = useAxios();

  const { isLoading, data: product } = useQuery({
    queryKey: ["product", id],
    queryFn: async () => {
      const result = await axiosInstance.get(`/products/${id}`);
      return result.data;
    },
  });

  if (isLoading) {
    return <Loading />;
  }

  const available = product?.availableQuantity ?? 0;
  const price =
    typeof product?.price === "number"
      ? product.price
      : parseFloat(product?.price || 0);

  return (
    <div className="max-w-6xl mx-auto p-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 bg-base-100 sm:shadow-sm rounded-lg sm:p-6">
        {/* Images */}
        <div className="flex flex-col gap-4">
          <div className="rounded-md overflow-hidden bg-gray-100">
            <img
              src={product.images?.[mainImage]}
              className="w-full h-96 object-cover"
              alt={`${product.name} - view ${mainImage + 1}`}
            />
          </div>

          <div className="flex gap-3 overflow-auto mt-2">
            {product.images?.map((image, i) => (
              <button
                key={image + i}
                onClick={() => setMainImage(i)}
                className={`rounded-md overflow-hidden border-2 p-0 ${
                  mainImage === i ? "border-primary" : "border-transparent"
                }`}
                aria-label={`View image ${i + 1}`}
              >
                <img
                  src={image}
                  className="w-20 h-20 object-cover hover:scale-105 transition-transform"
                  alt={`${product.name} thumbnail ${i + 1}`}
                />
              </button>
            ))}
          </div>
        </div>

        {/* Details */}
        <div className="space-y-4 p-2">
          <div className="flex items-center justify-between">
            <h1 className="text-2xl md:text-3xl font-bold">{product.name}</h1>
            <span className="text-sm badge badge-outline">
              {product.category}
            </span>
          </div>

          <div className="flex items-baseline gap-4">
            <span className="text-3xl font-extrabold text-primary">
              ${price.toFixed(2)}
            </span>
            <span className="text-sm text-gray-500">incl. taxes</span>
          </div>

          <p className="text-sm text-gray-600">{product.description}</p>

          <div className="">
            {/* <div className="flex items-center border rounded-md overflow-hidden">
              <button
                onClick={decrease}
                className="px-3 py-2 bg-gray-100 hover:bg-gray-200"
                aria-label="Decrease quantity"
              >
                -
              </button>
              <input
                type="number"
                value={qty}
                min={1}
                max={available}
                onChange={(e) =>
                  setQty(
                    Math.max(
                      1,
                      Math.min(Number(e.target.value || 1), available)
                    )
                  )
                }
                className="w-16 text-center px-2 py-2 outline-none"
                aria-label="Quantity"
              />
              <button
                onClick={increase}
                className="px-3 py-2 bg-gray-100 hover:bg-gray-200"
                aria-label="Increase quantity"
              >
                +
              </button>
            </div> */}

            <div className="text-gray-700 text-sm">
              Minimum order: {product.moq}
            </div>

            <div className="text-sm text-gray-600">
              (
              {available > 0 ? (
                <span>{available} in stock</span>
              ) : (
                <span className="text-red-600">Out of stock</span>
              )}
              )
            </div>
          </div>

          <div className="flex flex-col sm:flex-row gap-3 sm:gap-4">
            <Link to={`/order-form/${product._id}`}>
              <button
                disabled={role == "admin" || role == "manager"}
                className="btn btn-primary"
              >
                Order now
              </button>
            </Link>
          </div>

          <div className="pt-4 border-t">
            <h3 className="font-semibold mb-2">Product details</h3>
            <ul className="text-sm space-y-1 text-gray-700">
              <li>
                <strong>Category:</strong> {product.category}
              </li>
              <li>
                <strong>Available:</strong> {available}
              </li>
              <li>
                <strong>Payment Method:</strong> {product.paymentMethod}
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}

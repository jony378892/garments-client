import { useQuery } from "@tanstack/react-query";
import Loading from "../../../components/Shared/Loading";
import { Link } from "react-router";
import useAxiosSecure from "../../../hooks/useAxiosSecure";

export default function OurProducts() {
  const axiosSecure = useAxiosSecure();

  const { isLoading, data: products = [] } = useQuery({
    queryKey: ["home-products"],
    queryFn: async () => {
      const res = await axiosSecure.get("/products?limit=6");
      return res.data;
    },
  });

  if (isLoading) return <Loading />;

  return (
    <section className="py-16 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4">
        {/* Section Header */}
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-800">
            Our Products
          </h2>
          <p className="mt-4 text-gray-600 max-w-2xl mx-auto">
            Explore our latest garments designed with quality, comfort, and
            modern production standards in mind.
          </p>
        </div>

        {/* Products Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {products.map((product) => (
            <div
              key={product._id}
              className="bg-white rounded-2xl shadow-sm hover:shadow-md transition overflow-hidden"
            >
              <figure className="overflow-hidden">
                <img
                  src={product.images?.[0]}
                  alt={product.name}
                  className="h-56 w-full object-cover hover:scale-105 transition duration-300"
                />
              </figure>

              <div className="p-5 flex flex-col gap-3">
                <h3 className="text-lg font-semibold text-gray-800 hover:text-blue-600 transition cursor-pointer">
                  {product.name}
                </h3>

                <p className="text-sm text-gray-600 line-clamp-2">
                  {product.description}
                </p>

                <div className="flex items-center justify-between pt-2">
                  <span className="text-lg font-bold text-gray-800">
                    $ {product.price}
                  </span>

                  <Link to={`/product/${product._id}`}>
                    <button className="btn btn-sm btn-primary">
                      View Details
                    </button>
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* See All */}
        <div className="flex justify-center mt-12">
          <Link to="/products">
            <button className="btn btn-outline btn-primary px-8">
              See All Products
            </button>
          </Link>
        </div>
      </div>
    </section>
  );
}

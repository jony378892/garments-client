import { useQuery } from "@tanstack/react-query";
import useAxios from "../../hooks/useAxios";
import Loading from "../../components/Shared/Loading";
import { Link } from "react-router";

export default function Products() {
  const axiosInstance = useAxios();

  const { isLoading, data: products = [] } = useQuery({
    queryKey: ["products"],
    queryFn: async () => {
      const result = await axiosInstance.get(`/products`);
      return result.data;
    },
  });

  console.log(products);

  if (isLoading) {
    return <Loading />;
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-y-8 max-w-7xl mx-auto place-items-center py-5">
      {products.map((product) => (
        <div className="card bg-base-100 w-96 shadow-sm" key={product.id}>
          <figure>
            <img
              src={product.images[0]}
              className="h-56 w-full object-cover"
              alt="Shoes"
            />
          </figure>
          <div className="card-body">
            <h2 className="card-title hover:text-blue-600 hover:underline underline-offset-4 cursor-pointer decoration-2">
              {product.name}
            </h2>
            <p>{product.description}</p>
            <div className="flex items-center justify-between">
              <span>Price: {product.price}</span>
              <Link
                to={`/products/${product._id}`}
                className="card-actions justify-end"
              >
                <button className="btn btn-sm btn-primary">Buy Now</button>
              </Link>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

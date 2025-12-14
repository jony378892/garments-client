import { useQuery } from "@tanstack/react-query";
import { Link, useParams } from "react-router";
import useAxios from "../../hooks/useAxios";

export default function ProductDetails() {
  const { id } = useParams();
  const axiosInstance = useAxios();

  const { data: product } = useQuery({
    queryKey: ["product", id],
    queryFn: async () => {
      const result = await axiosInstance.get(`/products/${id}`);
      return result.data;
    },
  });

  console.log(product);

  return (
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
  );
}

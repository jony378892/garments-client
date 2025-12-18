import { useQuery } from "@tanstack/react-query";
import useAxios from "../../hooks/useAxios";
import Loading from "../../components/Shared/Loading";
import ProductCard from "./ProductCard";

export default function Products() {
  const axiosInstance = useAxios();

  const { isLoading, data: products = [] } = useQuery({
    queryKey: ["products"],
    queryFn: async () => {
      const res = await axiosInstance.get("/products");
      return res.data;
    },
  });

  if (isLoading) return <Loading />;

  return (
    <section className="py-16 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4">
        <div className="text-center mb-12">
          <h1 className="text-3xl md:text-4xl font-bold text-gray-800">
            Our Products
          </h1>
          <p className="mt-4 text-gray-600 max-w-2xl mx-auto">
            Browse our collection of high-quality garments designed for modern
            production and comfort.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 place-items-center">
          {products.map((product) => (
            <ProductCard key={product._id} product={product} />
          ))}
        </div>
      </div>
    </section>
  );
}

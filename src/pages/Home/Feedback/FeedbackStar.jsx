import { FaStar } from "react-icons/fa";

export default function FeedbackStar({ value }) {
  return (
    <div className="flex gap-1 mt-1">
      {[...Array(5)].map((_, i) => (
        <FaStar
          key={i}
          className={`size-3 sm:size-4 ${
            i < value ? "text-yellow-400" : "text-gray-400"
          }`}
        />
      ))}
    </div>
  );
}

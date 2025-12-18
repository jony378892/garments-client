import { FaStar } from "react-icons/fa";

export default function FeedbackStar({ value }) {
  return (
    <div className="flex gap-1">
      {[...Array(5)].map((_, i) => (
        <FaStar
          key={i}
          className={`${i < value ? "text-yellow-400" : "text-gray-400"}`}
        />
      ))}
    </div>
  );
}

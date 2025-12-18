import FeedbackStar from "./FeedbackStar";
import { FaQuoteLeft, FaQuoteRight } from "react-icons/fa";

export default function FeedbackCard({ feedback }) {
  return (
    <div className="flex flex-col justify-center items-center gap-6 p-6 bg-gray-200 rounded-2xl shadow-sm hover:shadow-md transition">
      {/* Review */}
      <p className=" text-gray-600 leading-relaxed flex  items-stretch  w-2/3 text-center gap-3 text-lg font-semibold ">
        <FaQuoteLeft className="self-start -mt-5" size={60} />“{feedback.review}
        ”
        <FaQuoteRight className="self-end -mb-5" size={60} />
      </p>

      {/* User Info */}
      <div className="flex items-center gap-4">
        <figure>
          <img
            src={feedback.photo}
            alt={feedback.name}
            className="w-12 h-12 rounded-full object-cover border"
          />
        </figure>

        <div className="flex flex-col">
          <p className="text-sm font-semibold text-gray-800">{feedback.name}</p>
          <FeedbackStar value={feedback.rating} />
        </div>
      </div>
    </div>
  );
}

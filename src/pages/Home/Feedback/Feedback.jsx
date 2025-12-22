import { Autoplay, Pagination } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";

import "swiper/css";
import "swiper/css/pagination";

import FeedbackCard from "./FeedbackCard";

export default function Feedback() {
  const feedbacks = [
    {
      id: 1,
      name: "Rahim Uddin",
      role: "Production Manager",
      company: "ABC Garments Ltd.",
      photo: "https://randomuser.me/api/portraits/men/32.jpg",
      rating: 5,
      review:
        "This system has completely improved how we track orders and production stages. We now deliver on time with fewer errors.",
    },
    {
      id: 2,
      name: "Nusrat Jahan",
      role: "Operations Executive",
      company: "Fashion Wear BD",
      photo: "https://randomuser.me/api/portraits/women/44.jpg",
      rating: 4,
      review:
        "Managing cutting, sewing, and finishing stages is much easier now. Inventory tracking saves us a lot of time every day.",
    },
    {
      id: 3,
      name: "Imran Hossain",
      role: "Factory Owner",
      company: "Prime Stitch Apparels",
      photo: "https://randomuser.me/api/portraits/men/65.jpg",
      rating: 5,
      review:
        "A must-have platform for small and medium garment factories. Clear reports and real-time updates help us make better decisions.",
    },
    {
      id: 4,
      name: "Farzana Akter",
      role: "Quality Control Officer",
      company: "Urban Style Garments",
      photo: "https://randomuser.me/api/portraits/women/68.jpg",
      rating: 4,
      review:
        "The production visibility is excellent. We can quickly identify delays and maintain quality standards more effectively.",
    },
  ];

  return (
    <section className="py-16 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4">
        {/* Section Header */}
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-800">
            What Our Clients Say
          </h2>
          <p className="mt-4 text-gray-600 max-w-2xl mx-auto">
            Trusted by garment factories to streamline production, improve
            visibility, and ensure on-time delivery.
          </p>
        </div>

        {/* Slider */}
        <Swiper
          loop={true}
          grabCursor={true}
          spaceBetween={30}
          centeredSlides={true}
          slidesPerView={1.8}
          autoplay={{
            delay: 2000,
            disableOnInteraction: false,
          }}
          pagination={true}
          modules={[Pagination, Autoplay]}
          className="mySwiper"
        >
          {feedbacks.map((feedback) => (
            <SwiperSlide key={feedback.id} className="pb-10">
              <FeedbackCard feedback={feedback} />
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </section>
  );
}

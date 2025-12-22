import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import { Link } from "react-router";

export default function Hero() {
  const slides = [
    {
      id: 1,
      title: "Smarter Garments Production Management",
      description:
        "Track buyer orders, manage cutting, sewing, and finishing stages, and ensure on-time delivery with a single powerful system.",
      image:
        "https://i.ibb.co.com/JWL82Nw5/gazipur-dhaka-bangladesh-1st-feb-2024-production-lines-show-workers-make-clothes-at-a-garment-factor.jpg",
      primaryCta: "Get Started",
      primaryLink: "/signup",
      secondaryCta: "Learn More",
      secondaryLink: "/about",
    },
    {
      id: 2,
      title: "Real-Time Production Tracking",
      description:
        "Monitor each production stage in real time and identify delays before they impact delivery schedules.",
      image:
        "https://i.ibb.co.com/cRJ9nd4/equalstock-kuyum-G6h-KWk-unsplash.jpg",
      primaryCta: "View Features",
      primaryLink: "/features",
    },
    {
      id: 3,
      title: "Inventory Control Made Easy",
      description:
        "Keep raw materials and finished goods in check to avoid shortages and production downtime.",
      image:
        "https://i.ibb.co.com/G4t3dnF6/kevin-limbri-m-BXQCNKbq7-E-unsplash.jpg",
      primaryCta: "Explore Inventory",
      primaryLink: "/features",
    },
  ];

  return (
    <section className="relative overflow-hidden">
      <Swiper
        loop
        autoplay={{ delay: 4000, disableOnInteraction: false }}
        pagination
        modules={[Autoplay, Pagination]}
        className="h-[450px]"
      >
        {slides.map((slide) => (
          <SwiperSlide key={slide.id}>
            {/* Background Image */}
            <div
              className="relative h-[450px] w-full bg-cover bg-center"
              style={{ backgroundImage: `url(${slide.image})` }}
            >
              {/* Dark Overlay */}
              <div className="absolute inset-0 bg-black/50" />

              {/* Content */}
              <div className="relative z-10 h-full flex items-center">
                <div className="max-w-7xl mx-auto px-4 w-full">
                  <div className="max-w-xl text-white ml-5">
                    <h1 className="text-3xl md:text-4xl font-bold leading-tight">
                      {slide.title}
                    </h1>

                    <p className="mt-5 text-sm sm:text-lg text-gray-200">
                      {slide.description}
                    </p>

                    <div className="mt-8 flex flex-wrap gap-4">
                      <Link to={slide.primaryLink}>
                        <button className="px-8 py-3 rounded-lg bg-blue-600 text-white font-semibold hover:bg-blue-700 transition">
                          {slide.primaryCta}
                        </button>
                      </Link>

                      {slide.secondaryCta && (
                        <Link to={slide.secondaryLink}>
                          <button className="px-8 py-3 rounded-lg border border-white/60 text-white hover:bg-white/10 transition">
                            {slide.secondaryCta}
                          </button>
                        </Link>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </section>
  );
}

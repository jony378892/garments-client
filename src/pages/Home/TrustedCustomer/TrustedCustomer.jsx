import Marquee from "react-fast-marquee";
import img1 from "../../../assets/logo/1.jpg";
import img2 from "../../../assets/logo/2.jpg";
import img3 from "../../../assets/logo/3.png";
import img4 from "../../../assets/logo/4.webp";
import img5 from "../../../assets/logo/5.png";
import img6 from "../../../assets/logo/6.png";
import img7 from "../../../assets/logo/7.png";
import { useMemo } from "react";

const images = [img1, img2, img3, img4, img5, img6, img7];

export default function TrustedCustomer({
  title = "Our Trusted Customers",
  subtitle = "Partnered with globally recognized brands built on quality, consistency, and trust.",
  logos = images,
}) {
  const logoItems = useMemo(
    () =>
      logos.map((src, i) => ({ src, alt: `Trusted customer logo ${i + 1}` })),
    [logos]
  );

  return (
    <section
      className="max-w-7xl mx-auto px-4 py-10"
      role="region"
      aria-label="Trusted customers"
    >
      {/* Section Header */}
      <div className="text-center mb-8">
        <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-gray-800">
          {title}
        </h2>
        <p className="mt-3 text-gray-600 max-w-2xl mx-auto">{subtitle}</p>
      </div>

      <div className="bg-white rounded-lg shadow-sm p-4">
        <Marquee
          className="py-4"
          pauseOnHover={true}
          pauseOnClick={true}
          gradient={false}
          speed={40}
          aria-label="Trusted customers logos carousel"
        >
          {logoItems.map((logo, index) => (
            <figure
              key={index}
              className="flex items-center justify-center mx-6 w-40 h-20 md:w-48 md:h-24 shrink-0"
            >
              <img
                src={logo.src}
                alt={logo.alt}
                loading="lazy"
                className="max-h-full max-w-full object-contain grayscale hover:grayscale-0 transition-all duration-300"
              />
            </figure>
          ))}
        </Marquee>
      </div>
    </section>
  );
}

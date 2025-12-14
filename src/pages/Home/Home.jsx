import Hero from "./Hero/Hero";
import OurProducts from "./OurProducts/OurProducts";
import HowItWorks from "./HowItWorks/HowItWorks";
import Feedback from "./Feedback/Feedback";
import NewsLetter from "./NewsLetter/NewsLetter";

export default function Home() {
  return (
    <div>
      <Hero />
      <OurProducts />
      <HowItWorks />
      <Feedback />
      <NewsLetter />
    </div>
  );
}

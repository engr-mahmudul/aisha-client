// app/page.tsx

import ServingSince from "@/components/ ServingSince";
import FoodCategories from "@/components/FoodCategories";
import Hero from "@/components/Hero";
import WideShowcaseImage from "@/components/WideShowcaseImage";

export default function HomePage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-white  to-white">
      <Hero />
      <FoodCategories />

      <WideShowcaseImage
        src="/assets/images/Menu.png" // put file under /public
        alt="Restaurant banner"
        caption="Our Signature Menu"
      />
      <ServingSince />
    </div>
  );
}

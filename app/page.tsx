// app/page.tsx

import ServingSince from "@/components/ ServingSince";
import FoodCategories from "@/components/FoodCategories";
import Hero from "@/components/Hero";
import WideShowcaseDocument from "@/components/WideShowcaseImage";

export default function HomePage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-white  to-white">
      <Hero />
      <FoodCategories />

      <WideShowcaseDocument src="/assets/menu.pdf" alt="Restaurant menu PDF" />
      <ServingSince />
    </div>
  );
}

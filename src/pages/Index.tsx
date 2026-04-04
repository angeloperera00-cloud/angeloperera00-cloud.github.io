import Hero from "@/components/Hero";
import Scents from "@/components/Scents";
import BrandStory from "@/components/BrandStory";
import Newsletter from "@/components/Newsletter";
import Footer from "@/components/Footer";

const Index = () => {
  return (
    <main className="min-h-screen bg-background">
      <Hero />
      <Scents />
      <BrandStory />
      <Newsletter />
      <Footer />
    </main>
  );
};

export default Index;

import Hero from "@/components/Hero";
import Scents from "@/components/Scents";
import BrandStory from "@/components/BrandStory";
import Atmosphere from "@/components/Atmosphere";
import Newsletter from "@/components/Newsletter";
import Footer from "@/components/Footer";
import WhatsAppButton from "@/components/WhatsAppButton";

const Index = () => {
  return (
    <main className="min-h-screen bg-background">
      <Hero />
      <BrandStory />
      <section id="atmosphere"><Atmosphere /></section>
      <Scents />
      <Newsletter />
      <Footer />
      <WhatsAppButton />
    </main>
  );
};

export default Index;

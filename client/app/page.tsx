import Navbar from "@/components/sections/Navbar";
import Hero from "@/components/sections/Hero";
import About from "@/components/sections/About";
import Services from "@/components/sections/Services";
import Stats from "@/components/sections/Stats";
import Gallery from "@/components/sections/Gallery";
import Pricing from "@/components/sections/Pricing";
import Testimonials from "@/components/sections/Testimonials";
import Partners from "@/components/sections/Partners";
import FAQ from "@/components/sections/FAQ";
import CTABanner from "@/components/sections/CTABanner";
import Blog from "@/components/sections/Blog";
import Footer from "@/components/sections/Footer";

export default function Home() {
  return (
    <main className="bg-[#0b0b0b] overflow-x-hidden">
      <Navbar />
      <Hero />
      <About />
      <Services />
      <Stats />
      <Gallery />
      <Pricing />
      <Testimonials />
      <Partners />
      <FAQ />
      <CTABanner />
      <Blog />
      <Footer />
    </main>
  );
}

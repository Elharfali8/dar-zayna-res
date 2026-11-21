import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <>
      <Navbar />
      <main id="main">
        <Hero />
        {/* Temporary space until the middle sections are built */}
        <div className="h-[150vh]" />
      </main>
      <Footer />
    </>
  );
}

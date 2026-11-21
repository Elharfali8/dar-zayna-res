import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import Story from "@/components/Story";
import SignatureDishes from "@/components/SignatureDishes";
import QrMenu from "@/components/QrMenu";
import Gallery from "@/components/Gallery";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <>
      <Navbar />
      <main id="main">
        <Hero />
        <Story />
        <SignatureDishes />
        <QrMenu />
        <Gallery />
      </main>
      <Footer />
    </>
  );
}

import FeaturedCourses from '@/components/FeaturedCourses';
import FeaturedWebinars from '@/components/FeaturedWebinars';
import HeroSection from '@/components/HeroSection';
import Testimonialcard from '@/components/Testimonialcard';
import WavySection from '@/components/WavySection';
import WhyChooseUs from '@/components/WhyChooseUs';

export default function Home() {
  return (
    <main className="min-h-screen bg-black/[0.96] antialiased bg-grid-white/[0.02]">
      <HeroSection />
      <FeaturedCourses />
      <WhyChooseUs />
      <Testimonialcard />
      <FeaturedWebinars />
      <WavySection />
    </main>
  );
}

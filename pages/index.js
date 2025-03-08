import Layout from '../components/Layout';
import HeroSection from '../components/home/HeroSection';
import FeaturedStudios from '../components/home/FeaturedStudios';
import FeaturedCities from '../components/home/FeaturedCities';
import ExploreCities from '../components/home/ExploreCities';

export default function Home() {
  return (
    <Layout>
      <div className="max-w-6xl mx-auto">
        <HeroSection />
        <FeaturedStudios />
        <FeaturedCities />
        <ExploreCities />
      </div>
    </Layout>
  );
} 
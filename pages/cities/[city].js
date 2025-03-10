import { useEffect } from 'react';
import { useRouter } from 'next/router';

// This is a minimal page that redirects to the home page with search parameters
export default function CityPage() {
  const router = useRouter();
  const { city } = router.query;
  
  useEffect(() => {
    if (city) {
      router.replace(`/?location=${encodeURIComponent(city)}`);
    }
  }, [city, router]);
  
  return <div>Redirecting...</div>;
}

// Generate static paths for the most popular cities to avoid build errors
export async function getStaticPaths() {
  return {
    paths: [],
    fallback: true,
  };
}

// Get the city data for a specific city
export async function getStaticProps({ params }) {
  return {
    props: { city: params.city },
  };
} 
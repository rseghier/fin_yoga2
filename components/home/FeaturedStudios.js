import YogaStudioCard from '../YogaStudioCard';

export default function FeaturedStudios({ studios = [] }) {
  return (
    <section className="mb-16">
      <p className="text-sm text-gray-600 mb-4">Browsing featured studios</p>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {studios.length > 0 ? (
          studios.map((studio, index) => (
            <YogaStudioCard key={index} studio={studio} />
          ))
        ) : (
          <p>No featured studios available.</p>
        )}
      </div>
    </section>
  );
} 
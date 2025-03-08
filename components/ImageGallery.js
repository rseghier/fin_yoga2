import Image from 'next/image';

export default function ImageGallery({ images }) {
  if (!images || images.length === 0) return null;
  
  return (
    <div className="my-8 grid grid-cols-1 gap-4 sm:grid-cols-2">
      {images.map((image, index) => (
        <div key={index} className="relative aspect-[4/3]">
          <img
            src={image}
            alt={`Studio image ${index + 1}`}
            className="absolute inset-0 h-full w-full rounded-lg object-cover"
          />
        </div>
      ))}
    </div>
  );
} 
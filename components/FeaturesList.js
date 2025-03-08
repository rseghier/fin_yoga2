import { FaCheck } from 'react-icons/fa';

export default function FeaturesList({ features = [] }) {
  if (!features || features.length === 0) return null;
  
  return (
    <div className="space-y-3 mt-4">
      {features.map((feature, index) => (
        <div key={index} className="flex items-start">
          <FaCheck className="text-green-500 mt-1 mr-2 flex-shrink-0" />
          <span>{feature}</span>
        </div>
      ))}
    </div>
  );
} 
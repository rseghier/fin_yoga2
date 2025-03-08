import Image from 'next/image';
import Link from 'next/link';

const MDXComponents = {
  h1: (props) => (
    <h1 className="text-3xl font-bold mt-8 mb-4" {...props} />
  ),
  h2: (props) => (
    <h2 className="text-2xl font-bold mt-6 mb-3" {...props} />
  ),
  h3: (props) => (
    <h3 className="text-xl font-bold mt-4 mb-2" {...props} />
  ),
  p: (props) => (
    <p className="mb-4 leading-relaxed" {...props} />
  ),
  a: (props) => (
    <Link className="text-primary hover:underline" {...props} />
  ),
  ul: (props) => (
    <ul className="mb-4 pl-5 list-disc" {...props} />
  ),
  ol: (props) => (
    <ol className="mb-4 pl-5 list-decimal" {...props} />
  ),
  li: (props) => (
    <li className="ml-4 mb-2" {...props} />
  ),
  img: ({ src, alt, ...props }) => (
    <div className="my-6 relative rounded-lg overflow-hidden">
      <img
        src={src}
        alt={alt || ""}
        className="w-full h-auto rounded-lg"
        {...props}
      />
    </div>
  ),
  strong: (props) => (
    <strong className="font-bold" {...props} />
  ),
  blockquote: (props) => (
    <blockquote className="border-l-4 border-gray-300 pl-4 italic my-4" {...props} />
  ),
};

export default MDXComponents; 
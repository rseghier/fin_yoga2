import { useState } from 'react';
import Head from 'next/head';
import Link from 'next/link';
import { MDXRemote } from 'next-mdx-remote';
import { serialize } from 'next-mdx-remote/serialize';
import Layout from '../../components/Layout';
import TagsList from '../../components/TagsList';
import StudioInfo from '../../components/StudioInfo';
import ImageGallery from '../../components/ImageGallery';
import MDXComponents from '../../components/MDXComponents';
import { getAllStudioSlugs, getStudioData, extractGalleryImages } from '../../utils/studioUtils';
import { FaArrowLeft } from 'react-icons/fa';

export default function StudioPage({ studioData, mdxSource }) {
  if (!studioData) {
    return (
      <Layout>
        <div className="text-center py-12">
          <h1 className="text-3xl font-bold mb-4">Studio Not Found</h1>
          <p className="mb-6">We couldn't find the studio you're looking for.</p>
          <Link href="/" className="btn">
            Back to Home
          </Link>
        </div>
      </Layout>
    );
  }

  const {
    title,
    date,
    tags,
    summary,
    city,
    state,
    country,
    gm_reviews_count,
    gm_totalScore,
    galleryImages
  } = studioData;

  // Format the date - now using the date string from props
  const formattedDate = new Date(date).toLocaleDateString('en-US', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });

  return (
    <Layout title={`${title} | FindYoga`}>
      <div className="max-w-4xl mx-auto">
        {/* Back button */}
        <Link href="/" className="inline-flex items-center text-gray-600 hover:text-primary mb-6">
          <FaArrowLeft className="mr-2" />
          <span>Back to school list</span>
        </Link>

        {/* Date */}
        <div className="text-gray-500 mb-2">{formattedDate}</div>

        {/* Title */}
        <h1 className="text-4xl font-bold mb-6">{title}</h1>

        {/* Tags */}
        <TagsList tags={tags} />

        {/* Main content - mdxSource will be rendered here */}
        <div className="prose prose-lg max-w-none">
          <MDXRemote {...mdxSource} components={MDXComponents} />
        </div>
      </div>
    </Layout>
  );
}

export async function getStaticPaths() {
  const paths = getAllStudioSlugs();
  return {
    paths,
    fallback: false, // Return 404 for non-existent slugs
  };
}

export async function getStaticProps({ params }) {
  const { slug } = params;
  const studioData = getStudioData(slug);
  
  if (!studioData) {
    return {
      props: {
        studioData: null,
        mdxSource: null,
      },
    };
  }
  
  // Process the MDX content
  const mdxSource = await serialize(studioData.content, {
    // mdxOptions here if needed
  });

  // Extract gallery images from the content
  const galleryImages = extractGalleryImages(studioData.content);

  // Create a JSON-serializable version of the data
  // Convert Date objects to ISO strings
  const serializedStudioData = {
    ...studioData,
    // Ensure date is a string (ISO format)
    date: studioData.date instanceof Date ? studioData.date.toISOString() : studioData.date,
    galleryImages,
  };

  return {
    props: {
      studioData: serializedStudioData,
      mdxSource,
    },
  };
} 
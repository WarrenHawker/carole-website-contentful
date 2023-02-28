import Fallback from '@/components/fallback';
import { createClient } from 'contentful';
import Link from 'next/link';
import { useState, useEffect } from 'react';

const formatDate = (date) => {
  const newDate = new Date(date);
  const options = { month: 'short', year: 'numeric' };
  return new Intl.DateTimeFormat('en-GB', options).format(newDate);
};

const client = createClient({
  space: process.env.SPACE_ID,
  accessToken: process.env.ACCESS_TOKEN,
});

export const getStaticPaths = async () => {
  const response = await client.getEntries({ content_type: 'artwork' });

  const paths = response.items.map((item) => {
    return {
      params: { slug: item.fields.slug },
    };
  });

  return {
    paths,
    fallback: true,
  };
};

export const getStaticProps = async ({ params }) => {
  const { items } = await client.getEntries({
    content_type: 'artwork',
    'fields.slug': params.slug,
  });

  const reponse = await client.getEntries({
    content_type: 'artwork',
  });

  if (!items.length) {
    return {
      redirect: {
        destination: '/',
        permanent: false,
      },
    };
  }

  return {
    props: {
      slugsArray: reponse.items.map((item) => item.fields.slug),
      artwork: items[0],
    },
    revalidate: 1,
  };
};

const ArtworkDetails = ({ artwork, slugsArray }) => {
  const [prevSlug, setPrevSlug] = useState();
  const [nextSlug, setNextSlug] = useState();

  useEffect(() => {
    setPrevSlug(slugsArray[slugsArray.indexOf(artwork.fields.slug) - 1]);
    setNextSlug(slugsArray[slugsArray.indexOf(artwork.fields.slug) + 1]);
  }, [slugsArray]);
  if (!artwork) return <Fallback />;
  return (
    <section className='about-page'>
      <div className='next-prev-buttons'>
        {prevSlug ? (
          <Link className='btn' href={`/art/${prevSlug}`}>
            Previous piece
          </Link>
        ) : null}
        {nextSlug ? (
          <Link className='btn' href={`/art/${nextSlug}`}>
            Next piece
          </Link>
        ) : null}
      </div>
      <div className='about-pic'>
        <img src={artwork.fields.image.fields.file.url} alt='' />
      </div>
      <article className='about-info'>
        <h1 className='page-title'>
          {artwork.fields.title}{' '}
          <p>{formatDate(artwork.fields.createdOnDate)}</p>
        </h1>
        <p>{artwork.fields.description}</p>
        {/* <p>
          <Link className='text-link' href='/contact'>
            Contact me
          </Link>{' '}
          to buy this piece
        </p> */}
      </article>
    </section>
  );
};

export default ArtworkDetails;

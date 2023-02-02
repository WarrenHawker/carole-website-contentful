import { createClient } from 'contentful';
import Link from 'next/link';

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
    fallback: false,
  };
};

export const getStaticProps = async ({ params }) => {
  const { items } = await client.getEntries({
    content_type: 'artwork',
    'fields.slug': params.slug,
  });

  return {
    props: { artwork: items[0] },
  };
};

const ArtworkDetails = ({ artwork }) => {
  console.log(artwork);
  return (
    <section className='about-page'>
      <div className='about-pic'>
        <img src={artwork.fields.image.fields.file.url} alt='' />
      </div>
      <article className='about-info'>
        <h1 className='page-title'>
          {artwork.fields.title} <p>{artwork.fields.createdOnDate}</p>
        </h1>
        <p>{artwork.fields.description}</p>
        <p>
          <Link className='read-more' href='/contact'>
            Contact me
          </Link>{' '}
          to buy this piece
        </p>
      </article>
    </section>
  );
};

export default ArtworkDetails;

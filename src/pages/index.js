import { createClient } from 'contentful';
import Link from 'next/link';

const formatDate = (date) => {
  const newDate = new Date(date);
  const options = { month: 'short', year: 'numeric' };
  return new Intl.DateTimeFormat('en-GB', options).format(newDate);
};

export const getStaticProps = async () => {
  const client = createClient({
    space: process.env.SPACE_ID,
    accessToken: process.env.ACCESS_TOKEN,
  });

  const response = await client.getEntries({
    content_type: 'artwork',
    'fields.frontPageImage': true,
  });

  return {
    props: {
      artwork: response.items,
      revalidate: 1,
    },
  };
};

const Home = ({ artwork }) => {
  return (
    <section className='home-page'>
      <div className='profile-pic'>
        <img src='carole-profile-pic-2.jpg' alt='profile picture' />
      </div>

      <h1 className='page-title'>Carole Tongue</h1>
      <h2>spontaneous artwork in oils and acrylics</h2>

      <div className='featured-pic'>
        <img
          src={artwork[0].fields.image.fields.file.url}
          alt='featured artwork'
        />
        <p>
          {artwork[0].fields.title}{' '}
          <span>{formatDate(artwork[0].fields.createdOnDate)}</span>
        </p>
      </div>

      <p>
        Born in Lausanne and having lived in the UK, France, Luxembourg and
        Belgium, and with constant travels across Europe and beyond, I have
        experienced and been inspired by much diverse art and culture. Without
        any formal art school training, I have always loved colour and how
        different artists have achieved textured multicoloured surfaces,
        particularly Sir Frank Bowling RA.{' '}
        <Link href='/about' className='text-link'>
          Read More...
        </Link>
        <Link href='/art' className='btn CTA-button'>
          View my work
        </Link>
      </p>
    </section>
  );
};

export default Home;

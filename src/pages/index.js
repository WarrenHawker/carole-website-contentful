import { createClient } from 'contentful';
import Link from 'next/link';

export const getStaticProps = async () => {
  const client = createClient({
    space: process.env.SPACE_ID,
    accessToken: process.env.ACCESS_TOKEN,
  });

  const response = await client.getEntries({ content_type: 'artwork' });

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
        <img src='carole-profile-pic.png' alt='profile picture' />
      </div>

      <h1 className='page-title'>Carole Tongue</h1>
      <h2>spontaneous artwork in oils and acrylics</h2>

      <div className='featured-pic'>
        <img src='featured-art.png' alt='featured artwork' />
      </div>

      <p>
        Born in Lausanne and having lived in the UK, France, Luxembourg and
        Belgium, and with constant travels across Europe and beyond, I have
        experienced and been inspired by much diverse art and culture. Without
        any formal art school training, I have always loved colour and how
        different artists have achieved textured multicoloured surfaces,
        particularly Sir Frank Bowling RA.{' '}
        <Link href='/about' className='read-more'>
          Read More...
        </Link>
      </p>
      <Link href='/art' className='btn CTA-button'>
        <p>View my work</p>
      </Link>
    </section>
  );
};

export default Home;

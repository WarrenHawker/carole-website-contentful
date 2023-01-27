import { createClient } from 'contentful';

export const getStaticProps = async () => {
  const client = createClient({
    space: process.env.SPACE_ID,
    accessToken: process.env.ACCESS_TOKEN,
  });

  const response = await client.getEntries({ content_type: 'artwork' });

  return {
    props: {
      artwork: response.items,
    },
  };
};

const Artwork = ({ artwork }) => {
  console.log(artwork);
  return (
    <>
      {artwork.map((art) => {
        return (
          <div>
            <h3>{art.fields.title}</h3>
            <p>{art.fields.description}</p>
          </div>
        );
      })}
    </>
  );
};

export default Artwork;

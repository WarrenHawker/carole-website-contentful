import { createClient } from 'contentful';
import { useState } from 'react';
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
    },
  };
};

const Artwork = ({ artwork }) => {
  const [search, setSearch] = useState('');
  const [categories, setCategories] = useState([
    { id: 'Abstracts', name: 'Abstract Paintings', selected: true },
    { id: 'Drip Paintings', name: 'Drip Paintings', selected: true },
    { id: 'Figuratives', name: 'Figurative Paintings', selected: true },
  ]);

  console.log(artwork);

  const displayArtCategories = categories.map((category, index) => {
    if (!category.selected) {
      return;
    }
    return (
      <div className='art-category-container' key={index}>
        <h2>{category.name}</h2>
        {artwork
          .filter((art) => {
            const title = art.fields.title.toLowerCase();
            if (search == '') {
              return art.fields.category == category.id;
            } else {
              return (
                art.fields.category == category.id && title.includes(search)
              );
            }
          })
          .map((art, index) => {
            return (
              <div className='art-card' key={index}>
                <h3>{art.fields.title}</h3>
                <p>{art.fields.createdOnDate}</p>
                <div className='art-pic'>
                  <img src={art.fields.image.fields.file.url} />
                </div>
                <Link href={`/art/${art.fields.slug}`} className='btn'>
                  View Details
                </Link>
              </div>
            );
          })}
      </div>
    );
  });

  const displayCategoriesFilter = categories.map((category, index) => {
    return (
      <div key={index}>
        <input
          type='checkbox'
          name={category.id}
          onChange={(e) => filterCategories(e)}
          checked={category.selected}
        />
        <label htmlFor={category.id}>{category.name}</label>
      </div>
    );
  });

  const filterCategories = (e) => {
    setCategories((prevState) => {
      return prevState.map((item) => {
        if (e.target.name == item.id) {
          return { ...item, selected: !item.selected };
        } else return { ...item };
      });
    });
  };
  return (
    <section className='art-page'>
      <h1 className='page-title'>Artwork for sale</h1>
      <h2>Prices available on request</h2>
      <div className='inputs-container'>
        <div className='search-input'>
          <label htmlFor='search'>Search artwork</label>
          <input
            name='search'
            type='text'
            placeholder='Search'
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>

        <fieldset className='category-input'>
          <legend>Filter by category</legend>
          {displayCategoriesFilter}
        </fieldset>
      </div>

      {displayArtCategories}
    </section>
  );
};

export default Artwork;

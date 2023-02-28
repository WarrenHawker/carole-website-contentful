import { createClient } from 'contentful';
import { useState, useEffect } from 'react';
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

  const response = await client.getEntries({ content_type: 'artwork' });

  return {
    props: {
      artwork: response.items,
    },
  };
};

const Artwork = ({ artwork }) => {
  const [search, setSearch] = useState('');
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    fetchCategories();
  }, []);

  const fetchCategories = async () => {
    let newCategories = [];
    artwork.forEach((art) => {
      if (!newCategories.includes(art.fields.category[0])) {
        newCategories.push(art.fields.category[0]);
      } else return;
    });
    setCategories(() => {
      return newCategories.map((item) => {
        return {
          name: item,
          selected: true,
        };
      });
    });
  };

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
              return art.fields.category == category.name;
            } else {
              return (
                art.fields.category == category.name && title.includes(search)
              );
            }
          })
          .map((art, index) => {
            return (
              <div className='art-card' key={index}>
                <h3>{art.fields.title}</h3>
                <p>{formatDate(art.fields.createdOnDate)}</p>
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
          name={category.name}
          onChange={(e) => filterCategories(e)}
          checked={category.selected}
        />
        <label htmlFor={category.name}>{category.name}</label>
      </div>
    );
  });

  const filterCategories = (e) => {
    setCategories((prevState) => {
      return prevState.map((item) => {
        if (e.target.name == item.name) {
          return { ...item, selected: !item.selected };
        } else return { ...item };
      });
    });
  };
  return (
    <section className='art-page'>
      <h1 className='page-title'>Artwork for sale</h1>
      {/* <h2>Prices available on request</h2> */}
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

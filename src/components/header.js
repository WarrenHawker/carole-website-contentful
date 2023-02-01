import Link from 'next/link';
import { useRouter } from 'next/router';
import { useState, useEffect } from 'react';

const Header = () => {
  const router = useRouter();
  const currentRoute = router.pathname;
  const [navShow, setNavShow] = useState(false);

  const toggleNav = () => {
    setNavShow(!navShow);
  };

  useEffect(() => {
    const handleClick = (e) => {
      if (
        e.target.id == 'nav-icon' ||
        e.target.className.includes('nav-icon-span')
      ) {
        return;
      }
      setNavShow(false);
      console.log('yes');
    };

    if (navShow) {
      document.addEventListener('click', (e) => handleClick(e));
    }
  }, [navShow]);

  return (
    <header>
      <Link href='/' className='header-title'>
        <h1>Carole Tongue</h1>
      </Link>
      <nav>
        <div
          id='nav-icon'
          className={navShow ? 'open' : ''}
          onClick={toggleNav}>
          <span className='nav-icon-span'></span>
          <span className='nav-icon-span'></span>
          <span className='nav-icon-span'></span>
          <span className='nav-icon-span'></span>
        </div>
        <div className={navShow ? 'nav-links active' : 'nav-links'}>
          <Link
            className={
              currentRoute === '/' ? 'top-nav-link active' : 'top-nav-link'
            }
            href='/'>
            Home
          </Link>
          <Link
            className={
              currentRoute === '/about' ? 'top-nav-link active' : 'top-nav-link'
            }
            href='/about'>
            About Me
          </Link>
          <Link
            className={
              currentRoute === '/art' ? 'top-nav-link active' : 'top-nav-link'
            }
            href='/art'>
            Art
          </Link>
          <Link
            className={
              currentRoute === '/contact'
                ? 'top-nav-link active'
                : 'top-nav-link'
            }
            href='/contact'>
            Contact
          </Link>
        </div>
      </nav>
    </header>
  );
};

export default Header;

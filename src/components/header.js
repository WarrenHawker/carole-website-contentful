import Link from 'next/link';
import { useRouter } from 'next/router';
import { useState } from 'react';

const Header = () => {
  const router = useRouter();
  const currentRoute = router.pathname;
  const [navShow, setNavShow] = useState(false);
  return (
    <header>
      <h1>Carole Tongue</h1>
      <nav>
        <div
          id='nav-icon'
          className={navShow ? 'open' : ''}
          onClick={() => setNavShow(!navShow)}>
          <span></span>
          <span></span>
          <span></span>
          <span></span>
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

import Link from 'next/link';
import { useRouter } from 'next/router';

const Header = () => {
  const router = useRouter();
  const currentRoute = router.pathname;
  console.log(currentRoute);
  return (
    <header>
      <h1>Carole Tongue</h1>
      <nav>
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
            currentRoute === '/contact' ? 'top-nav-link active' : 'top-nav-link'
          }
          href='/contact'>
          Contact
        </Link>
      </nav>
    </header>
  );
};

export default Header;

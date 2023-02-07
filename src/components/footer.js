import Link from 'next/link';
import { useRouter } from 'next/router';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCopyright } from '@fortawesome/free-solid-svg-icons';

const Footer = () => {
  const router = useRouter();
  const currentRoute = router.pathname;
  return (
    <footer>
      <div className='footer-left'>
        <h3>Explore</h3>
        <nav>
          <Link
            className={
              currentRoute === '/'
                ? 'footer-nav-link active'
                : 'footer-nav-link'
            }
            href='/'>
            Home
          </Link>
          <Link
            className={
              currentRoute === '/about'
                ? 'footer-nav-link active'
                : 'footer-nav-link'
            }
            href='/about'>
            About Me
          </Link>
          <Link
            className={
              currentRoute === '/art'
                ? 'footer-nav-link active'
                : 'footer-nav-link'
            }
            href='/art'>
            Art
          </Link>
          <Link
            className={
              currentRoute === '/contact'
                ? 'footer-nav-link active'
                : 'footer-nav-link'
            }
            href='/contact'>
            Contact
          </Link>
        </nav>
      </div>
      <div className='footer-right'>
        <h3>Legal</h3>
        <Link
          className={
            currentRoute === '/privacy-policy'
              ? 'footer-nav-link active'
              : 'footer-nav-link'
          }
          href='/privacy-policy'>
          Privacy Policy
        </Link>
        <p>
          <FontAwesomeIcon icon={faCopyright} />
          <span>2023 Carole Tongue. All rights reserved</span>
        </p>
        <p>website designed and built by Warren Hawker </p>
      </div>
    </footer>
  );
};

export default Footer;

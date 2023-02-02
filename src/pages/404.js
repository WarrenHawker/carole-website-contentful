import Link from 'next/link';
import { useEffect } from 'react';
import { useRouter } from 'next/router';

const PageNotFound = () => {
  const router = useRouter();

  useEffect(() => {
    setTimeout(() => {
      router.push('/');
    }, 4000);
  }, []);

  return (
    <section className='page-not-found'>
      <h2>404</h2>
      <h3>I'm sorry, that page cannot be found</h3>
      <p>
        Redirecting to{' '}
        <Link href='/' className='text-link'>
          Homepage
        </Link>
      </p>
    </section>
  );
};

export default PageNotFound;

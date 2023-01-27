import Link from 'next/link';
import Header from './header';
import Footer from './footer';

const Layout = ({ children }) => {
  return (
    <div className='layout'>
      <Header />
      <main>{children}</main>

      <Footer />
    </div>
  );
};

export default Layout;

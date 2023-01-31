import Layout from '@/components/layout';
import '@/styles/globals.css';
// import Font Awesome CSS
import '@fortawesome/fontawesome-svg-core/styles.css';

import { config } from '@fortawesome/fontawesome-svg-core';
// Tell Font Awesome to skip adding the CSS automatically
// since it's already imported above
config.autoAddCss = false;

const App = ({ Component, pageProps }) => {
  return (
    <Layout>
      <Component {...pageProps} />
    </Layout>
  );
};

export default App;

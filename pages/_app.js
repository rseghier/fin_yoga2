import '../styles/globals.css';
import '../styles/studio.css';
import { SearchProvider } from '../contexts/SearchContext';

function MyApp({ Component, pageProps }) {
  return (
    <SearchProvider>
      <Component {...pageProps} />
    </SearchProvider>
  );
}

export default MyApp; 
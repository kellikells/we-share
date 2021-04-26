import { GlobalProvider, GlobalContext } from '../context/GlobalState';

import '../styles/index.css';


function MyApp({ Component, pageProps }) {

  return (

    <GlobalProvider>
      <Component {...pageProps} />
    </GlobalProvider>
    
  );
}


export default MyApp

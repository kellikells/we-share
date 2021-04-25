import React, {useContext}  from 'react';
// import React,  from 'react';

// import { GlobalProvider } from '../context/GlobalState';

import { Header } from '../components/Header';
import { LoginButton } from '../components/LoginButton';
import { RegisterButton } from '../components/RegisterButton';

// --------------------------------------------------------------

const Index = () => {

  return (
    // <GlobalProvider  >
      <div className='fontSansPro w-full max-h-screen mx-auto
                p-6 border-solid border-gray-200 border-2 mt-8
                md:w-2/5'>

        <Header />
        <div className='text-center mt-20 space-y-2'>
 
          <LoginButton />
          <RegisterButton />
        </div>
  
      </div>
    // </GlobalProvider>


  );
}





export default Index;

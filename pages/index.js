import React from 'react';
import fetch from 'isomorphic-unfetch';
import { GlobalProvider } from '../context/GlobalState';
import { Header } from '../components/Header';

import { LoginButton } from '../components/LoginButton';
import { RegisterButton } from '../components/RegisterButton';

// const Index = ({ items }) => {
const Index = () => {

  return (
    <GlobalProvider  >
      <div className='fontSansPro w-full max-h-screen mx-auto
                p-6 border-solid border-gray-200 border-2 mt-8
                md:w-2/5'>

        <Header />
        <div className='text-center mt-20 space-y-2'>
        {/* <div className='space-x-2 text-center space-y-20'> */}
          <LoginButton />
          <RegisterButton />
        </div>
  
      </div>
    </GlobalProvider>


    // <GlobalProvider >

    //   {isMobileSize ?
    //     <div onClick={() => {
    //       toggleIsMobileSize()
    //     }}>

    //       <div className='container'>
    //         <Header />
    //         <ItemList />
    //         <AddItemForm />
    //       </div>

    //     </div>
    //     :
    //     <div className='container'>
    //       <Header />
    //       <ItemList />
    //       <AddItemForm />
    //     </div>}
    // </GlobalProvider>
  );
}



// export async function getStaticProps() {
//   const res = await fetch('/api/items');

//   // the api sends back an OBJECT and it has a PROPERTY 'data' on it, so here we extract that property
//   const items = await res.json();
//   if (!items) {
//     return {
//       notFound: true,
//     }
//   }
//   // returning an OBJECT with a PROPERTY 'items' which has the VALUE 'data'
//   return {
//     props: {
//       items,
//     },
//   }
// }


export default Index;

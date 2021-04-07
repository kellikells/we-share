import React from 'react';
import fetch from 'isomorphic-unfetch';
import { GlobalProvider } from '../context/GlobalState';
import { Header } from '../components/Header';

import { LoginButton } from '../components/LoginButton';
import { RegisterButton } from '../components/RegisterButton';

const Index = ({ items }) => {

  return (
    <GlobalProvider >
      <div className='container'>
        <Header />

        <div className='space-x-2 text-center space-y-20'>
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



export async function getStaticProps() {
  const res = await fetch('http://localhost:3000/api/items');

  // the api sends back an OBJECT and it has a PROPERTY 'data' on it, so here we extract that property
  const items = await res.json();
  if (!items) {
    return {
      notFound: true,
    }
  }
  // returning an OBJECT with a PROPERTY 'items' which has the VALUE 'data'
  return {
    props: {
      items,
    },
  }
}


export default Index;

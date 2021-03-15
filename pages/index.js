import React from 'react';
import fetch from 'isomorphic-unfetch';
import { GlobalProvider } from '../context/GlobalState';
import { Header } from '../components/Header';
import { ItemList } from '../components/ItemList';
import { AddItemForm } from '../components/AddItemForm';


const Index = ({items}) => {
  return (
    <GlobalProvider >
      <div className='container'>
          <Header />
          <ItemList />
          <AddItemForm />
      </div>
    </GlobalProvider>
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

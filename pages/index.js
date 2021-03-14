import React from 'react';
import fetch from 'isomorphic-unfetch';
import { GlobalProvider } from '../context/GlobalState';
import { Header } from '../components/Header';
import { ItemList } from '../components/ItemList';
import { AddItemForm } from '../components/AddItemForm';


const Index = ({ items }) => {
  return (
    <GlobalProvider >
      <div className='wrapper'>
        <Header />
        <div className='container'>
          <ItemList />
          <AddItemForm />
        </div>
      </div>
    </GlobalProvider>
  );
}


// function run server side, to get data by API request and given as a prop
// Index.getInitialProps = async () => {

//   const res = await fetch(`http://localhost:3000/api/items`);

//   // the api sends back an OBJECT and it has a PROPERTY 'data' on it, so here we extract that property
//   const { data } = await res.json();

//   // returning an OBJECT with a PROPERTY 'items' which has the VALUE 'data'
//   return { items: data }
// }

export async function getStaticProps() {
  const res = await fetch(`http://localhost:3000/api/items`);

  // the api sends back an OBJECT and it has a PROPERTY 'data' on it, so here we extract that property
  const { data } = await res.json();

  // returning an OBJECT with a PROPERTY 'items' which has the VALUE 'data'
  return { props: { items: data } }
}


export default Index;

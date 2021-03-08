import React from 'react';

import { Header } from '../components/Header';
import { ItemList } from '../components/ItemList';
import { AddItemForm } from '../components/AddItemForm';

import { GlobalProvider } from '../context/GlobalState';



const App = () => {
  return (
    <GlobalProvider>
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

export default App;

import React from 'react';
import { Header } from '../components/Header';
import { ItemList } from '../components/ItemList';
import { AddItemForm } from '../components/AddItemForm';

import { GlobalProvider } from '../context/GlobalState';



function App() {
  return (
    <GlobalProvider>
        <Header />
      <div className='container'>
          <ItemList />
        <AddItemForm />
      </div>
    </GlobalProvider>
  );
}

export default App;

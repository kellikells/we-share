import React from 'react';
import { Header } from './components/Header';
import { SectionHeader } from './components/SectionHeader';
import { ItemList } from './components/ItemList';
import { AddItem } from './components/AddItem';

import { GlobalProvider } from './context/GlobalState';



function App() {
  return (
    <GlobalProvider>
        <Header />
      <div className='container'>
          <SectionHeader />
          <ItemList />
          <AddItem />
      </div>
    </GlobalProvider>
  );
}

export default App;

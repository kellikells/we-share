import React from 'react';
import { Header } from './components/Header';
import { SectionHeader } from './components/SectionHeader';
import { DataTable } from './components/DataTable';
import { Form } from './components/Form';




function App() {
  return (
    <div className='container mx-auto'>
      <Header />

      {/*---------- WeHave section ----------*/}
      <div>


        <SectionHeader />


        {/*---------- grid ----------*/}
        {/* grid-template-columns: 10px auto 25px; */}
        {/* gap: 15px 10px (row, column) */}
        {/* <div className="grid">
        </div> */}

        {/*---------- table ----------*/}
        <DataTable />

        {/*---------- add button ----------*/}
        <button>+</button>

      </div>
      {/*---------- form ----------*/}
      <Form />

    </div>
  );
}

export default App;

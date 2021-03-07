import React, { useContext } from 'react';
import { GlobalContext } from '../context/GlobalState';

export const Item = ({ item }) => {

    const { deleteItem } = useContext(GlobalContext);



    // ternary operator to determine item color (have or don't have)
    const sign = item.itemQuantity <= 0 ? 'negative' : 'positive';


    return (

        <div key={item.id} className={sign == 'positive' ? 'list-item' : 'list-item-disabled'}>

            <div className='list-grid'>

                
                {/* ----- quantity ----- */}
                <div className='item-qty'>{item.itemQuantity}</div>

                
                {/* ----- item name ----- */}
                <div className={sign == 'positive' ? 'item-name' :
                    'item-name-disabled'} >
                    {item.itemName}
                </div>

                
                {/* ----- buttons ----- */}
                <div className={sign == 'positive' ? 'item-btn-group' : 'item-btn-group-disabled'} >

                    <button className='btn-use-one'>Use 1</button>

                    <button className='btn-use-all'>Use All</button>

                </div>

                
                {/* ----- trash button ----- */}
                <button onClick={() => deleteItem(item.id)} className='col-span-1  bg-white p-2 font-thin'>
                    <img src='/trash.svg' alt='delete item' />
                </button>

            </div>
        </div>
    );
}

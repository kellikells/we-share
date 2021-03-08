import React, { useContext } from 'react';
import { GlobalContext } from '../context/GlobalState';

export const Item = ({ item }) => {

    const { useOne, useAll, deleteItem } = useContext(GlobalContext);

    // ternary operator to determine item color (have or don't have)
    const sign = item.itemQuantity <= 0 ? 'negative' : 'positive';


    return (

        <div className={sign == 'positive' ? 'list-item' : 'list-item-disabled'}>

          

            <div className='list-grid'>

                {/* ----- button: delete ----- */}
                <button onClick={() => deleteItem(item.id)} className='btn-delete'>
                    <img src='/trash.svg' alt='delete item' />
                </button>


                {/* ----- quantity ----- */}
                <div className='item-qty'>{item.itemQuantity}</div>

                
                {/* ----- item name ----- */}
                <div className={sign == 'positive' ? 'item-name' :
                    'item-name-disabled'} >
                    {item.itemName}
                </div>

                
                {/* ----- button group ----- */}
                <div className={sign == 'positive' ? 'item-btn-group' : 'item-btn-group-disabled'} >

                    {/* ----- button: use 1 ----- */}
                    <button onClick={() => useOne(item.id)} className='btn-use-one'>Use 1</button>

                    {/* ----- button: use all ----- */}
                    <button onClick={() => useAll(item.id)} className='btn-use-all'>Use All</button>

                </div>

                
                {/* ----- button: delete ----- */}
                {/* <button onClick={() => deleteItem(item.id)} className={sign == 'positive' ? 'btn-delete' : 'btn-delete-disabled'}>
                    <img src='/trash.svg' alt='delete item' />
                </button> */}

            </div>
        </div>
    );
}

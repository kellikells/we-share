import React, { useContext } from 'react';
import { GlobalContext } from '../context/GlobalState';

export const Item = ({ item }) => {

    const { deleteItem, useOne, useAll, getItems } = useContext(GlobalContext);

    // ternary operator to determine item color (have or don't have)
    const sign = item.itemQuantity <= 0 ? 'negative' : 'positive';

    return (

        <div className={sign == 'positive' ? 'list-item-container' : 'list-item-container-disabled'} key={item._id}>

            <div className='list-grid'>

                {/* ----- quantity ----- */}
                <div className='item-qty'>{item.itemQuantity} </div>

                {/* ----- item name ----- */}
                <div className={sign == 'positive' ? 'item-name' :
                    'item-name-disabled'} >
                    {item.itemName}
                </div>

                {/* ----- button group ----- */}
                <div className='item-btn-group' >

                    {/* ----- button: use 1 ----- */}
                    <button onClick={() => {
                        useOne(item._id, item.itemName, item.itemQuantity);
                        getItems();
                    }}
                        className={sign == 'positive' ? 'btn-use-one' : 'btn-disabled'}
                    >
                        Use 1
                    </button>

                    {/* ----- button: use all ----- */}
                    <button onClick={() => {
                        useAll(item._id, item.itemName);
                        getItems();
                    }}
                        className={sign == 'positive' ? 'btn-use-all' : 'btn-disabled'}>
                        Use All
                    </button>

                    {/* ----- button: delete ----- */}
                    <button onClick={() => {
                        deleteItem(item._id);
                        getItems();
                    }}
                        className='btn-delete'>
                        Delete
                    </button>

                    {/* ---------------------------------------------------- */}
                </div>

            </div>
        </div>
    );
}


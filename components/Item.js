import React, { useContext } from 'react';
import { GlobalContext } from '../context/GlobalState';

export const Item = ({ item }) => {
    const { deleteItem } = useContext(GlobalContext);

    // ternary operator to determine item color (have or don't have)
    // const sign = item.itemQuantity <= 0 ? '-' : '+';


    return (
        <div className='list-item'>

    
            <div className='list-grid'>

                {/* quantity */}
                <div className='item-qty'>{item.itemQuantity}</div>

                {/* item name */}
                <div className='item-name'>{item.itemName}</div>

                {/* buttons */}
                <div className={item.itemQuantity <= 0 ? 'item-btn-group-negative' : 'item-btn-group-positive'} >

                    <button className='btn-use-one'>Use 1</button>

                    <button className='btn-use-all'>Use All</button>

                </div>

                {/* trash button */}
                <button onClick={() => deleteItem(item.id)} className='col-span-1  bg-white p-2 font-thin'>
                    <img src='/trash.svg' alt='delete item' />
                </button>

            </div>
        </div>

    );
}

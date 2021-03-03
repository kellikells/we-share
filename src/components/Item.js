import React, { useContext } from 'react';
import { GlobalContext } from '../context/GlobalState';

export const Item = ({ item }) => {
    const { deleteItem } = useContext(GlobalContext);

    // ternary operator to determine item color (have or don't have)
    // const sign = item.itemQuantity <= 0 ? '-' : '+';

    return (
        <>
            <li className={item.itemQuantity <= 0 ? 'negative' : 'positive'}>
               
                <span className='item-quantity'> {item.itemQuantity} </span>
                <span className='item-name'> {item.itemName} </span>
                   <button onClick={() => deleteItem(item.id)} className='delete-btn'>x</button>
            </li>
         
        </>
    )
}

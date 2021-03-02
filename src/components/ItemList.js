
// useContext hook in order to user GlobalContext
import React, { useContext } from 'react';
import { Item } from './Item';
import { GlobalContext } from '../context/GlobalState';


export const ItemList = () => {
    // const context = useContext(GlobalContext);
    // destructuring allows us to just pull out : items 
    // typeof items = array
    // so we need to MAP through it, and output each item as a separate component
    const { items } = useContext(GlobalContext);

    return (
        <>
            <h3>We-Have:</h3>

            <ul>
                {/* MAPPING through items: */}
                {items.map(item => (
                    <Item key={item.id} item={item}/>
                ))}

            </ul>
        </>

    );
}


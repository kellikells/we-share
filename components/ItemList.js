import React, { useContext, useEffect } from 'react';
import { Item } from './Item';

// useContext hook in order to use GlobalContext
import { GlobalContext } from '../context/GlobalState';



export const ItemList = () => {
    // const context = useContext(GlobalContext);
    // destructuring allows us to just pull out : items 
    // typeof items = array
    // so we need to MAP through it, and output each item as a separate component


    const { items, getItems } = useContext(GlobalContext);



    useEffect(() => {
        getItems();
    }, []);
    

    return (
        <>
            <div className='list'>
                {/* MAPPING through items: */}
                {items.map(item => (
                    <Item key={item._id} item={item} />
                ))}

            </div>
        </>

    );
}


import React, { useState, useContext } from 'react';
import { GlobalContext } from '../context/GlobalState';

export const AddItemForm = () => {
    const [itemName, setItemName] = useState('');
    const [itemQuantity, setItemQuantity] = useState(0);

    const { addItem } = useContext(GlobalContext);

    const onSubmit = e => {
        e.preventDefault();

        const newItem = {
            id: Math.floor(Math.random() * 100000000),
            itemName,
            itemQuantity: +itemQuantity
        }
        addItem(newItem);
    }

    return (


        <form onSubmit={onSubmit}>
            <div className="grid grid-cols-3">

                <div className="col-span-2 ...">
                    <label htmlFor='itemName'>Item Name</label>
                    <input className='form-input' type='text' placeholder='enter item name'
                        value={itemName}
                        onChange={(e) => setItemName(e.target.value)}
                    />
                </div>

                <div className="...">
                    <label htmlFor='itemQuantity'>Qty</label>
                    <input className='form-input' type='number' placeholder='enter quantity'
                        value={itemQuantity}
                        onChange={(e) => setItemQuantity(e.target.value)}
                    />
                </div>

                <div className="col-span-3 ...">
                    <button className='add-btn focus:bg-green-400'>Add Item</button>
                </div>
            </div>

        </form>


    );
}